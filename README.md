# @zetachain/wallet

Universal Sign In library for ZetaChain applications, providing easy wallet integration with Dynamic.

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
import { UniversalSignInContextProvider, DynamicUserProfile } from '@zetachain/wallet';

function App() {
  return (
    <UniversalSignInContextProvider
      environmentId="your-dynamic-environment-id"
      theme="light"
    >
      <div>
        <h1>My App</h1>
        <DynamicUserProfile />
        {/* Your app content */}
      </div>
    </UniversalSignInContextProvider>
  );
}

export default App;
```

### Advanced Configuration

```tsx
import React from 'react';
import { 
  UniversalSignInContextProvider, 
  evmNetworks,
  useTheme,
  useDynamicContext 
} from '@zetachain/wallet';

// Custom networks configuration
const customNetworks = [
  // Your custom EVM networks
  ...evmNetworks,
  {
    blockExplorerUrls: ['https://your-explorer.com/'],
    chainId: 123456,
    chainName: 'Custom Chain',
    // ... other network properties
  }
];

function App() {
  return (
    <UniversalSignInContextProvider
      environmentId="your-dynamic-environment-id"
      theme="dark"
      overrideNetworks={customNetworks}
      dynamicSettings={{
        // Additional Dynamic SDK settings
      }}
    >
      <AppContent />
    </UniversalSignInContextProvider>
  );
}

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useDynamicContext();

  return (
    <div>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
      {isAuthenticated && <p>User is signed in!</p>}
    </div>
  );
}
```

## API Reference

### UniversalSignInContextProvider

The main provider component that wraps your app with Dynamic wallet functionality.

**Props:**
- `environmentId` (optional): Dynamic environment ID. Defaults to ZetaChain's test environment.
- `children`: React children elements
- `theme` (optional): Theme mode - `'light'` or `'dark'`. Defaults to `'light'`.
- `overrideNetworks` (optional): Custom EVM networks array
- `walletConnectors` (optional): Custom wallet connectors. Defaults to Ethereum connectors.
- `dynamicSettings` (optional): Additional settings to pass to DynamicContextProvider

### Hooks

#### useTheme()
Returns theme context with current theme and toggle function.

```tsx
const { theme, toggleTheme } = useTheme();
```

### Re-exported Components & Hooks

The library re-exports commonly used Dynamic SDK components and hooks:
- `DynamicUserProfile`: User profile component
- `useDynamicContext`: Main Dynamic context hook
- `useIsLoggedIn`: Authentication status hook  
- `useUserWallets`: User wallets hook

### Constants

- `evmNetworks`: Default EVM networks configuration
- `SUPPORTED_CHAINS`: Supported blockchain configurations
- `SUPPORTED_CHAIN_IDS`: Array of supported chain IDs

## Development

### Building

```bash
yarn build
```

This builds the library in multiple formats:
- ESM: `dist/esm/`
- CommonJS: `dist/cjs/`
- TypeScript declarations: `dist/types/`