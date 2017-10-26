#[macro_use]
extern crate error_chain;
extern crate dotenv;
mod binding;
mod sapnwrfc;

use dotenv::dotenv;
use sapnwrfc::*;
use std::env;

fn main() {
    dotenv().ok();

    let host = env::var("SAP_HOSTNAME").expect("no hostname given");
    let user = env::var("SAP_USERNAME").expect("no username given");
    let pass = env::var("SAP_PASSWORD").expect("no password given");

    let x = ConnectionBuilder::new()
        .direct_connection(host, 0)
        .login(user, pass)
        .connect().expect("could not create connection");
    println!("{:?}", x);

    let func = x.get_function("BAPI_COMPANY_GETDETAIL").unwrap();
    println!("function: {:?}", func.name())
}
