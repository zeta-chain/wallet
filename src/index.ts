// Core wallet exports
export * from "@dynamic-labs/global-wallet-client/features";

// Export wallet utilities
export { getWallet } from "./lib/wallet";

// Export constants and types
export { DYNAMIC_ENVIRONMENT_IDS, type DynamicEnvironment } from "./constants";
export type { PrimaryWallet } from "./types";

// Export key ethereum utilities (excluding isEthereumWallet due to conflict with global-wallet-client)
export {
  createConnector,
  EthereumInjectedConnector,
  EthereumWalletConnector,
  EthereumWalletConnectors,
  EthProviderHelper,
  ExodusEvm,
  FallbackEvmConnector,
  fetchInjectedWalletConnector,
  injectedWalletOverrides,
  PhantomEvm,
} from "@dynamic-labs/ethereum";
