import { WalletClient } from "viem";

import { PrimaryWallet } from "./wallet";

export type PrimaryWalletWithViemWalletClient = PrimaryWallet & {
  getWalletClient(chainId?: string): Promise<WalletClient>;
};
