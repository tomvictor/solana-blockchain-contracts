use std::rc::Rc;

use anchor_client::solana_sdk::signature::{keypair_from_seed, read_keypair_file, Keypair};
use anchor_client::solana_sdk::signer::Signer;
use anchor_client::{Client, Cluster};

use anchor_lang::system_program;
use create_token::{accounts, instruction};

const CLIENT_KEY_STR: &str =
    "4puAwQDQMsgv1466GctVMcQMAKxZ9qKN6tkB4dWWryqaoM5MbebA8wHC5qQn4VFTNKrSDNExX5LzzEsWr72zL3go";

fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("Invoking counter contract!");
    println!("program-id: {}", create_token::ID);
    let payer = read_keypair_file(&*shellexpand::tilde("~/.config/solana/id.json"))
        .expect("failed to get the keypair");
    let client = Client::new(Cluster::Devnet, Rc::new(payer));

    let program = client.program(create_token::ID)?;

    let mint_keypair = Keypair::new();
    // let mint_keypair = Keypair::from_base58_string(&CLIENT_KEY_STR);
    let authority = program.payer();

    // Specify the token details
    let token_decimals = 9u8; // For example, 9 decimals
    let token_name = "ExampleToken".to_string();
    let token_symbol = "EXT".to_string();
    let token_uri = "https://example.com/token/metadata".to_string();


    let tx = program
        .request()
        .signer(&mint_keypair)
        .accounts(accounts::CreateTokenMint {
            payer: payer.pubkey(),
            metadata_account: get_metadata_pda(&mint_keypair.pubkey(), &create_token::ID),
            mint_account: mint_keypair.pubkey(),
            token_metadata_program: Metadata::id(),
            token_program: spl_token::ID,
            system_program: system_program::ID,
            rent: solana_sdk::sysvar::rent::ID,
        })
        .args(instruction::CreateTokenMint {
            _token_decimals: token_decimals,
                        token_name,
                        token_symbol,
                        token_uri,
        })
        .send()?;

    println!("tx: {:?}", tx);

    // print current count value
    // let counter_account: Counter = program.account(counter.pubkey())?;
    // println!("count: {}", counter_account.count);

    // let tx = program
    //     .request()
    //     .accounts(accounts::Increment {
    //         counter: counter.pubkey(),
    //     })
    //     .args(instruction::Increment {})
    //     .send()?;

    // println!("tx: {:?}", tx);

    // let counter_account: Counter = program.account(counter.pubkey())?;
    // println!("count: {}", counter_account.count);

    Ok(())
}
