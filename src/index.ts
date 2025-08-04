//  Author: Paul-Taiwo for Pakt (https://github.com/Paul-Taiwo)

// Main PaktAuth component
export { default as PaktAuth } from "./components/pakt-auth";

// PaktAuth types
export type { AuthRef, PaktAuthProps, DesktopAuthProps } from "./components/pakt-auth/types";

// Configuration types
export type { ConfigContextType, GoogleOAuthConfig, ITheme } from "./types";

// PAKT SDK types
export type { PaktSDKConfig, AuthResponse, LoginTwoFAPayload } from "./lib/pakt-sdk";

// Form validation types
export type { 
    SignupFormValues, 
    ForgotPasswordFormValues, 
    ResetPasswordFormValues 
} from "./utils/validation";