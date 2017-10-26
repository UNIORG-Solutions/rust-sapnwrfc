/// some additional types to ease the use of the library

use errors;

fn to_utf16_vec<'a>(input: &'a str) -> Vec<i8> {
    input.encode_utf16().chain(vec![0]).flat_map(|chr| vec![(chr % 256) as i8, (chr / 256) as i8]).collect()
}

/// provides transformation to and from saps ucs2 (utf16) string encoding.
///
/// the internal storage keeps everything as utf16, stored in a Vec<i8> (yes, i8. thanks sap).
#[derive(Debug, Clone)]
pub struct SapString(Vec<i8>);

impl From<Vec<i8>> for SapString {
    fn from(data: Vec<i8>) -> Self {
        SapString(data)
    }
}

impl<'a> From<&'a [i8]> for SapString {
    fn from(data: &'a [i8]) -> Self {
        SapString(Vec::from(data))
    }
}

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

    /// re-encodes the internal string into a rust String.
    pub fn as_string(&self) -> errors::Result<String> {
        let (_, utf16) = self.0.iter().fold(
            (None, Vec::with_capacity(self.0.len() / 2)),
            |mut acc: (Option<i8>, Vec<u16>), &chr| {
                match acc.0 {
                    None => (Some(chr), acc.1),
                    Some(last) => {
                        acc.1.push((chr as u16) * 256 + (last as u16));
                        (None, acc.1)
                    }
                }
            }
        );

        Ok(String::from_utf16(utf16.as_slice())?.trim_right_matches('\0').into())
    }
}