import type { ComponentType } from "react";

import type { PrimaryWallet } from "../types";

/**
 * Extended DynamicClient type with React Native specific methods and properties
 * This represents the client returned by createClient().extend(ReactNativeExtension())
 */
export interface TypedDynamicClient {
  isAuthenticated: boolean;
  off: (event: string, callback: (data: unknown) => void) => void;
  on: (event: string, callback: (data: unknown) => void) => () => void;
  primaryWallet: PrimaryWallet | null;
  reactNative: {
    WebView: ComponentType;
  };
  selectWalletOption: (walletKeyId: string) => void;
  user: unknown;
}

/**
 * Type guard to check if an object has the TypedDynamicClient interface
 */
export const isDynamicClient = (
  client: unknown
): client is TypedDynamicClient => {
  if (typeof client !== "object" || client === null) {
    return false;
  }

  const hasOn =
    "on" in client && typeof (client as { on: unknown }).on === "function";
  const hasOff =
    "off" in client && typeof (client as { off: unknown }).off === "function";
  const hasSelectWalletOption =
    "selectWalletOption" in client &&
    typeof (client as { selectWalletOption: unknown }).selectWalletOption ===
      "function";
  const hasUser = "user" in client;
  const hasPrimaryWallet = "primaryWallet" in client;
  const hasIsAuthenticated = "isAuthenticated" in client;
  const hasReactNative =
    "reactNative" in client &&
    typeof (client as { reactNative: unknown }).reactNative === "object" &&
    (client as { reactNative: { WebView?: unknown } }).reactNative?.WebView !==
      undefined;

  return (
    hasOn &&
    hasOff &&
    hasSelectWalletOption &&
    hasUser &&
    hasPrimaryWallet &&
    hasIsAuthenticated &&
    hasReactNative
  );
};
