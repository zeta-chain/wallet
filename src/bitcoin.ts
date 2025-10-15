/**
 * Bitcoin wallet utilities for @zetachain/wallet
 *
 * @example
 * ```typescript
 * import { isBitcoinWallet } from '@zetachain/wallet/bitcoin';
 * import { useUniversalSignInContext } from '@zetachain/wallet/react';
 *
 * const { primaryWallet } = useUniversalSignInContext();
 *
 * if (isBitcoinWallet(primaryWallet)) {
 *   // primaryWallet now has Bitcoin-specific methods like signPsbt
 * }
 * ```
 */

// Re-export Bitcoin type guard from Dynamic Labs
export { isBitcoinWallet } from "@dynamic-labs/bitcoin";

// Export Bitcoin-specific types
export type {
  BitcoinSignPsbtResponse,
  PrimaryWalletWithBitcoinSigner,
  SignPsbtParams,
} from "./types/bitcoin";
