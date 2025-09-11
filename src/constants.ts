/**
 * Dynamic Labs Environment IDs for ZetaChain
 */
export const DYNAMIC_ENVIRONMENT_IDS = {
  live: "ca10c7f8-2006-4d9c-b879-ebcf16709190",
  sandbox: "eaec6949-d524-40e7-81d2-80113243499a",
} as const;

/**
 * Supported Dynamic environments
 */
export type DynamicEnvironment = keyof typeof DYNAMIC_ENVIRONMENT_IDS;

/**
 * Global wallet key ID for universal sign-in EVM
 */
export const GLOBAL_WALLET_KEY_ID = "universalsigninevm";

export const REQUIRED_NETWORKS_CHAIN_IDS = {
  ETHEREUM_MAINNET: 1,
  ETHEREUM_SEPOLIA: 11155111,
  ZETACHAIN_MAINNET: 7000,
  ZETACHAIN_TESTNET: 7001,
};
