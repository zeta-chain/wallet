import {
  createSolanaWallet,
  registerWallet,
} from "@dynamic-labs/global-wallet-client/solana";

import { DYNAMIC_ENVIRONMENT_IDS } from "../constants";
import { config } from "./config";
import { getWallet } from "./wallet";

export const registerSolanaStandard = (
  environment: keyof typeof DYNAMIC_ENVIRONMENT_IDS = "sandbox"
) => {
  const environmentId = DYNAMIC_ENVIRONMENT_IDS[environment];
  const wallet = getWallet(environmentId);

  registerWallet(
    createSolanaWallet(
      {
        icon: config.walletIcon as `data:image/svg+xml;base64,${string}`,
        name: config.walletName,
      },
      wallet
    )
  );
};
