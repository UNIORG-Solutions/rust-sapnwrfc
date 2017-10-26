error_chain!(
    foreign_links {
       Fmt(::std::fmt::Error);
       FromUtf16(::std::string::FromUtf16Error);
    }

    errors {
        GenericRfcError(code: ::binding::RFC_RC, msg: String) {
            description("rfc action failed"),
            display("rfc action failed: {:?} {}", code, msg)
        }
    }
);


use SapString;
use binding::RFC_ERROR_INFO;

pub fn create_rfc_error(info: &RFC_ERROR_INFO) -> ErrorKind {
    ErrorKind::GenericRfcError(info.code, SapString::from(&info.key[..]).as_string().unwrap())
}