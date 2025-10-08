import { PublicKey, Transaction } from "@solana/web3.js";

import { PrimaryWallet } from "./wallet";

/**
 * Solana Wallet Adapter interface that matches the Dynamic Labs getSigner return type
 */
export interface SolanaWalletAdapter {
  publicKey: PublicKey;
  signAllTransactions?: (transactions: Transaction[]) => Promise<Transaction[]>;
  signTransaction?: (transaction: Transaction) => Promise<Transaction>;
}

/**
 * Extended PrimaryWallet type that includes the getSigner method for Solana wallets.
 * This type should be used when you've verified the wallet is a Solana wallet using isSolanaWallet.
 */
export type PrimaryWalletWithSolanaSigner = PrimaryWallet & {
  getSigner(): Promise<SolanaWalletAdapter>;
};
