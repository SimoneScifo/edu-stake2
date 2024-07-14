// wallet.service.ts
import { Injectable } from '@angular/core';
import {
  Keypair,
  Connection,
  PublicKey,
  clusterApiUrl,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';
import wallet from '../../wallet.json';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private network = WalletAdapterNetwork.Devnet; // Change to Mainnet for production
  private endpoint = clusterApiUrl(this.network);
  private connection: Connection;
  private wallet: PhantomWalletAdapter;
  private mint = new PublicKey('4giddJMmCaMCpexu6we3CToPeJwVMhnqKaj8GDQsMKmm');
  private eduStakeKeypair = Keypair.fromSecretKey(new Uint8Array(wallet));

  constructor() {
    this.connection = new Connection(this.endpoint, 'confirmed');
    this.wallet = new PhantomWalletAdapter();
  }

  async connectWallet(): Promise<void> {
    try {
      await this.wallet.connect();
    } catch (error) {
      console.error('Wallet connection failed', error);
    }
  }

  get publicKey(): PublicKey | null {
    return this.wallet.publicKey ?? null;
  }

  async payment(): Promise<void> {

    (async () => {
      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        this.connection,
        this.eduStakeKeypair,
        this.mint,
        this.wallet.publicKey!
      );

      const fromAta = fromTokenAccount.address;
      console.log('Associated Token Account: ', fromAta.toBase58());

      const toPubliKey = new PublicKey('FConvaPabkPXxesGSuyGKUoFdSykC2eDJzFtHWdSQnyF');

      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        this.connection,
        this.eduStakeKeypair,
        this.mint,
        toPubliKey
      );

      const toAta = toTokenAccount.address;
      console.log('Receiver Associated Token Account: ', toAta.toBase58());
      console.log('Wallet Public Key: ', this.wallet.publicKey?.toBase58);
      const amount = 1e3;

      await transfer(this.connection, this.eduStakeKeypair, fromAta, toAta, this.eduStakeKeypair, amount);

      console.log(
        'Transferred',
        amount,
        'from',
        fromAta.toBase58(),
        'to',
        toAta.toBase58()
      );
    })();
  }
}
