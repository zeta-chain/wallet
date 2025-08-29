import Wallet from "./lib/wallet";

// Core wallet exports
export * from "@dynamic-labs/global-wallet-client/features";

// Export constants and types
export { DYNAMIC_ENVIRONMENT_IDS, type DynamicEnvironment } from "./constants";

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

export default Wallet;
