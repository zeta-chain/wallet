import { createClient } from "@dynamic-labs/client";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { ReactNativeExtension } from "@dynamic-labs/react-native-extension";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import React, { createContext, useContext, useMemo } from "react";
import { View } from "react-native";

import {
  DYNAMIC_ENVIRONMENT_IDS,
  type DynamicEnvironment,
  REQUIRED_NETWORKS_CHAIN_IDS,
} from "../../constants";
import { useAutoNetworkSwitchOnConnection } from "../hooks/useAutoNetworkSwitchOnConnection";
import type { TypedDynamicClient } from "../types";

interface UniversalSignInContextValue {
  dynamicClient: TypedDynamicClient;
}

const UniversalSignInContext = createContext<
  UniversalSignInContextValue | undefined
>(undefined);

interface UniversalSignInContextProviderProps {
  /**
   * Children components to render
   */
  children: React.ReactNode;

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
   * Note: environmentId is automatically set and cannot be overridden.
   */
  settings?: {
    [key: string]: unknown;
    appLogoUrl?: string;
    appName?: string;
    overrides?: {
      evmNetworks?: Array<{
        [key: string]: unknown;
        chainId: number;
        name: string;
      }>;
    };
    walletConnectPreferredChains?: string[];
  };
}

export const UniversalSignInContextProvider: React.FC<
  UniversalSignInContextProviderProps
> = ({
  children,
  environment,
  settings = {},
  initialChainId,
}: UniversalSignInContextProviderProps) => {
  // Get the environment ID based on the selected environment
  const environmentId = DYNAMIC_ENVIRONMENT_IDS[environment];

  // Create the Dynamic client with React Native extension
  const dynamicClient = useMemo<TypedDynamicClient>(() => {
    interface EvmNetwork {
      [key: string]: unknown;
      chainId: number;
      name: string;
    }

    interface ClientConfig {
      appLogoUrl?: string;
      appName?: string;
      environmentId: string;
      overrides: {
        evmNetworks: (dashboardNetworks: EvmNetwork[]) => EvmNetwork[];
      };
      walletConnectPreferredChains: string[];
      walletConnectors: unknown[];
    }

    interface ClientWithExtend {
      extend: (extension: unknown) => TypedDynamicClient;
    }

    // Create client configuration
    const clientConfig: ClientConfig = {
      appLogoUrl: settings.appLogoUrl,
      appName: settings.appName,
      environmentId,
      overrides: {
        evmNetworks: (dashboardNetworks: EvmNetwork[]): EvmNetwork[] => {
          // Merge user-provided networks if they exist
          const userNetworks: EvmNetwork[] =
            settings.overrides?.evmNetworks || [];

          const requiredNetworksChainIds = Object.values(
            REQUIRED_NETWORKS_CHAIN_IDS
          );
          const requiredNetworks = dashboardNetworks.filter(
            (network: EvmNetwork) =>
              requiredNetworksChainIds.includes(Number(network.chainId))
          );

          // Merge required networks with user networks
          const allNetworks: EvmNetwork[] = [
            ...requiredNetworks,
            ...userNetworks,
          ];

          // Remove duplicates by chainId
          const uniqueNetworks = Array.from(
            new Map(
              allNetworks.map((network: EvmNetwork) => [
                network.chainId,
                network,
              ])
            ).values()
          );

          // Sort networks alphabetically by name for consistent ordering
          return uniqueNetworks.sort((a: EvmNetwork, b: EvmNetwork) =>
            a.name.localeCompare(b.name)
          );
        },
      },
      walletConnectPreferredChains: settings.walletConnectPreferredChains || [
        "eip155:7000",
      ],
      walletConnectors: [EthereumWalletConnectors, SolanaWalletConnectors],
    };

    // Helper function to safely create and extend the client
    // We use type assertions here because the Dynamic SDK's types
    // don't fully expose the extend method's return type
    const createAndExtendClient = (
      config: ClientConfig,
      extensionFactory: () => unknown
    ): TypedDynamicClient => {
      // Type assertion: createClient returns a client with extend method
      const createdClientUnknown: unknown = createClient(
        config as unknown as Parameters<typeof createClient>[0]
      );
      const clientWithExtend = createdClientUnknown as ClientWithExtend;
      const extensionUnknown: unknown = extensionFactory();
      return clientWithExtend.extend(extensionUnknown);
    };

    const extensionFactory = (): unknown => {
      // Type assertion: ReactNativeExtension returns an extension object
      const extensionUnknown: unknown = ReactNativeExtension();
      return extensionUnknown;
    };
    const extendedClient = createAndExtendClient(
      clientConfig,
      extensionFactory
    );

    return extendedClient;
  }, [environmentId, settings]);

  // Automatically switch to specified chain when a wallet is first connected
  useAutoNetworkSwitchOnConnection(initialChainId);

  const contextValue = useMemo<UniversalSignInContextValue>(
    () => ({ dynamicClient }),
    [dynamicClient]
  );

  return (
    <UniversalSignInContext.Provider value={contextValue}>
      <dynamicClient.reactNative.WebView />
      <View style={{ flex: 1 }}>{children}</View>
    </UniversalSignInContext.Provider>
  );
};

/**
 * Hook to access the Universal Sign-In context
 */
export const useUniversalSignInContextValue = () => {
  const context = useContext(UniversalSignInContext);
  if (!context) {
    throw new Error(
      "useUniversalSignInContextValue must be used within UniversalSignInContextProvider"
    );
  }
  return context;
};

export default UniversalSignInContextProvider;
