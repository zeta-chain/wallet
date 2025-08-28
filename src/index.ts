import Wallet from "./lib/wallet";

// Core wallet exports
export * from "@dynamic-labs/global-wallet-client/features";

// Export constants and types
export { DYNAMIC_ENVIRONMENT_IDS, type DynamicEnvironment } from "./constants";

// Framework-agnostic blockchain integrations
export { getSigner, getWeb3Provider } from "@dynamic-labs/ethers-v6";

// Export key ethereum utilities (excluding isEthereumWallet due to conflict with global-wallet-client)
export {
  EthereumWalletConnectors,
  EthereumWalletConnector,
  createConnector,
  PhantomEvm,
  ExodusEvm,
  FallbackEvmConnector,
  fetchInjectedWalletConnector,
  injectedWalletOverrides,
  EthereumInjectedConnector,
  EthProviderHelper,
} from "@dynamic-labs/ethereum";

export default Wallet;
