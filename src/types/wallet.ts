import { useUniversalSignInContext } from "../react";

export type PrimaryWallet = ReturnType<
  typeof useUniversalSignInContext
>["primaryWallet"];
