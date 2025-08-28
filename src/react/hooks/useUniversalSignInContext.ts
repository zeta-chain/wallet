import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

/**
 * Hook that provides access to the Universal Sign-In context.
 * This is a branded wrapper around Dynamic's useDynamicContext hook.
 */
export const useUniversalSignInContext = (): ReturnType<
  typeof useDynamicContext
> => useDynamicContext();
