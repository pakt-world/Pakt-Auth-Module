/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { createContext, useContext, ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { UserData } from "../components/pakt-auth/types";
import type {
    AuthResponse,
    LoginPayload,
    RegisterPayload,
    VerifyAccountPayload,
    ResetPasswordPayload,
    ChangeAuthenticationPasswordPayload,
    ResendVerifyPayload,
    LoginDto,
    RegisterDto,
    AccountVerifyDto,
    ResetDto,
    IResendVerifyLink,
    ChangePasswordDto,
    ValidatePasswordToken,
    ValidateReferralDto,
    GoogleOAuthGenerateDto,
    GoogleOAuthValdatePayload,
    GoogleOAuthValidateDto,
    LoginTwoFAPayload,
} from "../lib/pakt-sdk";

export interface AuthContextType {
    // State
    user: UserData | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    token: string | null;

    // Modal Controls
    openLogin: () => void;
    openSignup: () => void;
    closeAuth: () => void;

    // Authentication Methods
    login: (payload: LoginPayload) => Promise<AuthResponse<LoginDto>>;
    loginTwoFa: (payload: LoginTwoFAPayload) => Promise<AuthResponse<LoginDto>>;
    register: (payload: RegisterPayload) => Promise<AuthResponse<RegisterDto>>;
    verifyAccount: (
        payload: VerifyAccountPayload
    ) => Promise<AuthResponse<AccountVerifyDto>>;
    resendVerifyLink: (
        payload: ResendVerifyPayload
    ) => Promise<AuthResponse<IResendVerifyLink>>;
    resetPassword: (
        payload: ResetPasswordPayload
    ) => Promise<AuthResponse<ResetDto>>;
    changePassword: (
        payload: ChangeAuthenticationPasswordPayload
    ) => Promise<AuthResponse<ChangePasswordDto>>;
    validatePasswordToken: (props: {
        token: string;
        tempToken: string;
    }) => Promise<AuthResponse<ValidatePasswordToken>>;
    validateReferral: (
        referralToken: string
    ) => Promise<AuthResponse<ValidateReferralDto>>;
    googleOAuthGenerateState: () => Promise<
        AuthResponse<GoogleOAuthGenerateDto>
    >;
    googleOAuthValidateState: (
        props: GoogleOAuthValdatePayload
    ) => Promise<AuthResponse<GoogleOAuthValidateDto>>;
    getUser: (authToken: string) => Promise<AuthResponse<any>>;
    getAccount: (authToken: string) => Promise<AuthResponse<any>>;
    fetchAccount: () => Promise<void>;
    logout: () => Promise<void>;
    resendTwoFAEmailCode: (email: string) => Promise<AuthResponse<object>>;

    // Utility Methods
    clearError: () => void;
    clearUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "useAuthContext must be used within a PaktAuthProvider"
        );
    }
    return context;
};

/**
 * Hook to access auth functionality from context.
 * This is the recommended way to use auth in components.
 * Must be used within a PaktAuthProvider.
 */
export const usePaktAuth = (): AuthContextType => {
    return useAuthContext();
};

export { AuthContext };
