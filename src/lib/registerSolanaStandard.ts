import {
  createSolanaWallet,
  registerWallet,
} from "@dynamic-labs/global-wallet-client/solana";

import { config } from "./config";
import Wallet from "./wallet";

export const registerSolanaStandard = () => {
  registerWallet(
    createSolanaWallet(
      {
        icon: config.walletIcon as `data:image/svg+xml;base64,${string}`,
        name: config.walletName,
      },
      Wallet
    )
  );
};
