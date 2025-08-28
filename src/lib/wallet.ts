import {
  createGlobalWalletClient,
  GlobalWalletClient,
} from "@dynamic-labs/global-wallet-client";

import { config } from "./config";

let walletInstance: GlobalWalletClient | null = null;

/**
 * Get or create the GlobalWalletClient instance with the specified environment ID
 */
export const getWallet = (environmentId: string): GlobalWalletClient => {
  if (!walletInstance) {
    walletInstance = createGlobalWalletClient({
      environmentId,
      popup: {
        url: config.walletUrl,
      },
    });
  }
  return walletInstance;
};

// Default export for backward compatibility - uses sandbox environment
// This will be replaced by the proper environment when getWallet is called
const Wallet: GlobalWalletClient = createGlobalWalletClient({
  environmentId: "sandbox-placeholder", // Will be replaced
  popup: {
    url: config.walletUrl,
  },
});

export default Wallet;
