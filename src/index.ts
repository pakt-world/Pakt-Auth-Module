//  Author: BeardKoda for Pakt (https://github.com/BeardKoda)

// Common types and utilities
export * from "./types";
export * from "./utils";

// Authentication components
export * from "./components/auth";
export { default as PaktAuth } from "./components/pakt-auth";
export type { PaktAuthRef } from "./components/pakt-auth";

// Authentication utilities and hooks
export * from "./utils/auth-utils";
export * from "./utils/validation";
export * from "./hooks/use-google-auth";

// Authentication types
export * from "./types/auth";

// Constants
export * from "./lib/constants";