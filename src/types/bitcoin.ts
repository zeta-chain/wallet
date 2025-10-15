import { PrimaryWallet } from "./wallet";

/**
 * Parameters required for signing a Bitcoin PSBT with Dynamic Labs wallets
 */
export interface SignPsbtParams {
  /** Array of allowed SIGHASH types. [1] = SIGHASH_ALL */
  allowedSighash: number[];
  /** Array of signature configurations */
  signature: Array<{
    /** The address that will sign */
    address: string;
    /** Array of input indexes to sign */
    signingIndexes: number[];
  }>;
  /** The unsigned PSBT encoded as base64 */
  unsignedPsbtBase64: string;
}

/**
 * Response from Dynamic Labs signPsbt method
 * Contains the signed PSBT in base64 format
 *
 * Note: Different wallets may return different formats:
 * - Some return { psbt: string }
 * - Phantom returns { signedPsbt: string }
 * - Others return the base64 string directly
 */
export interface BitcoinSignPsbtResponse {
  psbt?: string;
  signedPsbt?: string;
}

/**
 * Extended PrimaryWallet type that includes Bitcoin-specific methods.
 * This type should be used when you've verified the wallet is a Bitcoin wallet using isBitcoinWallet.
 */
export type PrimaryWalletWithBitcoinSigner = PrimaryWallet & {
  /**
   * Signs a Partially Signed Bitcoin Transaction (PSBT)
   * @param params - Parameters for signing the PSBT
   * @returns The signed PSBT (string or object with psbt property) or undefined if signing fails
   *
   * Note: Return type varies by wallet implementation:
   * - Some wallets return the base64 string directly
   * - Others return { psbt: string }
   * - Handle both cases in your code
   */
  signPsbt(
    params: SignPsbtParams
  ): Promise<string | BitcoinSignPsbtResponse | undefined>;
};
