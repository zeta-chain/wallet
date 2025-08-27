import { useWalletOptions } from "@dynamic-labs/sdk-react-core";

import { GLOBAL_WALLET_KEY_ID } from "../../constants";

/**
 * Hook that provides a handler to connect to Universal Sign-In EVM
 */
export const useConnectUniversalSignIn = () => {
  const { selectWalletOption } = useWalletOptions();

  const connectUniversalSignIn = () => {
    void selectWalletOption(GLOBAL_WALLET_KEY_ID);
  };

  return { connectUniversalSignIn };
};
