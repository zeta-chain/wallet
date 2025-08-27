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
import { UniversalSignInContextProvider, useConnectUniversalSignIn } from '@zetachain/wallet';

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
  useDynamicContext 
} from '@zetachain/wallet';

function App() {
  return (
    <UniversalSignInContextProvider 
      environment="live"
      settings={{
        // Additional wallet connectors (optional)
        additionalWalletConnectors: [/* custom connectors */],
        
        // Override settings (views are fixed and cannot be overridden)
        overrides: {
          // Custom overrides except views
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
  const { isAuthenticated, user } = useDynamicContext();
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
  - `additionalWalletConnectors`: Additional wallet connectors to include alongside the required Ethereum connectors
  - `overrides`: Dynamic SDK override settings (note: `views` configuration is fixed and cannot be overridden)
  - All other standard Dynamic SDK settings (appName, appLogoUrl, etc.)

**Protected/Automatic Settings:**
The following settings are automatically configured and cannot be overridden:
- `environmentId`: Set based on the `environment` prop
- `walletConnectors`: Always includes Ethereum connectors + any additional ones you specify
- `walletsFilter`: Fixed to show only Universal Sign-In EVM wallet
- `overrides.views`: Fixed to show only wallet login view

### Hooks

#### useConnectUniversalSignIn()
Hook that provides a handler to connect to Universal Sign-In EVM.

```tsx
const { connectUniversalSignIn } = useConnectUniversalSignIn();

// Use in a button click handler
<button onClick={connectUniversalSignIn}>Connect</button>
```

#### useUniversalSignInContext()
Access the Universal Sign-In context (if you've implemented custom context logic).

### Re-exported Dynamic SDK Components & Hooks

The library re-exports commonly used Dynamic SDK components and hooks:
- `useDynamicContext`: Main Dynamic context hook for authentication state
- `DynamicUserProfile`: Pre-built user profile component
- `useUserWallets`: Hook to access connected wallets
- `useIsLoggedIn`: Simple authentication status hook

### Constants

- `DYNAMIC_ENVIRONMENT_IDS`: Mapping of environment names to Dynamic environment IDs
- `GLOBAL_WALLET_KEY_ID`: The wallet key ID for Universal Sign-In EVM ("universalsigninevm")

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