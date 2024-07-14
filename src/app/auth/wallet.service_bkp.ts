// wallet.service.ts
import { Injectable } from '@angular/core';
import { Connection, PublicKey, clusterApiUrl, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { getOrCreateAssociatedTokenAccount, createTransferInstruction } from '@solana/spl-token';
import  pollSignatoryStatus from '../utils/pollSignatureStatus';
import createTransferTransaction from '../utils/createTransferTransaction';
import signAndSendTransaction from '../utils/signAndSendTransaction';
import getProvider from '../utils/getProvider';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PhantomProvider, TLog } from '../types';

@Injectable({
  providedIn: 'root'
})
export class WalletService_bkp {
  private network = WalletAdapterNetwork.Devnet; // Change to Mainnet for production
  private endpoint = clusterApiUrl('devnet');
  private connection: Connection;
  // private wallet: PhantomWalletAdapter;
  private recipientPublicKey = new PublicKey('v2ZCufeMqW9FDz2CRtZrmviiNpqeRkLfcuZFqdKAAy5'); // Replace with actual recipient's public key
  private mintPublicKey = new PublicKey('4giddJMmCaMCpexu6we3CToPeJwVMhnqKaj8GDQsMKmm'); // Replace with actual token mint public key
  private provider?: PhantomProvider;
  constructor() {
    console.log('CONSTRUCTOR');
    this.connection = new Connection(this.endpoint, 'confirmed');
    // this.wallet = new PhantomWalletAdapter();
    this.provider = getProvider();
    console.log(' END CONSTRUCTOR');

  }

  async connectWallet(): Promise<void> {
    try {
      console.log('Connecting wallet...');
      // await this.wallet.connect();
    } catch (error) {
      console.error("Wallet connection failed", error);
    }
  }

  // get publicKey(): PublicKey | null {
  //   return this.wallet.publicKey;
  // }

  // async signTransaction(transaction: Transaction): Promise<Transaction> {
  //   if (!this.wallet.connected) throw new Error('Wallet not connected!');
  //   return await this.wallet.signTransaction(transaction);
  // }

  handleSignAndSendTransaction = useCallback(async () => {
    console.log('Handling sign and send transaction...');
    if (!this.provider) throw new Error('Wallet not connected!');

    try {
      console.log('Creating transfer transaction...');
      const transaction = await createTransferTransaction(this.provider!.publicKey!, this.connection);

      const signature = await signAndSendTransaction(this.provider!, transaction);

      pollSignatoryStatus(signature, this.connection);
    } catch (error) {
      console.warn(error);
    }
  }, ['LOG']);


  // async transferTokens(amount: number): Promise<string> {
  //   if (!this.wallet.publicKey) throw new Error('Wallet not connected!');

  //   const fromWalletPublicKey = this.wallet.publicKey;

  //   // Get or create associated token accounts
  //   const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
  //     this.connection,
  //     this.wallet.adapter,
  //     this.mintPublicKey,
  //     fromWalletPublicKey
  //   );
  //   const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  //     this.connection,
  //     this.wallet.adapter,
  //     this.mintPublicKey,
  //     this.recipientPublicKey
  //   );

  //   // Create transfer instruction
  //   const transaction = new Transaction().add(
  //     createTransferInstruction(fromTokenAccount.address, toTokenAccount.address, fromWalletPublicKey, amount * 1000000000)
  //   );

  //   // Sign, send, and confirm transaction
  //   const signedTransaction = await this.signTransaction(transaction);
  //   const signature = await sendAndConfirmTransaction(this.connection, signedTransaction, []);

  //   return signature;
  // }
}
