//  Author: Paul-Taiwo for Pakt (https://github.com/Paul-Taiwo)

// Main PaktAuth component (deprecated - use PaktAuthProvider instead)
export { default as PaktAuth } from "./components/pakt-auth";

// PaktAuthProvider
export { PaktAuthProvider } from "./components/pakt-auth/provider";

// Auth hook - Context-based hook (recommended)
export { usePaktAuth } from "./context/auth-context";

// Internal hook for direct usage (advanced use cases)
export { usePaktAuthInternal } from "./hooks/use-pakt-auth";

// PaktAuth types
export type {
    UserData,
    AuthRef,
    PaktAuthProps,
    DesktopAuthProps,
} from "./components/pakt-auth/types";

// Auth context types
export type { AuthContextType } from "./context/auth-context";

// Configuration types
export type { ConfigContextType, GoogleOAuthConfig, ITheme } from "./types";
