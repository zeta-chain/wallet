import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import {
  type DynamicContextProps,
  DynamicContextProvider,
} from "@dynamic-labs/sdk-react-core";
import React, { useEffect } from "react";

import {
  DYNAMIC_ENVIRONMENT_IDS,
  type DynamicEnvironment,
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
   * Note: environmentId is automatically set based on the environment prop.
   */
  settings?: Omit<DynamicContextProps["settings"], "environmentId"> & {
    /**
     * Additional wallet connectors to include alongside the required ZetaChain Ethereum connectors.
     * The ZetaChain Ethereum wallet will always be included and cannot be removed.
     */
    additionalWalletConnectors?: DynamicContextProps["settings"]["walletConnectors"];
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

  // Extract additionalWalletConnectors from settings
  const { additionalWalletConnectors, ...otherSettings } = settings;

  const dynamicProviderSettings: DynamicContextProps["settings"] = {
    // Merge user settings first
    ...otherSettings,
    // Set the environment ID based on the environment prop
    environmentId,
    // Always include our wallet connectors + any additional ones
    walletConnectors: [
      EthereumWalletConnectors,
      ...(additionalWalletConnectors || []),
    ],
  };

  return (
    <DynamicContextProvider settings={dynamicProviderSettings} {...otherProps}>
      {children}
    </DynamicContextProvider>
  );
};

export default UniversalSignInContextProvider;
