/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { QueryClient } from "@tanstack/react-query";

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
}

export type { ConfigContextType, GoogleOAuthConfig };

type IAny = any;
type I0xAddressType = `0x${string}`;

interface ITheme extends Record<string, any> {
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
}

export {
  IAny,
  I0xAddressType,
  type ITheme,
}
