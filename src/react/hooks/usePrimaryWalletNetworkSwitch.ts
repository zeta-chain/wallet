import { dynamicEvents } from "@dynamic-labs/sdk-react-core";
import { useCallback, useEffect, useRef } from "react";

import type { PrimaryWallet } from "../../types";

/**
 * Custom hook that automatically switches the network to chain ID 7000
 * when a wallet is first connected (not when switching between existing wallets).
 */
export const useAutoNetworkSwitchOnConnection = () => {
  const previousPrimaryWalletRef = useRef<PrimaryWallet | null>(null);

  const handlePrimaryWalletChanged = useCallback(
    (newPrimaryWallet: PrimaryWallet) => {
      const previousWallet = previousPrimaryWalletRef.current;

      // Only trigger network switch on initial connection (null -> wallet)
      // Skip when switching between existing wallets (wallet A -> wallet B)
      if (newPrimaryWallet && !previousWallet) {
        if (newPrimaryWallet.connector?.supportsNetworkSwitching()) {
          void newPrimaryWallet.switchNetwork(7000);
        }
      }

      // Update the ref to track the current wallet for next comparison
      previousPrimaryWalletRef.current = newPrimaryWallet;
    },
    []
  );

  useEffect(() => {
    dynamicEvents.on("primaryWalletChanged", handlePrimaryWalletChanged);

    return () => {
      dynamicEvents.off("primaryWalletChanged", handlePrimaryWalletChanged);
    };
  }, [handlePrimaryWalletChanged]);
};
