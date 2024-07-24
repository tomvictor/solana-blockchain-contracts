use anchor_lang::prelude::*;

declare_id!("ARbowygvyWvish2HNEwsGexXtFHy1ujMAk36sjdSBRrN");

#[program]
pub mod solbet {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, data: UserInfo) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        let user_data = &mut ctx.accounts.data;
        user_data.name = data.name;
        user_data.age = data.age;
        Ok(())
    }

    // create bet account -> save to dynamo
    // store the program-id to dynamodb (aws) once created
    // for every new bet, create new program
    pub fn create_bet(name: &str) {}

    // increment the account balance
    // bet-account, user-account
    pub fn place_bet(option: Options, amount: Options, account: Account) {}

    // invoke the resolver after bet is finished
    // resolve the bet
    // split the balance and send to the accounts
    // take the sol from the account balance
    pub fn resolve() {}
}

enum Options {
    Sol1,
    Sol2,
    Sol3,
    Sol4,
}

#[account]
pub struct UserInfo {
    pub name: String,
    pub age: u8,
    pub balance: f64,
}
const PDA_SEED: &[u8] = b"hello";

#[derive(Accounts)]
#[instruction(instruction_data: UserInfo)]
pub struct Initialize<'info> {
    #[account(
        init,
        seeds = [PDA_SEED, authority.key().as_ref()],
        bump,
        payer = authority,
        space =  8 + 4 + instruction_data.name.len() + 1,
    )]
    pub data: Account<'info, UserInfo>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub struct BetEvent {}

pub struct Account {
    pub balance: u32,
}
