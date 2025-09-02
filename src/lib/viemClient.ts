import { PrimaryWallet, PrimaryWalletWithViemWalletClient } from "../types";

/**
 * Extracts a Viem WalletClient from a Primary Wallet instance.
 *
 * @param primaryWallet - The primary wallet instance from useUniversalSignInContext
 * @returns The Viem WalletClient for interacting with the wallet
 * @throws {Error} When primaryWallet is null/undefined or doesn't support Viem
 *
 * @example
 * ```typescript
 * import { getViemWalletClient } from '@zetachain/wallet/viem';
 *
 * const { primaryWallet } = useUniversalSignInContext();
 * const walletClient = getViemWalletClient(primaryWallet);
 *
 * // Use with Viem actions
 * const hash = await walletClient.sendTransaction({
 *   to: '0x...',
 *   value: parseEther('1.0')
 * });
 * ```
 */
export const getViemWalletClient = async (primaryWallet: PrimaryWallet) => {
  if (!primaryWallet) {
    throw new Error("Invalid Primary Wallet");
  }

  const walletClient = await (
    primaryWallet as PrimaryWalletWithViemWalletClient
  ).getWalletClient();

  return walletClient;
};
