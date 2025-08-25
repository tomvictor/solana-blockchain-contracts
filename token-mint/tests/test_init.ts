import * as anchor from '@coral-xyz/anchor';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { Keypair } from '@solana/web3.js';
import type { TransferTokens } from '../target/types/transfer_tokens';

describe('Transfer Tokens', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;
  const program = anchor.workspace.TransferTokens as anchor.Program<TransferTokens>;

  const metadata = {
    name: 'Solana Mail',
    symbol: 'MAIL',
    uri: 'https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/spl-token.json',
  };

  // Generate new keypair to use as address for mint account.
  // const mintKeypair = new Keypair();
  const mintKeypair = Keypair.fromSecretKey(Uint8Array.from([196,7,90,18,251,95,253,125,234,109,209,31,208,163,114,93,182,171,4,36,111,37,100,146,121,29,152,224,91,56,220,137,228,211,72,233,244,247,136,34,194,243,177,110,171,54,209,36,122,143,79,202,30,127,118,185,119,95,41,78,17,230,230,238]));

  // Generate new keypair to use as address for recipient wallet.
  // const recipient = new Keypair();
  const recipient = Keypair.fromSecretKey(Uint8Array.from([68,84,234,201,123,128,171,237,78,147,98,238,179,233,74,45,189,232,147,187,144,227,46,107,94,63,142,99,220,42,214,21,193,135,120,48,252,3,245,142,156,107,126,205,17,182,68,54,157,34,15,249,88,76,181,174,205,72,226,148,23,223,154,59]));

  // Derive the associated token address account for the mint and payer.
  const senderTokenAddress = getAssociatedTokenAddressSync(mintKeypair.publicKey, payer.publicKey);

  // Derive the associated token address account for the mint and recipient.
  const recepientTokenAddress = getAssociatedTokenAddressSync(mintKeypair.publicKey, recipient.publicKey);

  it('Create an SPL Token!', async () => {
    const transactionSignature = await program.methods
      .createToken(metadata.name, metadata.symbol, metadata.uri)
      .accounts({
        payer: payer.publicKey,
        mintAccount: mintKeypair.publicKey,
      })
      .signers([mintKeypair])
      .rpc();

    console.log('Success!');
    console.log(`   Mint Address: ${mintKeypair.publicKey}`);
    console.log(`   Transaction Signature: ${transactionSignature}`);
  });

  it('Mint tokens!', async () => {
    // Amount of tokens to mint.
    const amount = new anchor.BN(100000);

    // Mint the tokens to the associated token account.
    const transactionSignature = await program.methods
      .mintToken(amount)
      .accounts({
        mintAuthority: payer.publicKey,
        recipient: payer.publicKey,
        mintAccount: mintKeypair.publicKey,
        associatedTokenAccount: senderTokenAddress,
      })
      .rpc();

    console.log('Success!');
    console.log(`   Associated Token Account Address: ${senderTokenAddress}`);
    console.log(`   Transaction Signature: ${transactionSignature}`);
  });

  it('Transfer tokens!', async () => {
    // Amount of tokens to transfer.
    const amount = new anchor.BN(50000);

    const transactionSignature = await program.methods
      .transferTokens(amount)
      .accounts({
        sender: payer.publicKey,
        recipient: recipient.publicKey,
        mintAccount: mintKeypair.publicKey,
        senderTokenAccount: senderTokenAddress,
        recipientTokenAccount: recepientTokenAddress,
      })
      .rpc();

    console.log('Success!');
    console.log(`   Transaction Signature: ${transactionSignature}`);
  });
});
