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
import React from 'react';
import { UniversalSignInContextProvider, useConnectUniversalSignIn } from '@zetachain/wallet/react';

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
    <button onClick={connectUniversalSignIn}>
      Connect Universal Sign-In
    </button>
  );
}

export default App;
```

### Advanced Configuration

```tsx
import React from 'react';
import { 
  UniversalSignInContextProvider,
  useConnectUniversalSignIn,
  useUniversalSignInContext 
} from '@zetachain/wallet/react';

function App() {
  return (
    <UniversalSignInContextProvider 
      environment="live"
      settings={{
        overrides: {
          // Your custom overrides here
        },
        
        // Other Dynamic SDK settings
        appLogoUrl: 'https://your-app.com/logo.png',
        appName: 'My ZetaChain App',
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
<button onClick={connectUniversalSignIn}>Connect</button>
```

#### useUniversalSignInContext()
Access the Universal Sign-In authentication state and user information.

### Re-exported Dynamic SDK Components & Hooks

**From `@zetachain/wallet/react`:**
- Everything from `@dynamic-labs/sdk-react-core` (React components, hooks, types, utilities)

**From `@zetachain/wallet` (main package):**
- Core wallet functionality from `@dynamic-labs/global-wallet-client/features`  
- Key Ethereum utilities from `@dynamic-labs/ethereum` (connectors, helpers, etc.)
- Ethers.js integration from `@dynamic-labs/ethers-v6`

This means you never need to install Dynamic SDK packages directly.

For authentication state and user information, use `useUniversalSignInContext`.

## Environment Configuration

The library supports two environments:

- **`"sandbox"`**: Development/testing environment
- **`"live"`**: Production environment

The environment determines which Dynamic environment ID is used internally. You cannot specify a custom `environmentId` - this is managed automatically based on your environment selection to ensure proper configuration.

## Development

### Building

```bash
yarn build
```

This builds the library in multiple formats:
- ESM: `dist/esm/`
- CommonJS: `dist/cjs/`
- TypeScript declarations: `dist/types/`