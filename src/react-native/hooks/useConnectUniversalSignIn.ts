import { GLOBAL_WALLET_KEY_ID } from "../../constants";
import { useUniversalSignInContextValue } from "../providers/UniversalSignInContextProvider";
import { isDynamicClient } from "../types";

/**
 * Hook that provides a handler to connect to Universal Sign-In EVM
 */
export const useConnectUniversalSignIn = () => {
  const { dynamicClient } = useUniversalSignInContextValue();

  const connectUniversalSignIn = (): void => {
    if (isDynamicClient(dynamicClient)) {
      void dynamicClient.selectWalletOption(GLOBAL_WALLET_KEY_ID);
    }
  };

  return { connectUniversalSignIn };
};
