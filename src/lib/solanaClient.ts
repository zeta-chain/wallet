import { isSolanaWallet } from "@dynamic-labs/global-wallet-client/features";

import { PrimaryWallet } from "../types";
import type {
  PrimaryWalletWithSolanaSigner,
  SolanaWalletAdapter,
} from "../types/solana";

/**
 * Extracts a Solana Wallet Adapter from a Primary Wallet instance.
 *
 * @param primaryWallet - The primary wallet instance from useUniversalSignInContext
 * @returns The Solana Wallet Adapter for interacting with the wallet
 * @throws {Error} When primaryWallet is null/undefined or is not a Solana wallet
 *
 * @example
 * ```typescript
 * import { getSolanaWalletAdapter } from '@zetachain/wallet/solana';
 *
 * const { primaryWallet } = useUniversalSignInContext();
 *
 * try {
 *   const walletAdapter = await getSolanaWalletAdapter(primaryWallet);
 *   // Use with Solana transactions
 *   const signedTx = await walletAdapter.signTransaction(transaction);
 * } catch (error) {
 *   console.error('Not a Solana wallet or wallet unavailable:', error);
 * }
 * ```
 */
export const getSolanaWalletAdapter = async (
  primaryWallet: PrimaryWallet
): Promise<SolanaWalletAdapter> => {
  if (!primaryWallet) {
    throw new Error("Primary wallet is not available");
  }

  if (!isSolanaWallet(primaryWallet)) {
    throw new Error("Primary wallet is not a Solana wallet");
  }

  const walletAdapter = await (
    primaryWallet as PrimaryWalletWithSolanaSigner
  ).getSigner();

  return walletAdapter;
};
