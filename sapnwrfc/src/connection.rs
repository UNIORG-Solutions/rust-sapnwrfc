use binding::*;
use std::marker::PhantomData;
use function_desc::*;
use errors::create_rfc_error;
use types::SapString;
use errors;

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

#[derive(Debug)]
enum SapConnectParameter {
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
enum SapAuthenticationParameter {
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

    pub fn connect<'a>(self) -> errors::Result<Connection> {
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
                RFC_RC::RFC_OK => Ok(Connection::create(con)),
                _ => Err(create_rfc_error(&error_info).into())
            }
        }
    }
}


#[derive(Debug)]
pub struct Connection {
    internal: RFC_CONNECTION_HANDLE
}

impl Connection {
    fn create(handle: RFC_CONNECTION_HANDLE) -> Connection {
        Connection { internal: handle }
    }

    pub fn get_function_description<'a, T: Into<SapString>>(&'a self, name: T) -> errors::Result<FunctionDescription<'a>> {
        let mut error_info: RFC_ERROR_INFO = RFC_ERROR_INFO::default();
        let sname: SapString = name.into();
        unsafe {
            let result = RfcGetFunctionDesc(self.internal, sname.as_ptr(), &mut error_info);
            if error_info.code == RFC_RC::RFC_OK {
                Ok(FunctionDescription { internal: result, con: PhantomData })
            } else {
                Err(create_rfc_error(&error_info).into())
            }
        }
    }
}

impl Drop for Connection {
    fn drop(&mut self) {
        let mut error_info: RFC_ERROR_INFO = RFC_ERROR_INFO::default();
        unsafe {
            RfcCloseConnection(self.internal, &mut error_info);
            if error_info.code != RFC_RC::RFC_OK {
                panic!("error while closing the socket: {:?}", create_rfc_error(&error_info));
            }
        }
    }
}