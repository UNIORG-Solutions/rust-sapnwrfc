use errors::{self, create_rfc_error};
use binding::*;
use std::marker::PhantomData;
use Connection;
use SapString;

#[derive(Debug)]
/// the way to receive information about a sap function module
pub struct FunctionDescription<'a> {
    pub ( crate ) internal: RFC_FUNCTION_DESC_HANDLE,
    pub ( crate ) con: PhantomData<&'a Connection>
}

impl<'a> FunctionDescription<'a> {
    /// receives the name for this function module
    pub fn name(&self) -> errors::Result<String> {
        let mut error_info: RFC_ERROR_INFO = RFC_ERROR_INFO::default();
        // a function name can only be 30 characters long. 30 * 2 for utf-16, +2 for zero termination.
        let mut name_buffer: [i8; 62] = [0; 62];
        unsafe {
            RfcGetFunctionName(self.internal, name_buffer.as_mut_ptr() as *mut i8, &mut error_info);
            match error_info.code {
                RFC_RC::RFC_OK => Ok(SapString::from(name_buffer.as_ref()).as_string()?),
                _ => Err(create_rfc_error(&error_info).into())
            }
        }
    }
}
