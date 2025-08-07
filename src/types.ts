/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { QueryClient } from "@tanstack/react-query";
import { PaktSDKConfig } from "./lib/pakt-sdk";

interface GoogleOAuthConfig {
    clientId: string;
    clientSecret?: string;
    redirectUri?: string;
    scope?: string[];
    hostedDomain?: string;
}

interface ConfigContextType {
    theme?: ITheme; // colors to theme the package
    errorHandler?: (errorMessage: string) => void; //  Callback to handle Error
    googleOAuth?: GoogleOAuthConfig; // Google OAuth configuration
    paktSDK: PaktSDKConfig; // PAKT SDK configuration
}

export type { ConfigContextType, GoogleOAuthConfig };

type IAny = any;
type I0xAddressType = `0x${string}`;

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
  
  // Border Colors
  borderColor?: string;            // Default border color
  dividerColor?: string;           // Color for dividers and separators
  
  // Interactive Elements
  buttonPrimaryBackground?: string;    // Primary button background
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
  
  // Gradients
  primaryGradient?: string;        // Primary gradient for buttons
  secondaryGradient?: string;      // Secondary gradient
  
  // Spacing and Layout
  modalBorderRadius?: string;      // Border radius for modals
  
  // Legacy Support (deprecated but kept for backward compatibility)
  primary?: string;                // Legacy: use brandPrimary
  secondary?: string;              // Legacy: use brandSecondary
  info?: string;                   // Legacy: use brandAccent
  line?: string;                   // Legacy: use dividerColor
  title?: string;                  // Legacy: use headingText
  body?: string;                   // Legacy: use bodyText
  warning?: string;                // Legacy: use warningText
  success?: string;                // Legacy: use successText
  danger?: string;                 // Legacy: use errorText
  magnolia?: string;               // Legacy: use cardBackground
  "exhibit-tab-list"?: string;     // Legacy: use cardBackground
  "primary-brighter"?: string;     // Legacy: use brandSecondary
  "refer-border"?: string;         // Legacy: use borderColor
  "btn-primary"?: string;          // Legacy: use primaryGradient
  "primary-gradient"?: string;     // Legacy: use primaryGradient
  "modal-radius"?: string;         // Legacy: use modalBorderRadius
  "blue-lightest"?: string;        // Legacy: use brandAccent
  "blue-darkest"?: string;         // Legacy: use brandPrimary
  
  // Nested structure for complex token groups (kept for backward compatibility)
  text?: {
    primary?: string;
    secondary?: string;
    inverse?: string;
  };
  
  input?: {
    background?: string;
    border?: string;
    focus?: string;
    placeholder?: string;
    text?: string;
    label?: string;
  };
  
  states?: {
    error?: {
      background?: string;
      text?: string;
      border?: string;
    };
    success?: {
      background?: string;
      text?: string;
    };
    warning?: {
      background?: string;
      text?: string;
    };
  };
  
  button?: {
    primary?: {
      background?: string;
      text?: string;
      hover?: string;
    };
    outline?: {
      background?: string;
      text?: string;
      border?: string;
      hover?: {
        background?: string;
        text?: string;
      };
    };
  };
}

export {
  IAny,
  I0xAddressType,
  type ITheme,
}
