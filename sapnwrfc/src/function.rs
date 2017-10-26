use binding::*;
use Connection;

#[derive(Debug)]
pub struct Function<'a> {
    internal: Box<RFC_FUNCTION_HANDLE>,
    connection: &'a Connection
}

