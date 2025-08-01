/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

// Constants for storage keys
export const REDIRECT_STORAGE_KEY = "pakt_redirect_path";
export const AUTH_TOKEN_KEY = "pakt_auth_token";
export const TIMEZONE_KEY = "pakt_timezone";
export const VERIFY_LOGIN_KEY = "pakt_verify_login";
export const VERIFY_SIGNUP_KEY = "pakt_verify_signup";

// Special characters regex for password validation
export const spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

// Auth enums
export enum AuthEnums {
  VERIFY_SIGNUP = "verify-signup",
  VERIFY_2FA = "verify-2fa",
  FORGOT_PASSWORD = "forgot-password",
  LOGIN = "login",
  SIGNUP = "signup",
}

export enum TwoFactorAuthEnums {
  EMAIL = "email",
  SMS = "sms",
  AUTHENTICATOR = "authenticator",
}

export enum VerifyTypesEnums {
  EMAIL = "email",
  TwoFa = "2fa",
}

interface LoginResponse {
  email: string;
  token: string;
  type: TwoFactorAuthEnums;
  verifyType: VerifyTypesEnums;
}

interface SignUpResponse {
  email: string;
  token: string;
  verifyType: VerifyTypesEnums;
}

interface AuthResponseData {
  email: string;
  tempToken?: {
    token: string;
  };
  isVerified?: boolean;
  twoFa?: {
    status: boolean;
    type: TwoFactorAuthEnums;
  };
  timeZone?: string;
  token?: string;
}

interface AuthResponseOptions {
  data: AuthResponseData;
  isMobile: boolean;
  // Navigation callbacks (framework-agnostic)
  onNavigate: (path: string) => void;
  onSetCookie: (key: string, value: string) => void;
  // SignIn
  isSignIn?: boolean;
  setLoginResponse?: (payload: LoginResponse) => void;
  isGoogleSignIn?: boolean;
  // SignUp
  isSignUp?: boolean;
  setSignUpResponse?: (payload: SignUpResponse) => void;
  isGoogleSignup?: boolean;
}

export const handleAuthResponse = ({
  data,
  isMobile,
  onNavigate,
  onSetCookie,
  // SignIn
  isSignIn = false,
  setLoginResponse,
  isGoogleSignIn = false,
  // SignUp
  isSignUp = false,
  setSignUpResponse,
  isGoogleSignup = false,
}: AuthResponseOptions) => {
  const { email, tempToken, isVerified, twoFa, timeZone, token } = data;

  // Get the last viewed job ID from localStorage
  const redirectPath = localStorage.getItem(REDIRECT_STORAGE_KEY);

  if (isSignIn) {
    if (!isVerified) {
      if (isMobile) {
        const mpayload: SignUpResponse = {
          email,
          token: tempToken?.token ?? "",
          verifyType: VerifyTypesEnums.EMAIL,
        };
        const userString = JSON.stringify(mpayload);
        onSetCookie(VERIFY_SIGNUP_KEY, userString);
        return onNavigate(`/${AuthEnums.VERIFY_SIGNUP}`);
      }

      setSignUpResponse?.({
        email: email,
        token: tempToken?.token ?? "",
        verifyType: VerifyTypesEnums.EMAIL,
      });
      return onNavigate(`/?auth=${AuthEnums.VERIFY_SIGNUP}`);
    }

    if (twoFa?.status && !isGoogleSignIn) {
      const mpayload: LoginResponse = {
        email,
        token: tempToken?.token ?? "",
        type: twoFa.type,
        verifyType: VerifyTypesEnums.TwoFa,
      };
      setLoginResponse?.(mpayload);

      if (isMobile) {
        const userString = JSON.stringify(mpayload);
        onSetCookie(VERIFY_LOGIN_KEY, userString);
        return onNavigate(`/${AuthEnums.VERIFY_2FA}`);
      }
      return onNavigate(`/?auth=${AuthEnums.VERIFY_2FA}`);
    }

    if (redirectPath) {
      onNavigate(redirectPath);
      localStorage.removeItem(REDIRECT_STORAGE_KEY);
    } else {
      onNavigate("/dashboard");
    }
    // Set Timezone to localStorage
    if (timeZone) {
      localStorage.setItem(TIMEZONE_KEY, timeZone);
    }
    if (token) {
      onSetCookie(AUTH_TOKEN_KEY, token);
    }
  }

  if (isSignUp) {
    if (!isGoogleSignup) {
      if (isMobile) {
        const mpayload: SignUpResponse = {
          email,
          token: tempToken?.token ?? "",
          verifyType: VerifyTypesEnums.EMAIL,
        };
        const userString = JSON.stringify(mpayload);
        onSetCookie(VERIFY_SIGNUP_KEY, userString);
        onNavigate(`/${AuthEnums.VERIFY_SIGNUP}`);
      } else {
        setSignUpResponse?.({
          email,
          token: tempToken?.token ?? "",
          verifyType: VerifyTypesEnums.EMAIL,
        });
        onNavigate(`/?auth=${AuthEnums.VERIFY_SIGNUP}`);
      }
    }

    onNavigate(`/dashboard`);
    // Set Timezone to localStorage
    if (timeZone) {
      localStorage.setItem(TIMEZONE_KEY, timeZone);
    }
    if (token) {
      onSetCookie(AUTH_TOKEN_KEY, token);
    }
  }
};

// Utility functions for cookie and storage management
export const setCookie = (key: string, value: string, options?: any) => {
  // Framework-agnostic cookie setting
  // This can be overridden by the consuming application
  if (typeof document !== 'undefined') {
    document.cookie = `${key}=${value}; path=/`;
  }
};

export const getCookie = (key: string): string | null => {
  if (typeof document !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

export const removeCookie = (key: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}; 