import { useEffect, useState } from "react";

import type { PrimaryWallet } from "../../types";
import { useUniversalSignInContextValue } from "../providers/UniversalSignInContextProvider";
import { isDynamicClient } from "../types";

/**
 * Hook that provides access to the Universal Sign-In context.
 * This mirrors the React implementation but uses the client-based approach.
 */
interface DynamicUser {
  [key: string]: unknown;
  email?: string;
}

export const useUniversalSignInContext = () => {
  const { dynamicClient } = useUniversalSignInContextValue();

  if (!isDynamicClient(dynamicClient)) {
    throw new Error("Dynamic client is not properly initialized");
  }

  const initialUser: DynamicUser | null =
    (dynamicClient.user as DynamicUser | null) || null;

  const initialPrimaryWallet: PrimaryWallet | null =
    dynamicClient.primaryWallet;

  const initialIsAuthenticated: boolean = dynamicClient.isAuthenticated;

  const [user, setUser] = useState<DynamicUser | null>(initialUser);
  const [primaryWallet, setPrimaryWallet] = useState<PrimaryWallet | null>(
    initialPrimaryWallet
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialIsAuthenticated
  );

  useEffect(() => {
    const unsubscribeUser = dynamicClient.on("user", (newUser: unknown) => {
      setUser((newUser as DynamicUser | null) || null);
    });

    const unsubscribePrimaryWallet = dynamicClient.on(
      "primaryWalletChanged",
      (newWallet: unknown) => {
        setPrimaryWallet((newWallet as PrimaryWallet | null) || null);
      }
    );

    const unsubscribeAuth = dynamicClient.on("authFlowComplete", () => {
      setIsAuthenticated(dynamicClient.isAuthenticated);
    });

    return () => {
      unsubscribeUser();
      unsubscribePrimaryWallet();
      unsubscribeAuth();
    };
  }, [dynamicClient]);

  return {
    dynamicClient,
    isAuthenticated,
    primaryWallet,
    user,
  };
};
