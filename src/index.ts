//  Author: BeardKoda for Pakt (https://github.com/BeardKoda)

// Common types and utilities
export * from "./types";
export * from "./utils";

// Authentication components
export * from "./components/auth";
export { default as PaktAuth } from "./components/pakt-auth";
export type { AuthRef } from "./components/pakt-auth/types";

// Authentication utilities and hooks
export * from "./utils/auth-utils";
export * from "./utils/validation";
export * from "./hooks/use-google-auth";
export { usePaktAuth } from "./hooks/use-pakt-auth";

// PAKT SDK
export { paktSDKService } from "./lib/pakt-sdk";
export type { PaktSDKConfig, AuthResponse } from "./lib/pakt-sdk";

// Authentication types
export * from "./types/auth";

// Constants
export * from "./lib/constants";