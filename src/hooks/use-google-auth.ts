/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { useGoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import Logger from "../lib/logger";
import { usePaktAuth } from "./use-pakt-auth";
import type { GoogleOAuthValdatePayload } from "../lib/pakt-sdk";
import { useConfig } from "../context/config-context";
import { UserData } from "../components/pakt-auth/types";

interface GoogleAuthOptions {
  onSuccess?: (userData: UserData) => void;
  onError?: (error: string) => void;
}

export const useGoogleAuth = ({
  onSuccess,
  onError,
}: GoogleAuthOptions) => {
  const { googleOAuth } = useConfig();
  const { googleOAuthGenerateState, googleOAuthValidateState, loading } = usePaktAuth();

  // Check if Google OAuth is configured
  const isGoogleOAuthEnabled = !!googleOAuth?.clientId;

  const handleGoogleAuthSuccess = useCallback(async (codeResponse: { code: string }) => {
    try {

      // Step 1: Generate Google OAuth state
      const generateResponse = await googleOAuthGenerateState();

      if (generateResponse.status === 'error') {
        throw new Error(generateResponse.message || 'Failed to generate Google OAuth state');
      }

      // Step 2: Validate Google OAuth state with the code
      const validatePayload: GoogleOAuthValdatePayload = {
        state: generateResponse.data.state,
        code: codeResponse.code,
      };

      const validateResponse = await googleOAuthValidateState(validatePayload);

      if (validateResponse.status === 'success' && validateResponse.data) {
        Logger.info("Google OAuth success", validateResponse.data);

        // Call the success callback with user data
        onSuccess?.(validateResponse.data);
      } else {
        throw new Error(validateResponse.message || 'Google OAuth validation failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Google OAuth failed';
      Logger.error("Google OAuth error", { error: errorMessage });
      onError?.(errorMessage);
    }
  }, [googleOAuthGenerateState, googleOAuthValidateState, onSuccess, onError]);

  const signIn = isGoogleOAuthEnabled ? useGoogleLogin({
    redirect_uri: googleOAuth?.redirectUri,
    onSuccess: handleGoogleAuthSuccess,
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : 'Google login failed';
      Logger.error("Google login error", { error: errorMessage });
      onError?.(errorMessage);
    },
    flow: "auth-code",
    ux_mode: "popup",
  }) : () => {
    console.warn("Google OAuth is not configured. Please provide a client ID.");
    onError?.("Google OAuth is not configured");
  };

  return { signIn, loading, isGoogleOAuthEnabled };
}; 