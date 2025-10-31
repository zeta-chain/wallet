import { isSuiWallet, type SuiWallet } from "@dynamic-labs/sui-core";

import { PrimaryWallet } from "../types";

/**
 * Extracts a Sui Client from a Primary Wallet instance.
 *
 * @param primaryWallet - The primary wallet instance from useUniversalSignInContext
 * @returns The Sui Client for interacting with the Sui blockchain
 * @throws {Error} When primaryWallet is null/undefined or is not a Sui wallet
 *
 * @example
 * ```typescript
 * import { getSuiWalletClient } from '@zetachain/wallet/sui';
 *
 * const { primaryWallet } = useUniversalSignInContext();
 *
 * try {
 *   const walletClient = await getSuiWalletClient(primaryWallet);
 *   // Use with Sui transactions
 *   const result = await walletClient.executeTransactionBlock({
 *     transactionBlock: signedTx.bytes,
 *     signature: signedTx.signature,
 *     options: {}
 *   });
 * } catch (error) {
 *   console.error('Not a Sui wallet or wallet unavailable:', error);
 * }
 * ```
 */
export const getSuiWalletClient = async (
  primaryWallet: PrimaryWallet
): Promise<NonNullable<Awaited<ReturnType<SuiWallet["getSuiClient"]>>>> => {
  if (!primaryWallet) {
    throw new Error("Primary wallet is not available");
  }

  if (!isSuiWallet(primaryWallet)) {
    throw new Error("Primary wallet is not a Sui wallet");
  }

  const walletClient = await primaryWallet.getSuiClient();

  if (!walletClient) {
    throw new Error("Failed to get Sui client from wallet");
  }

  return walletClient;
};

/**
 * Validates and returns a properly typed Sui Wallet from a Primary Wallet instance.
 *
 * @param primaryWallet - The primary wallet instance from useUniversalSignInContext
 * @returns The typed SuiWallet instance with signTransaction method
 * @throws {Error} When primaryWallet is null/undefined or is not a Sui wallet
 *
 * @example
 * ```typescript
 * import { getSuiWallet } from '@zetachain/wallet/sui';
 *
 * const { primaryWallet } = useUniversalSignInContext();
 *
 * try {
 *   const suiWallet = getSuiWallet(primaryWallet);
 *   // Use to sign transactions
 *   const signedTx = await suiWallet.signTransaction(transaction);
 * } catch (error) {
 *   console.error('Not a Sui wallet or wallet unavailable:', error);
 * }
 * ```
 */
export const getSuiWallet = (primaryWallet: PrimaryWallet): SuiWallet => {
  if (!primaryWallet) {
    throw new Error("Primary wallet is not available");
  }

  if (!isSuiWallet(primaryWallet)) {
    throw new Error("Primary wallet is not a Sui wallet");
  }

  return primaryWallet;
};
