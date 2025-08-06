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
  primary?: string;
  secondary?: string;
  info?: string;
  line?: string;
  title?: string;
  body?: string;
  warning?: string;
  success?: string;
  danger?: string;
  magnolia?: string;
  "exhibit-tab-list"?: string;
  "primary-brighter"?: string;
  "refer-border"?: string;
  "btn-primary"?: string;
  "primary-gradient"?: string;
  "modal-radius"?: string;
  "blue-lightest"?: string;
  "blue-darkest"?: string;
  
  surface?: {
    primary?: string;
    overlay?: string;
  };
  
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
