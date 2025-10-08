# @zetachain/wallet

Universal Sign In library for ZetaChain applications, providing streamlined wallet integration with Dynamic SDK.

## Installation

```bash
npm install @zetachain/wallet
# or
yarn add @zetachain/wallet
```

## Usage

### Basic Setup

```tsx
import React from "react";
import {
  UniversalSignInContextProvider,
  useConnectUniversalSignIn,
} from "@zetachain/wallet/react";

function App() {
  return (
    <UniversalSignInContextProvider environment="sandbox">
      <div>
        <h1>My ZetaChain App</h1>
        <ConnectButton />
        {/* Your app content */}
      </div>
    </UniversalSignInContextProvider>
  );
}

function ConnectButton() {
  const { connectUniversalSignIn } = useConnectUniversalSignIn();

  return (
    <button onClick={connectUniversalSignIn}>Connect Universal Sign-In</button>
  );
}

export default App;
```

### Advanced Configuration

```tsx
import React from "react";
import {
  UniversalSignInContextProvider,
  useConnectUniversalSignIn,
  useUniversalSignInContext,
} from "@zetachain/wallet/react";

function App() {
  return (
    <UniversalSignInContextProvider
      environment="live"
      settings={{
        overrides: {
          // Your custom overrides here
        },

        // Other Dynamic SDK settings
        appLogoUrl: "https://your-app.com/logo.png",
        appName: "My ZetaChain App",
      }}
    >
      <AppContent />
    </UniversalSignInContextProvider>
  );
}

function AppContent() {
  const { isAuthenticated, user } = useUniversalSignInContext();
  const { connectUniversalSignIn } = useConnectUniversalSignIn();

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={connectUniversalSignIn}>
          Connect Universal Sign-In
        </button>
      ) : (
        <div>
          <p>Welcome, {user?.email}!</p>
          <p>Connected to Universal Sign-In EVM</p>
        </div>
      )}
    </div>
  );
}
```

## API Reference

### UniversalSignInContextProvider

The main provider component that configures Dynamic SDK for ZetaChain's Universal Sign-In.

**Required Props:**

- `environment`: **Required**. Must be either `"sandbox"` (development) or `"live"` (production)
- `children`: React children elements

**Optional Props:**

- `settings`: Dynamic SDK configuration object with the following structure:
  - `cssOverrides`: Custom CSS styles (built-in overrides are applied after user styles for consistent UX)
  - `walletConnectPreferredChains`: Array of preferred chain IDs for WalletConnect (defaults to `["eip155:7000"]`)
  - `overrides`: Dynamic SDK override settings
  - All other standard Dynamic SDK settings (appName, appLogoUrl, etc.)

**Protected/Automatic Settings:**
The following settings are automatically configured and cannot be overridden:

- `environmentId`: Set based on the `environment` prop
- `walletConnectors`: Automatically configured with appropriate wallet connectors

**CSS Override Behavior:**

- User-provided `cssOverrides` are applied first
- Built-in CSS overrides (e.g., hiding the back button) are applied last to ensure consistent UX
- This means built-in styles take precedence over user styles when there are conflicts

### Hooks

#### useConnectUniversalSignIn()

Hook that provides a handler to connect to Universal Sign-In EVM.

```tsx
const { connectUniversalSignIn } = useConnectUniversalSignIn();

// Use in a button click handler
<button onClick={connectUniversalSignIn}>Connect</button>;
```

#### useUniversalSignInContext()

Access the Universal Sign-In authentication state and user information.

### Re-exported Dynamic SDK Components & Hooks

**From `@zetachain/wallet/react`:**

- Everything from `@dynamic-labs/sdk-react-core` (React components, hooks, types, utilities)

**From `@zetachain/wallet` (main package):**

- Core wallet functionality from `@dynamic-labs/global-wallet-client/features`
- Key Ethereum utilities from `@dynamic-labs/ethereum` (connectors, helpers, etc.)

**From `@zetachain/wallet/ethers`:**

- Ethers.js integration from `@dynamic-labs/ethers-v6`

**From `@zetachain/wallet/viem`:**

- Viem integration utilities including `getViemWalletClient()` function

This means you never need to install Dynamic SDK packages directly.

For authentication state and user information, use `useUniversalSignInContext`.

## Viem Integration

For applications using Viem, you can access wallet functionality through the dedicated Viem exports:

```tsx
import { getViemWalletClient } from "@zetachain/wallet/viem";
import { useUniversalSignInContext } from "@zetachain/wallet/react";
import { parseEther } from "viem";

function SendTransaction() {
  const { primaryWallet } = useUniversalSignInContext();

  const handleSend = async () => {
    if (!primaryWallet) return;

    const walletClient = getViemWalletClient(primaryWallet);

    const hash = await walletClient.sendTransaction({
      to: "0x...",
      value: parseEther("1.0"),
    });

    console.log("Transaction hash:", hash);
  };

  return <button onClick={handleSend}>Send Transaction</button>;
}
```

**Available Viem exports:**

- `getViemWalletClient(primaryWallet)`: Extracts a Viem WalletClient from a Primary Wallet instance
- `PrimaryWallet`: Type for the base primary wallet
- `PrimaryWalletWithViemWalletClient`: Type for primary wallet with Viem support

## Solana Integration

For Solana wallets, the library provides type-safe access to the `getSigner()` method through type extensions.

```typescript
import { type PrimaryWallet } from '@zetachain/wallet';
import { getSolanaWalletAdapter } from '@zetachain/wallet/solana';

function SolanaTransactionButton({ primaryWallet }) {
  const handleSolanaTransaction = async () => {
    try {
      // getSolanaWalletAdapter handles the Solana wallet check internally
      const walletAdapter = await getSolanaWalletAdapter(primaryWallet);
      console.log('Public key:', walletAdapter.publicKey.toBase58());

      if (walletAdapter.signTransaction) {
        const signedTx = await walletAdapter.signTransaction(transaction);
      }
    } catch (error) {
      console.error('Not a Solana wallet or transaction failed:', error);
      // Handle non-Solana wallet or other errors gracefully
    }
  };

  return <button onClick={handleSolanaTransaction}>Sign Solana Transaction</button>;
}
```

**Available Solana exports:**

- `getSolanaWalletAdapter(primaryWallet)`: Extracts a Solana WalletAdapter from a Primary Wallet instance (includes automatic Solana wallet validation)
- `PrimaryWalletWithSolanaSigner`: Type for primary wallet with Solana support
- `SolanaWalletAdapter`: Interface for Solana wallet adapter with signing capabilities

The `getSolanaWalletAdapter` function automatically validates that the wallet is a Solana wallet, so you don't need to check `isSolanaWallet` manually - just handle the error if it's not a Solana wallet.

## Environment Configuration

The library supports two environments:

- **`"sandbox"`**: Development/testing environment
- **`"live"`**: Production environment

The environment determines which Dynamic environment ID is used internally. You cannot specify a custom `environmentId` - this is managed automatically based on your environment selection to ensure proper configuration.

## Network Management

**Automatic Network Inclusion**: ZetaChain and Ethereum networks are automatically included based on ZetaChain's Dynamic environment configuration. Users can add additional custom networks via `settings.overrides.evmNetworks`.

```tsx
<UniversalSignInContextProvider
  environment="live"
  settings={{
    overrides: {
      // Add your own networks
      evmNetworks: [myCustomNetwork]
    }
  }}
>
```

**Network Features**:

- Required ZetaChain and Ethereum networks are always available
- Custom networks are merged with required ones
- Duplicate networks (same chainId) are automatically handled
- All networks are sorted alphabetically for consistent display

## Development

### Building

```bash
yarn build
```

This builds the library in multiple formats:

- ESM: `dist/esm/`
- CommonJS: `dist/cjs/`
- TypeScript declarations: `dist/types/`
