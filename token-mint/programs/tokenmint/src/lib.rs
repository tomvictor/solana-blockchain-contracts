use anchor_lang::prelude::*;

declare_id!("Dqr4J1LhA3ABDzrMEt5xGf2GDys7K1CkiUMPEefyL6Re");

#[program]
pub mod tokenmint {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
