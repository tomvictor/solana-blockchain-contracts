use anchor_lang::prelude::*;

declare_id!("2P4TtLkN8ybJBoefLq6WAQoZ92hyZKtMhRq9RJTfT4tY");

#[program]
pub mod minter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
