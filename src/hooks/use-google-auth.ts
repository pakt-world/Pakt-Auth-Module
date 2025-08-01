/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import Logger from "../lib/logger";
import { handleAuthResponse } from "../utils/auth-utils";

interface GoogleAuthOptions {
  isSignIn?: boolean;
  isSignUp?: boolean;
  isGoogleSignIn?: boolean;
  isGoogleSignup?: boolean;
  // Framework-agnostic callbacks
  onNavigate: (path: string) => void;
  onSetCookie: (key: string, value: string) => void;
  setLoginResponse?: (payload: any) => void;
  setSignUpResponse?: (payload: any) => void;
  // API functions (to be provided by the consuming application)
  generateGoogleAuth: (options: { enable: boolean }) => { data: any; isSuccess: boolean };
  verifyGoogleAuth: {
    mutate: (data: { code: string; state: string }, options: any) => void;
  };
}

export const useGoogleAuth = ({
  isSignIn = false,
  isSignUp = false,
  isGoogleSignIn = false,
  isGoogleSignup = false,
  onNavigate,
  onSetCookie,
  setLoginResponse,
  setSignUpResponse,
  generateGoogleAuth,
  verifyGoogleAuth,
}: GoogleAuthOptions) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  const [initiate, setInitiate] = useState(true);
  const { data, isSuccess } = generateGoogleAuth({
    enable: initiate,
  });
  Logger.info("Google auth data", data);

  const signIn = useGoogleLogin({
    onSuccess: (codeResponse) => {
      if (!isSuccess) {
        Logger.error("Google auth data is not available");
        return;
      }
      Logger.info("Google login success", codeResponse);
      setInitiate(false);
      verifyGoogleAuth.mutate(
        {
          code: codeResponse.code,
          state: data.state,
        },
        {
          onSuccess: (data) => {
            handleAuthResponse({
              data,
              isMobile,
              onNavigate,
              onSetCookie,
              isSignIn,
              isSignUp,
              isGoogleSignIn,
              isGoogleSignup,
              setLoginResponse,
              setSignUpResponse,
            });
          },
          onError: (error) => {
            Logger.error("Google login error", error);
          },
        }
      );
    },
    onError: (error) => {
      Logger.error("Google login error", error);
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    ux_mode: "popup",
  });

  return { signIn };
}; 