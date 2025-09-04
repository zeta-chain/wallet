import {
  createGlobalWalletClient,
  GlobalWalletClient,
} from "@dynamic-labs/global-wallet-client";

import { DYNAMIC_ENVIRONMENT_IDS } from "../constants";

let walletInstance: GlobalWalletClient | null = null;

/**
 * Get the wallet URL based on the environment ID
 */
const getWalletUrl = (environmentId: string): string => {
  // Check if this is the live environment
  if (environmentId === DYNAMIC_ENVIRONMENT_IDS.live) {
    return "https://wallet.zetachain.com";
  }
  // Default to testnet for sandbox or any other environment
  return "https://testnet.wallet.zetachain.com";
};

/**
 * Get or create the GlobalWalletClient instance with the specified environment ID
 */
export const getWallet = (environmentId: string): GlobalWalletClient => {
  if (!walletInstance) {
    walletInstance = createGlobalWalletClient({
      environmentId,
      popup: {
        url: getWalletUrl(environmentId),
      },
    });
  }
  return walletInstance;
};
