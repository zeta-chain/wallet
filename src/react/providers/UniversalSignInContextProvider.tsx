import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import {
  type DynamicContextProps,
  DynamicContextProvider,
  mergeNetworks,
} from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { SuiWalletConnectors } from "@dynamic-labs/sui";
import React, { useEffect } from "react";

import {
  DYNAMIC_ENVIRONMENT_IDS,
  type DynamicEnvironment,
  REQUIRED_NETWORKS_CHAIN_IDS,
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
   * Chain ID to switch to when a wallet is first connected.
   * Defaults to ZetaChain mainnet (7000).
   */
  initialChainId?: number;

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
  initialChainId,
  ...otherProps
}: UniversalSignInContextProviderProps) => {
  // Get the environment ID based on the selected environment
  const environmentId = DYNAMIC_ENVIRONMENT_IDS[environment];

  // Initialize EIP6963 wallet with the proper environment ID
  useEffect(() => {
    EIP6963Emitter(environmentId);
  }, [environmentId]);

  // Automatically switch to specified chain when a wallet is first connected
  useAutoNetworkSwitchOnConnection(initialChainId);

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

    // Merge user overrides while ensuring required networks are always present
    overrides: {
      ...settings.overrides,
      evmNetworks: (dashboardNetworks) => {
        // First merge user-provided networks if they exist
        const evmNetworksUserOverride = settings.overrides?.evmNetworks;
        const userNetworks =
          typeof evmNetworksUserOverride === "function"
            ? evmNetworksUserOverride(dashboardNetworks)
            : (evmNetworksUserOverride ?? dashboardNetworks);

        const requiredNetworksChainIds = Object.values(
          REQUIRED_NETWORKS_CHAIN_IDS
        );
        const requiredNetworks = dashboardNetworks.filter((network) =>
          requiredNetworksChainIds.includes(Number(network.chainId))
        );

        // Then merge with required networks to ensure Ethereum and ZetaChain are always present
        const merged = mergeNetworks(requiredNetworks, userNetworks);

        // Sort networks alphabetically by name for consistent ordering
        const sorted = merged.sort((a, b) => a.name.localeCompare(b.name));

        return sorted;
      },
    },

    // Provide default walletConnectPreferredChains if not set in user settings
    walletConnectPreferredChains: settings.walletConnectPreferredChains || [
      "eip155:7000",
    ],

    walletConnectors: [
      EthereumWalletConnectors,
      SolanaWalletConnectors,
      SuiWalletConnectors,
    ],
  };

  return (
    <DynamicContextProvider settings={dynamicProviderSettings} {...otherProps}>
      {children}
    </DynamicContextProvider>
  );
};

export default UniversalSignInContextProvider;
