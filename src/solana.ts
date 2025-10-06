import { registerSolanaStandard } from "./lib/registerSolanaStandard";

registerSolanaStandard();

// Export Solana-specific utilities and types
export { getSolanaWalletAdapter } from "./lib/solanaClient";
export type {
  PrimaryWalletWithSolanaSigner,
  SolanaWalletAdapter,
} from "./types/solana";

// Re-export Dynamic Labs Solana utilities
export { createSolanaWallet } from "@dynamic-labs/global-wallet-client/solana";
