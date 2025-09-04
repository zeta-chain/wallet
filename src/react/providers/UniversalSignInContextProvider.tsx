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
import { useAutoNetworkSwitchOnConnection } from "../hooks/useAutoNetworkSwitchOnConnection";

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
   * Note: environmentId and walletConnectors are automatically set and cannot be overridden.
   * Built-in CSS overrides are applied after user-provided cssOverrides to ensure consistent UX.
   */
  settings?: Omit<
    DynamicContextProps["settings"],
    "environmentId" | "walletConnectors"
  >;
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

  // Automatically switch to ZetaChain mainnet when a wallet is first connected
  useAutoNetworkSwitchOnConnection();

  const builtInCssOverrides = `
    button[data-testid="back-button"] {
      display: none;
    }
  `;

  // Merge user CSS first, then built-in CSS (built-in styles applied last for consistency)
  // Add newline separator if user CSS exists to prevent malformed CSS
  const mergedCssOverrides = `${settings.cssOverrides || ""}${settings.cssOverrides ? "\n" : ""}${builtInCssOverrides}`;

  const dynamicProviderSettings: DynamicContextProps["settings"] = {
    // Merge user settings first
    ...settings,

    // Combine built-in CSS overrides with user-provided ones
    cssOverrides: mergedCssOverrides,

    // Set the environment ID based on the environment prop
    environmentId,

    // Provide default walletConnectPreferredChains if not set in user settings
    walletConnectPreferredChains: settings.walletConnectPreferredChains || [
      "eip155:7000",
    ],

    walletConnectors: [EthereumWalletConnectors],
  };

  return (
    <DynamicContextProvider settings={dynamicProviderSettings} {...otherProps}>
      {children}
    </DynamicContextProvider>
  );
};

export default UniversalSignInContextProvider;
