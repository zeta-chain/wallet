import type { DataURIImage } from "@dynamic-labs/global-wallet-client";

type Config = {
  walletName: string;
  walletIcon: DataURIImage;
  walletUrl: string;
  environmentId: string;
  eip6963: {
    rdns: string;
  };
};

export const config: Config = {
  walletName: "Universal Sign In",
  walletIcon: "<wallet-icon>",
  walletUrl: "https://wallet.zetachain.com",
  environmentId: "eaec6949-d524-40e7-81d2-80113243499a",
  eip6963: {
    rdns: "zetachain.com",
  },
};
