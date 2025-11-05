import { useCallback, useEffect, useRef } from "react";

import { REQUIRED_NETWORKS_CHAIN_IDS } from "../../constants";
import type { PrimaryWallet } from "../../types";
import { useUniversalSignInContextValue } from "../providers/UniversalSignInContextProvider";
import { isDynamicClient } from "../types";

/**
 * Custom hook that automatically switches the network to a specified chain
 * when a wallet is first connected (not when switching between existing wallets).
 *
 * @param chainId - The chain ID to switch to (defaults to ZetaChain mainnet)
 */
export const useAutoNetworkSwitchOnConnection = (
  chainId: number = REQUIRED_NETWORKS_CHAIN_IDS.ZETACHAIN_MAINNET
) => {
  const { dynamicClient } = useUniversalSignInContextValue();

  if (!isDynamicClient(dynamicClient)) {
    return;
  }

  const previousPrimaryWalletRef = useRef<PrimaryWallet | null>(null);

  const handlePrimaryWalletChanged = useCallback(
    (newPrimaryWallet: PrimaryWallet) => {
      const previousWallet = previousPrimaryWalletRef.current;

      // Only trigger network switch on initial connection (null -> wallet)
      // Skip when switching between existing wallets (wallet A -> wallet B)
      if (newPrimaryWallet && !previousWallet) {
        if (newPrimaryWallet.connector?.supportsNetworkSwitching()) {
          void newPrimaryWallet.switchNetwork(chainId);
        }
      }

      // Update the ref to track the current wallet for next comparison
      previousPrimaryWalletRef.current = newPrimaryWallet;
    },
    [chainId]
  );

  useEffect(() => {
    const callback = (newWallet: unknown) => {
      handlePrimaryWalletChanged(newWallet as PrimaryWallet);
    };

    dynamicClient.on("primaryWalletChanged", callback);

    return () => {
      dynamicClient.off("primaryWalletChanged", callback);
    };
  }, [dynamicClient, handlePrimaryWalletChanged]);
};
