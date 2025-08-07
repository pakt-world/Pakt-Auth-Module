# @pakt/auth-module

A comprehensive React authentication module for Pakt applications. This package provides a complete authentication solution with support for email/password authentication, Google OAuth, and two-factor authentication.

## Features

- **Email/Password Authentication**: Complete signup, login, and password reset flows
- **Google OAuth Integration**: Seamless Google authentication
- **Two-Factor Authentication**: Email-based 2FA support
- **Password Reset**: Forgot password and reset functionality
- **Email Verification**: Account verification with resend capability
- **Customizable UI**: Theme customization support
- **Customizable Text**: Configurable titles and descriptions for all auth dialogs
- **TypeScript Support**: Full type definitions included
- **Responsive Design**: Works on desktop and mobile devices

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

// Import the stylesheet in your main entry file
import '@pakt/auth-module/dist/styles.css';

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

  const textConfig = {
    loginTitle: "Welcome Back",
    loginDescription: "Sign in to continue your journey",
    signupTitle: "Join Our Community",
    signupDescription: "Start building amazing things together"
  };

  return (
    <div>
      <button onClick={openLogin}>Login</button>
      <button onClick={openSignup}>Sign Up</button>
      
      <PaktAuth
        config={config}
        textConfig={textConfig}
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

Customize the appearance of the authentication components with semantic color tokens:

```typescript
interface ITheme {
  // Brand Colors
  brandPrimary?: string;           // Main brand color for buttons, links, icons
  brandSecondary?: string;         // Secondary brand color for backgrounds
  brandAccent?: string;            // Accent color for highlights
  
  // Text Colors
  headingText?: string;            // Color for headings and titles
  bodyText?: string;               // Color for body text and descriptions
  linkText?: string;               // Color for links and interactive text
  inverseText?: string;            // White text for dark backgrounds
  
  // Background Colors
  formBackground?: string;         // Background color for forms and cards
  modalOverlay?: string;           // Overlay color for modals and dialogs
  pageBackground?: string;         // Main page background color
  cardBackground?: string;         // Background for cards and containers
  
  // Interactive Elements
  buttonPrimaryBackground?: string;    // Primary button background (supports gradients)
  buttonPrimaryText?: string;          // Primary button text color
  buttonPrimaryHover?: string;         // Primary button hover state
  buttonOutlineBackground?: string;    // Outline button background
  buttonOutlineText?: string;          // Outline button text color
  buttonOutlineBorder?: string;        // Outline button border color
  buttonOutlineHoverBackground?: string; // Outline button hover background
  buttonOutlineHoverText?: string;     // Outline button hover text
  
  // Form Input Colors
  inputBackground?: string;        // Input field background
  inputBorder?: string;            // Input field border
  inputFocusBorder?: string;       // Input field focus border
  inputPlaceholder?: string;       // Input placeholder text
  inputText?: string;              // Input text color
  inputLabel?: string;             // Input label text color
  
  // State Colors
  errorBackground?: string;        // Error state background
  errorText?: string;              // Error state text
  errorBorder?: string;            // Error state border
  successBackground?: string;      // Success state background
  successText?: string;            // Success state text
  warningBackground?: string;      // Warning state background
  warningText?: string;            // Warning state text
}
```

**Example with gradients:**
```typescript
const config: ConfigContextType = {
  theme: {
    brandPrimary: "#007C5B",
    buttonPrimaryBackground: "linear-gradient(102.28deg, #008D6C 32.23%, #11FFC7 139.92%)",
    formBackground: "#FFFFFF",
    errorText: "#DC2626",
  },
  // ... other config
};
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
  textConfig?: AuthTextConfig;                  // Optional: Custom text configuration
  onLoginSuccess?: (userData: any) => void;     // Optional: Login success callback
  onSignupSuccess?: (userData: any) => void;    // Optional: Signup success callback
}
```

### Text Configuration

Customize the text displayed in authentication dialogs:

```typescript
interface AuthTextConfig {
  loginTitle: string;        // Title for login dialogs
  loginDescription: string;  // Description for login dialogs
  signupTitle: string;       // Title for signup dialogs
  signupDescription: string; // Description for signup dialogs
}
```

**Example:**
```typescript
const textConfig = {
  loginTitle: "Welcome Back",
  loginDescription: "Sign in to continue your journey",
  signupTitle: "Join Our Community",
  signupDescription: "Start building amazing things together"
};
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

  const textConfig = {
    loginTitle: "Welcome Back",
    loginDescription: "Sign in to continue your journey",
    signupTitle: "Join Our Community",
    signupDescription: "Start building amazing things together"
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
        textConfig={textConfig}
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



## PAKT SDK Integration

The module integrates with the PAKT SDK for backend authentication. The SDK handles:

- User registration and login
- Email verification
- Password reset
- Two-factor authentication
- Google OAuth validation
- User data management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Please refer to the `CODE_OF_CONDUCT.md` and `LICENSE` files.

## License

MIT
