import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { SdkViewSectionType, SdkViewType } from "@dynamic-labs/sdk-api-core";
import {
  type DynamicContextProps,
  DynamicContextProvider,
} from "@dynamic-labs/sdk-react-core";
import React, { useEffect } from "react";

import {
  DYNAMIC_ENVIRONMENT_IDS,
  type DynamicEnvironment,
  GLOBAL_WALLET_KEY_ID,
} from "../../constants";
import { EIP6963Emitter } from "../../ethereum";

interface UniversalSignInContextProviderProps
  extends Omit<DynamicContextProps, "settings"> {
  /**
   * The Dynamic environment to use.
   * - "sandbox": Development/testing environment
   * - "live": Production environment
   *
   * This must be explicitly specified - no default is provided to prevent accidental production usage.
   */
  environment: DynamicEnvironment;

  /**
   * Dynamic settings to merge with defaults.
   * Note: environmentId, walletConnectors, walletsFilter, and overrides.views are automatically set and cannot be overridden.
   */
  settings?: Omit<
    DynamicContextProps["settings"],
    "environmentId" | "walletConnectors" | "walletsFilter"
  > & {
    /**
     * Override settings (excluding views which are fixed).
     * The views configuration is automatically set to show only wallet login and cannot be customized.
     */
    overrides?: Omit<DynamicContextProps["settings"]["overrides"], "views">;
  };
}

export const UniversalSignInContextProvider: React.FC<
  UniversalSignInContextProviderProps
> = ({
  children,
  environment,
  settings = {},
  ...otherProps
}: UniversalSignInContextProviderProps) => {
  // Get the environment ID based on the selected environment
  const environmentId = DYNAMIC_ENVIRONMENT_IDS[environment];

  // Initialize EIP6963 wallet with the proper environment ID
  useEffect(() => {
    EIP6963Emitter(environmentId);
  }, [environmentId]);

  // Extract overrides from settings
  const { overrides, ...otherSettings } = settings;

  const dynamicProviderSettings: DynamicContextProps["settings"] = {
    // Merge user settings first
    ...otherSettings,
    // Set the environment ID based on the environment prop
    environmentId,

    // Merge user overrides with fixed views configuration
    overrides: {
      ...overrides,
      views: [
        {
          sections: [{ type: SdkViewSectionType.Wallet }],
          type: SdkViewType.Login,
        },
      ],
    },

    // Fixed wallet connectors - only Ethereum connectors are supported
    walletConnectors: [EthereumWalletConnectors],

    // Fixed wallet filter - cannot be overridden
    walletsFilter: wallets =>
      wallets.filter(w => w.key === GLOBAL_WALLET_KEY_ID),
  };

  return (
    <DynamicContextProvider settings={dynamicProviderSettings} {...otherProps}>
      {children}
    </DynamicContextProvider>
  );
};

export default UniversalSignInContextProvider;
