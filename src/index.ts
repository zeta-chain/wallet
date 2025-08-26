import Wallet from "./lib/wallet";

// Core wallet exports
export * from "@dynamic-labs/global-wallet-client/features";

// Export constants and types
export { DYNAMIC_ENVIRONMENT_IDS, type DynamicEnvironment } from "./constants";

// Framework-agnostic ethers integration
export { getSigner, getWeb3Provider } from "@dynamic-labs/ethers-v6";

export default Wallet;
