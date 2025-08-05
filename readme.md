# @pakt/auth-module

A comprehensive React authentication module for Pakt applications. This package provides a complete authentication solution with support for email/password authentication, Google OAuth, and two-factor authentication.

## Features

- **Email/Password Authentication**: Complete signup, login, and password reset flows
- **Google OAuth Integration**: Seamless Google authentication
- **Two-Factor Authentication**: Email-based 2FA support
- **Password Reset**: Forgot password and reset functionality
- **Email Verification**: Account verification with resend capability
- **Customizable UI**: Theme customization support with CSS custom properties
- **TypeScript Support**: Full type definitions included
- **Responsive Design**: Works on desktop and mobile devices
- **Tailwind CSS v4**: Built with the latest Tailwind CSS for optimal performance
- **Zero CSS Dependencies**: Styles are inlined into JavaScript bundles
- **Modern Architecture**: Pure CSS without preprocessor dependencies
- **Scoped Styling**: Prefixed classes prevent style conflicts

## Installation

```bash
yarn add @pakt/auth-module
# or
npm install @pakt/auth-module
# or
bun add @pakt/auth-module
```

## Quick Start

```typescript
// In your component
import React, { useRef } from 'react';
import PaktAuth, { AuthRef, ConfigContextType } from '@pakt/auth-module';

// No need to import CSS - styles are automatically included in the JavaScript bundle

function App() {
  const authRef = useRef<AuthRef>(null);

  const config: ConfigContextType = {
    theme: {
      primary: "#007C5B",
      secondary: "#19A966",
      title: "#1F2937",
      body: "#6B7280",
    },
    googleOAuth: {
      clientId: "your-google-client-id.apps.googleusercontent.com",
    },
    paktSDK: {
      baseUrl: "https://api-devpaktbuild.chain.site",
      verbose: true,
    },
    errorHandler: (errorMessage: string) => {
      console.error("Auth Error:", errorMessage);
    },
  };

  const handleLoginSuccess = (userData: any) => {
    console.log("Login successful:", userData);
    // Handle successful login
  };

  const handleSignupSuccess = (userData: any) => {
    console.log("Signup successful:", userData);
    // Handle successful signup
  };

  const openLogin = () => authRef.current?.onLogin();
  const openSignup = () => authRef.current?.onSignup();

  return (
    <div>
      <button onClick={openLogin}>Login</button>
      <button onClick={openSignup}>Sign Up</button>
      
      <PaktAuth
        config={config}
        ref={authRef}
        onLoginSuccess={handleLoginSuccess}
        onSignupSuccess={handleSignupSuccess}
      />
    </div>
  );
}
```

## Configuration

### ConfigContextType

The main configuration object for the PaktAuth component:

```typescript
interface ConfigContextType {
  // Theme customization
  theme?: ITheme;
  
  // Error handling
  errorHandler?: (errorMessage: string) => void;
  
  // Google OAuth configuration
  googleOAuth?: GoogleOAuthConfig;
  
  // PAKT SDK configuration (required)
  paktSDK: PaktSDKConfig;
}
```

### Theme Configuration

Customize the appearance of the authentication components:

```typescript
interface ITheme {
  primary?: string;      // Primary color
  secondary?: string;    // Secondary color
  info?: string;         // Info color
  line?: string;         // Border/line color
  title?: string;        // Title text color
  body?: string;         // Body text color
  warning?: string;      // Warning color
  success?: string;      // Success color
  danger?: string;       // Error/danger color
  magnolia?: string;     // Background color
  "exhibit-tab-list"?: string;
  "primary-brighter"?: string;
  "refer-border"?: string;
  "btn-primary"?: string;
  "primary-gradient"?: string;
  "modal-radius"?: string;
}
```

### Google OAuth Configuration

```typescript
interface GoogleOAuthConfig {
  clientId: string;           // Required: Your Google OAuth client ID
  clientSecret?: string;      // Optional: Client secret
  redirectUri?: string;       // Optional: Redirect URI
  scope?: string[];           // Optional: OAuth scopes
  hostedDomain?: string;      // Optional: Hosted domain restriction
}
```

### PAKT SDK Configuration

```typescript
interface PaktSDKConfig {
  baseUrl: string;    // Required: API base URL
  testnet?: boolean;  // Optional: Use testnet
  verbose?: boolean;  // Optional: Enable verbose logging
}
```

## Component Props

### PaktAuth Props

```typescript
interface PaktAuthProps {
  config: ConfigContextType;                    // Required: Configuration object
  onLoginSuccess?: (userData: any) => void;     // Optional: Login success callback
  onSignupSuccess?: (userData: any) => void;    // Optional: Signup success callback
}
```

### AuthRef Methods

Access authentication methods through the ref:

```typescript
interface AuthRef {
  onLogin: () => void;    // Opens the login dialog
  onSignup: () => void;   // Opens the signup dialog
}
```

## Usage Examples

### Basic Implementation

```typescript
import React, { useRef } from 'react';
import PaktAuth, { AuthRef, ConfigContextType } from '@pakt/auth-module';

function MyApp() {
  const authRef = useRef<AuthRef>(null);

  const config: ConfigContextType = {
    paktSDK: {
      baseUrl: "https://api-devpaktbuild.chain.site",
    },
  };

  return (
    <div>
      <button onClick={() => authRef.current?.onLogin()}>
        Login
      </button>
      <button onClick={() => authRef.current?.onSignup()}>
        Sign Up
      </button>
      
      <PaktAuth
        config={config}
        ref={authRef}
        onLoginSuccess={(userData) => {
          console.log("User logged in:", userData);
        }}
        onSignupSuccess={(userData) => {
          console.log("User signed up:", userData);
        }}
      />
    </div>
  );
}
```

### With Google OAuth

```typescript
import React, { useRef } from 'react';
import PaktAuth, { AuthRef, ConfigContextType } from '@pakt/auth-module';

function MyApp() {
  const authRef = useRef<AuthRef>(null);

  const config: ConfigContextType = {
    theme: {
      primary: "#007C5B",
      secondary: "#19A966",
    },
    googleOAuth: {
      clientId: "your-google-client-id.apps.googleusercontent.com",
    },
    paktSDK: {
      baseUrl: "https://api-devpaktbuild.chain.site",
      verbose: true,
    },
    errorHandler: (errorMessage) => {
      // Handle errors (e.g., show toast notification)
      console.error("Authentication error:", errorMessage);
    },
  };

  return (
    <div>
      <PaktAuth
        config={config}
        ref={authRef}
        onLoginSuccess={(userData) => {
          // Handle successful login
          console.log("Login successful:", userData);
        }}
        onSignupSuccess={(userData) => {
          // Handle successful signup
          console.log("Signup successful:", userData);
        }}
      />
    </div>
  );
}
```

### Custom Error Handling

```typescript
import React, { useRef } from 'react';
import PaktAuth, { AuthRef, ConfigContextType } from '@pakt/auth-module';
import { toast } from 'react-hot-toast'; // Example toast library

function MyApp() {
  const authRef = useRef<AuthRef>(null);

  const config: ConfigContextType = {
    paktSDK: {
      baseUrl: "https://api-devpaktbuild.chain.site",
    },
    errorHandler: (errorMessage: string) => {
      // Custom error handling
      toast.error(errorMessage);
      
      // Or log to your error tracking service
      // Sentry.captureException(new Error(errorMessage));
    },
  };

  return (
    <PaktAuth
      config={config}
      ref={authRef}
      onLoginSuccess={(userData) => {
        toast.success("Login successful!");
        // Handle login success
      }}
      onSignupSuccess={(userData) => {
        toast.success("Account created successfully!");
        // Handle signup success
      }}
    />
  );
}
```

## Authentication Flow

The PaktAuth component provides a complete authentication flow:

1. **Login Method Selection**: Users can choose between email/password or Google OAuth
2. **Email/Password Login**: Traditional login with email and password
3. **Google OAuth**: One-click login with Google account
4. **Two-Factor Authentication**: Email-based 2FA if enabled
5. **Signup Flow**: Complete registration process with email verification
6. **Password Reset**: Forgot password and reset functionality
7. **Email Verification**: Account verification with resend capability

## Technical Architecture

### Styling & CSS

The package uses a modern CSS architecture designed for optimal performance and minimal conflicts:

- **Tailwind CSS v4**: Built with the latest version of Tailwind CSS for best-in-class utility styling
- **CSS Inlining**: All styles are automatically inlined into the JavaScript bundle, eliminating the need for separate CSS imports
- **Scoped Classes**: All Tailwind utilities use the `pka:` prefix (e.g., `pka:flex`, `pka:bg-white`) to prevent conflicts with your application's styles
- **Zero Dependencies**: No external CSS files or preprocessor dependencies required
- **Theme Integration**: CSS custom properties allow for seamless theme customization

### Bundle Information

- **ES Module**: ~399KB (includes all styles and functionality)
- **CommonJS**: ~315KB (for older module systems)
- **TypeScript Definitions**: Included for full type safety
- **Tree Shakeable**: Only import what you need

### Browser Compatibility

The module is built with modern web standards and supports:
- **ES2018+** JavaScript features
- **CSS Custom Properties** for theming
- **Modern CSS Grid & Flexbox** for layouts
- **Responsive Design** with mobile-first approach

## Migration Guide

### Upgrading from v0.0.2 and earlier

If you're upgrading from a previous version, please note these breaking changes:

#### CSS Import Removal

**Before (v0.0.2 and earlier):**
```typescript
import '@pakt/auth-module/dist/styles.css'; // ❌ No longer needed
```

**After (v0.0.3+):**
```typescript
// ✅ No CSS import required - styles are automatically included
import PaktAuth from '@pakt/auth-module';
```

#### Benefits of the Update

- **Simplified Integration**: No need to manage CSS imports
- **Better Performance**: Styles are optimized and inlined
- **No Style Conflicts**: Scoped classes prevent CSS conflicts
- **Smaller Bundle**: More efficient bundling and tree-shaking
- **Modern Tooling**: Built with Tailwind CSS v4 and Vite

The component API remains the same, so no code changes are required beyond removing the CSS import.

## PAKT SDK Integration

The module integrates with the PAKT SDK for backend authentication. The SDK handles:

- User registration and login
- Email verification
- Password reset
- Two-factor authentication
- Google OAuth validation
- User data management

## Browser Support

This module supports all modern browsers that support:

- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+
- **Node.js**: 16+ (for SSR/SSG)

### Requirements

- **React**: 18.0.0+
- **ES2018** support
- **CSS Custom Properties** support
- **CSS Grid** and **Flexbox** support

## Development

### Building from Source

```bash
# Clone the repository
git clone <repository-url>
cd pakt-auth-module

# Install dependencies
yarn install

# Build the package
yarn build

# Run in development mode
yarn dev
```

### Package Structure

```
dist/
├── auth-module.es.js       # ES module build
├── auth-module.cjs.js      # CommonJS build
├── types/                  # TypeScript definitions
└── assets/                 # Static assets (fonts, etc.)
```

## Contributing

Please refer to the `CODE_OF_CONDUCT.md` and `LICENSE` files.

## License

MIT
