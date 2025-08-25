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
    uri: 'https://raw.githubusercontent.com/tomvictor/solana-blockchain-contracts/refs/heads/main/token-mint/meta/meta.json',
  };

  // Generate new keypair to use as address for mint account.
  // const mintKeypair = new Keypair();
  const mintKeypair = Keypair.fromSecretKey(Uint8Array.from([22,177,255,254,96,121,168,223,234,225,24,176,233,52,68,95,65,95,177,144,115,188,253,163,33,164,242,137,171,160,159,62,235,242,54,194,69,177,9,181,149,38,221,229,221,106,36,174,23,178,210,33,129,138,127,96,228,194,105,149,190,243,21,13]));

  // Generate new keypair to use as address for recipient wallet.
  // const recipient = new Keypair();
  const recipient = Keypair.fromSecretKey(Uint8Array.from([83,186,252,134,152,173,251,85,48,116,81,136,190,188,144,127,194,163,247,151,92,19,79,47,64,254,15,242,80,157,215,128,166,220,43,200,69,29,51,192,224,247,35,201,145,97,229,54,170,91,126,184,61,89,230,147,211,18,194,57,184,40,162,122]));

  // Derive the associated token address account for the mint and payer.
  const senderTokenAddress = getAssociatedTokenAddressSync(mintKeypair.publicKey, payer.publicKey);

  // Derive the associated token address account for the mint and recipient.
  const recepientTokenAddress = getAssociatedTokenAddressSync(mintKeypair.publicKey, recipient.publicKey);


  console.log('mint account ', mintKeypair.publicKey.toString());
  // it('Create an SPL Token!', async () => {
  //   const transactionSignature = await program.methods
  //     .createToken(metadata.name, metadata.symbol, metadata.uri)
  //     .accounts({
  //       payer: payer.publicKey,
  //       mintAccount: mintKeypair.publicKey,
  //     })
  //     .signers([mintKeypair])
  //     .rpc();

  //   console.log('Success!');
  //   console.log(`   Mint Address: ${mintKeypair.publicKey}`);
  //   console.log(`   Transaction Signature: ${transactionSignature}`);
  // });

  // it('Mint tokens!', async () => {
  //   // Amount of tokens to mint.
  //   const amount = new anchor.BN(900000);

  //   // Mint the tokens to the associated token account.
  //   const transactionSignature = await program.methods
  //     .mintToken(amount)
  //     .accounts({
  //       mintAuthority: payer.publicKey,
  //       recipient: payer.publicKey,
  //       mintAccount: mintKeypair.publicKey,
  //       associatedTokenAccount: senderTokenAddress,
  //     })
  //     .rpc();

  //   console.log('Success!');
  //   console.log(`   Associated Token Account Address: ${senderTokenAddress}`);
  //   console.log(`   Transaction Signature: ${transactionSignature}`);
  // });

  // it('Transfer tokens!', async () => {
  //   // Amount of tokens to transfer.
  //   const amount = new anchor.BN(40000);

  //   const transactionSignature = await program.methods
  //     .transferTokens(amount)
  //     .accounts({
  //       sender: payer.publicKey,
  //       recipient: recipient.publicKey,
  //       mintAccount: mintKeypair.publicKey,
  //       senderTokenAccount: senderTokenAddress,
  //       recipientTokenAccount: recepientTokenAddress,
  //     })
  //     .rpc();

  //   console.log('Success!');
  //   console.log(`   Transaction Signature: ${transactionSignature}`);
  // });
});
