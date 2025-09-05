import {
  announceEip6963Provider,
  createEIP1193Provider,
} from "@dynamic-labs/global-wallet-client/ethereum";

import { config } from "./config";
import { getWallet } from "./wallet";

const emittedEnvironments = new Set<string>();

export const EIP6963Emitter = (environmentId: string) => {
  // Ensure we only emit once per environment
  if (emittedEnvironments.has(environmentId)) {
    return;
  }

  emittedEnvironments.add(environmentId);

  // Get wallet instance with the proper environment ID
  const wallet = getWallet(environmentId);

  announceEip6963Provider({
    info: {
      icon: config.walletIcon,
      name: config.walletName,
      rdns: config.eip6963.rdns,
      uuid: environmentId,
    },
    provider: createEIP1193Provider(wallet),
  });
};
