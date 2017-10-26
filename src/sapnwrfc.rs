use binding::*;

pub use binding::RFC_RC;

mod errors {
    error_chain!(
        foreign_links {
           Fmt(::std::fmt::Error);
           FromUtf16(::std::string::FromUtf16Error);
        }

        errors {
            GenericRfcError(code: ::binding::RFC_RC) {
                description("rfc action failed"),
                display("rfc action failed: {:?}", code)
            }
        }
    );
}

fn create_rfc_error(info: &RFC_ERROR_INFO) -> errors::ErrorKind {
    errors::ErrorKind::GenericRfcError(info.code)
}

#[derive(Debug, Eq, PartialEq, Clone)]
enum ConnectParameterEntry {
    ASHOST(String),
    SYSNR(u16),
    MSHOST(String),
    SYSID(String),
    MSSERV(String),
    USER(String),
    PASSWD(String),
    CLIENT(u16),
    LANG(String),
    TRACE(bool)
}

impl Into<(SapString, SapString)> for ConnectParameterEntry {
    fn into(self) -> (SapString, SapString) {
        match self {
            ConnectParameterEntry::ASHOST(host) => ("ashost".into(), host.into()),
            ConnectParameterEntry::SYSNR(snr) => ("sysnr".into(), format!("{:02}", snr).into()),
            ConnectParameterEntry::MSHOST(host) => ("mshost".into(), host.into()),
            ConnectParameterEntry::SYSID(sid) => ("sysid".into(), sid.into()),
            ConnectParameterEntry::MSSERV(host) => ("msserv".into(), host.into()),
            ConnectParameterEntry::USER(user) => ("user".into(), user.into()),
            ConnectParameterEntry::PASSWD(passwd) => ("passwd".into(), passwd.into()),
            ConnectParameterEntry::CLIENT(clnt) => ("client".into(), format!("{:03}", clnt).into()),
            ConnectParameterEntry::LANG(langu) => ("lang".into(), langu.into()),
            ConnectParameterEntry::TRACE(trace) => ("trace".into(), (if trace { "true" } else { "false" }).into()),
        }
    }
}

impl<'a> From<&'a SapConnectParameter> for (SapString, SapString) {
    fn from(input: &'a SapConnectParameter) -> Self {
        input.clone().into()
    }
}

fn to_utf16_vec<'a>(input: &'a str) -> Vec<i8> {
    input.encode_utf16().chain(vec![0]).flat_map(|chr| vec![(chr % 256) as i8, (chr / 256) as i8]).collect()
}

#[derive(Debug, Clone)]
struct SapString(Vec<i8>);

impl<'a> From<&'a SapString> for SapString {
    fn from(input: &'a SapString) -> Self {
        input.clone()
    }
}

impl<'a> From<&'a String> for SapString {
    fn from(input: &'a String) -> Self {
        SapString(to_utf16_vec(input))
    }
}

impl From<String> for SapString {
    fn from(input: String) -> Self {
        SapString(to_utf16_vec(&input))
    }
}

impl<'a> From<&'a str> for SapString {
    fn from(input: &'a str) -> Self {
        SapString(to_utf16_vec(input))
    }
}

impl SapString {
    pub fn as_ptr(&self) -> *const i8 {
        self.0.as_ptr()
    }
}

#[derive(Debug)]
pub enum SapConnectParameter {
    Direct { host: String, sysnr: u16 },
    LoadBalancing { host: String, message_server: Option<String>, sysid: String }
}

impl Into<Vec<ConnectParameterEntry>> for SapConnectParameter {
    fn into(self) -> Vec<ConnectParameterEntry> {
        match self {
            SapConnectParameter::Direct { host, sysnr } => vec![
                ConnectParameterEntry::ASHOST(host),
                ConnectParameterEntry::SYSNR(sysnr)
            ],
            SapConnectParameter::LoadBalancing { host, message_server, sysid } => {
                let mut tmp = vec![
                    ConnectParameterEntry::MSHOST(host),
                    ConnectParameterEntry::SYSID(sysid)
                ];

                if let Some(msserv) = message_server {
                    tmp.push(ConnectParameterEntry::MSSERV(msserv))
                }

                tmp
            }
        }
    }
}

#[derive(Debug)]
pub enum SapAuthenticationParameter {
    Credentials { username: String, password: String },
    SecureNetworkCommunications { qop: String, myname: String, partner_name: String, library: Option<String> },
    SingleSignOn { ticket: String }
}

impl Into<Vec<ConnectParameterEntry>> for SapAuthenticationParameter {
    fn into(self) -> Vec<ConnectParameterEntry> {
        match self {
            SapAuthenticationParameter::Credentials { username, password } => {
                vec![
                    ConnectParameterEntry::USER(username),
                    ConnectParameterEntry::PASSWD(password)
                ]
            }
            SapAuthenticationParameter::SecureNetworkCommunications { .. } => vec![],
            SapAuthenticationParameter::SingleSignOn { .. } => vec![],
        }
    }
}

#[derive(Debug)]
pub struct ConnectParameters {
    target: SapConnectParameter,
    auth: SapAuthenticationParameter,
    client: u16,
    language: String,
    trace: bool
}

impl Into<Vec<ConnectParameterEntry>> for ConnectParameters {
    fn into(self) -> Vec<ConnectParameterEntry> {
        let mut vec = Vec::new();
        vec.append(&mut self.target.into());
        vec.append(&mut self.auth.into());
        vec.push(ConnectParameterEntry::CLIENT(self.client));
        vec.push(ConnectParameterEntry::LANG(self.language));
        vec.push(ConnectParameterEntry::TRACE(self.trace));

        vec
    }
}

impl Into<Vec<(SapString, SapString)>> for ConnectParameters {
    fn into(self) -> Vec<(SapString, SapString)> {
        let vec: Vec<ConnectParameterEntry> = self.into();
        vec.into_iter().map(|entry| entry.into()).collect()
    }
}

#[derive(Debug)]
pub struct ConnectionBuilder {
    target: Option<SapConnectParameter>,
    auth: Option<SapAuthenticationParameter>,
    language: String,
    client: u16,
    trace: bool
}

impl ConnectionBuilder {
    pub fn new() -> Self {
        ConnectionBuilder {
            target: None,
            auth: None,
            client: 800,
            language: String::from("EN"),
            trace: true
        }
    }

    pub fn direct_connection<T: Into<String>>(mut self, host: T, sysnr: u16) -> Self {
        self.target = Some(SapConnectParameter::Direct { host: host.into(), sysnr });
        self
    }

    pub fn login<T: Into<String>>(mut self, user: T, password: T) -> Self {
        self.auth = Some(SapAuthenticationParameter::Credentials { username: user.into(), password: password.into() });
        self
    }

    pub fn parameters(self) -> errors::Result<ConnectParameters> {
        if let None = self.target {
            return Err("no target defined.".into());
        }
        if let None = self.auth {
            return Err("no authentication defined.".into());
        }
        Ok(ConnectParameters {
            target: self.target.unwrap(),
            auth: self.auth.unwrap(),
            language: self.language.clone(),
            client: self.client,
            trace: self.trace
        })
    }

    pub fn connect(self) -> errors::Result<Connection> {
        let mut error_info: RFC_ERROR_INFO = Default::default();
        let parameters: Vec<(SapString, SapString)> = self.parameters()?.into();
        let list: Vec<RFC_CONNECTION_PARAMETER> = parameters
            .iter()
            .map(|ref data| {
                RFC_CONNECTION_PARAMETER {
                    name: data.0.as_ptr(),
                    value: data.1.as_ptr()
                }
            })
            .collect();

        unsafe {
            let con = RfcOpenConnection(list.as_ptr(), list.len() as u32, &mut error_info);
            match error_info.code {
                RFC_RC::RFC_OK => Ok(Connection::create(Box::new(con))),
                _ => Err(create_rfc_error(&error_info).into())
            }
        }
    }
}

#[derive(Debug)]
pub struct Function<'a > {
    internal: Box<RFC_FUNCTION_HANDLE>,
    connection: &'a Connection
}

#[derive(Debug)]
pub struct FunctionDescription {
    internal: Box<RFC_FUNCTION_DESC_HANDLE>,
}

impl FunctionDescription {
    pub fn name(&self) -> errors::Result<String> {
        let mut error_info: RFC_ERROR_INFO = RFC_ERROR_INFO::default();
        let mut name_buffer: [u16; 31] = [0; 31];
        unsafe {
            let rc = RfcGetFunctionName(*self.internal, name_buffer.as_mut_ptr() as *mut i8, &mut error_info);
            match error_info.code {
                RFC_RC::RFC_OK => Ok(String::from_utf16(&name_buffer)?.trim_right_matches('\0').into()),
                _ => Err(create_rfc_error(&error_info).into())
            }
        }
    }
}


#[derive(Debug)]
pub struct Connection {
    internal: Box<RFC_CONNECTION_HANDLE>
}

impl Connection {
    fn create(handle: Box<RFC_CONNECTION_HANDLE>) -> Connection {
        Connection { internal: handle }
    }

    pub fn get_function<'a, T: Into<SapString>>(&self, name: T) -> errors::Result<FunctionDescription> {
        let mut error_info: RFC_ERROR_INFO = RFC_ERROR_INFO::default();
        let sname: SapString = name.into();
        unsafe {
            let result = RfcGetFunctionDesc(*self.internal, sname.as_ptr(), &mut error_info);
            if error_info.code == RFC_RC::RFC_OK {
                Ok(FunctionDescription { internal: Box::new(result) })
            } else {
                Err(create_rfc_error(&error_info).into())
            }
        }
    }
}