/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { useCallback, useState } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { paktSDKService } from "../lib/pakt-sdk";
import { triggerGlobalError } from "../lib/error-handler";
import { useAuthStore } from "../store/auth-store";
import {
    AUTH_TOKEN_KEY,
    setCookie,
    removeCookie,
    getCookie,
} from "../utils/auth-utils";
import { UserData } from "../components/pakt-auth/types";
import Logger from "../lib/logger";
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

interface UsePaktAuthReturn {
    // State
    user: UserData | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    token: string | null;

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

export const usePaktAuth = (): UsePaktAuthReturn => {
    const { user, setUser, clearStore } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get token from cookie
    const token = getCookie(AUTH_TOKEN_KEY);

    // Check if user is authenticated
    const isAuthenticated = Boolean(user && token);

    // Helper function to create error response
    const setAndTriggerError = useCallback((message: string) => {
        setError(message);
        triggerGlobalError(message);
    }, []);

    const createErrorResponse = useCallback(
        <T>(errorMessage: string, defaultMessage: string): AuthResponse<T> => {
            const message = errorMessage || defaultMessage;
            setAndTriggerError(message);
            return {
                status: "error",
                message,
                data: null as unknown as T,
                statusCode: 500,
            };
        },
        [setAndTriggerError]
    );

    // Clear error
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Clear user
    const clearUser = useCallback(() => {
        setUser(null);
        clearStore();
    }, [setUser, clearStore]);

    // Login
    const login = useCallback(
        async (payload: LoginPayload): Promise<AuthResponse<LoginDto>> => {
            setLoading(true);
            setError(null);

            try {
                const response = await paktSDKService.login(payload);

                if (response.status === "success" && response.data) {
                    const userData = response.data as UserData;
                    setUser(userData);
                    // Store token in cookie if available
                    if ("token" in userData && userData.token) {
                        setCookie(AUTH_TOKEN_KEY, userData.token);
                    }
                } else {
                    setAndTriggerError(response.message || "Login failed");
                }

                return response;
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "Login failed";
                return createErrorResponse<LoginDto>(
                    errorMessage,
                    "Login failed"
                );
            } finally {
                setLoading(false);
            }
        },
        [createErrorResponse, setAndTriggerError, setUser]
    );

    // Register
    const register = useCallback(
        async (
            payload: RegisterPayload
        ): Promise<AuthResponse<RegisterDto>> => {
            setLoading(true);
            setError(null);

            try {
                const response = await paktSDKService.register(payload);

                if (response.status === "error") {
                    setAndTriggerError(
                        response.message || "Registration failed"
                    );
                }

                return response;
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "Registration failed";
                return createErrorResponse<RegisterDto>(
                    errorMessage,
                    "Registration failed"
                );
            } finally {
                setLoading(false);
            }
        },
        [createErrorResponse, setAndTriggerError]
    );

    // Verify Account
    const verifyAccount = useCallback(
        async (
            payload: VerifyAccountPayload
        ): Promise<AuthResponse<AccountVerifyDto>> => {
            setLoading(true);
            setError(null);

            try {
                const response = await paktSDKService.verifyAccount(payload);

                if (response.status === "success" && response.data) {
                    const userData = response.data as UserData;
                    setUser(userData);
                    // Store token in cookie if available
                    if ("token" in userData && userData.token) {
                        setCookie(AUTH_TOKEN_KEY, userData.token);
                    }
                } else {
                    setAndTriggerError(
                        response.message || "Account verification failed"
                    );
                }

                return response;
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : "Account verification failed";
                return createErrorResponse<AccountVerifyDto>(
                    errorMessage,
                    "Account verification failed"
                );
            } finally {
                setLoading(false);
            }
        },
        [createErrorResponse, setAndTriggerError, setUser]
    );

    // Resend Verify Link
    const resendVerifyLink = useCallback(
        async (
            payload: ResendVerifyPayload
        ): Promise<AuthResponse<IResendVerifyLink>> => {
            setLoading(true);
            setError(null);

            try {
                const response = await paktSDKService.resendVerifyLink(payload);

                if (response.status === "error") {
                    setAndTriggerError(
                        response.message || "Failed to resend verification link"
                    );
                }

                return response;
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : "Failed to resend verification link";
                return createErrorResponse<IResendVerifyLink>(
                    errorMessage,
                    "Failed to resend verification link"
                );
            } finally {
                setLoading(false);
            }
        },
        [createErrorResponse, setAndTriggerError]
    );

    // Reset Password
    const resetPassword = useCallback(
        async (
            payload: ResetPasswordPayload
        ): Promise<AuthResponse<ResetDto>> => {
            setLoading(true);
            setError(null);

            try {
                const response = await paktSDKService.resetPassword(payload);

                if (response.status === "error") {
                    setAndTriggerError(
                        response.message || "Password reset failed"
                    );
                }

                return response;
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : "Password reset failed";
                return createErrorResponse<ResetDto>(
                    errorMessage,
                    "Password reset failed"
                );
            } finally {
                setLoading(false);
            }
        },
        [createErrorResponse, setAndTriggerError]
    );

    // Change Password
    const changePassword = useCallback(
        async (
            payload: ChangeAuthenticationPasswordPayload
        ): Promise<AuthResponse<ChangePasswordDto>> => {
            setLoading(true);
            setError(null);

            try {
                const response = await paktSDKService.changePassword(payload);

                if (response.status === "error") {
                    setAndTriggerError(
                        response.message || "Password change failed"
                    );
                }

                return response;
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : "Password change failed";
                return createErrorResponse<ChangePasswordDto>(
                    errorMessage,
                    "Password change failed"
                );
            } finally {
                setLoading(false);
            }
        },
        [createErrorResponse, setAndTriggerError]
    );

    // Validate Password Token
    const validatePasswordToken = useCallback(
        async (props: {
            token: string;
            tempToken: string;
        }): Promise<AuthResponse<ValidatePasswordToken>> => {
            setLoading(true);
            setError(null);

            try {
                const response =
                    await paktSDKService.validatePasswordToken(props);

                if (response.status === "error") {
                    setAndTriggerError(
                        response.message || "Password token validation failed"
                    );
                }

                return response;
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : "Password token validation failed";
                return createErrorResponse<ValidatePasswordToken>(
                    errorMessage,
                    "Password token validation failed"
                );
            } finally {
                setLoading(false);
            }
        },
        [createErrorResponse, setAndTriggerError]
    );

    // Google OAuth Generate State
    const googleOAuthGenerateState = useCallback(async (): Promise<
        AuthResponse<GoogleOAuthGenerateDto>
    > => {
        setLoading(true);
        setError(null);

        try {
            const response = await paktSDKService.googleOAuthGenerateState();

            if (response.status === "error") {
                setAndTriggerError(
                    response.message || "Google OAuth state generation failed"
                );
            }

            return response;
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Google OAuth state generation failed";
            return createErrorResponse<GoogleOAuthGenerateDto>(
                errorMessage,
                "Google OAuth state generation failed"
            );
        } finally {
            setLoading(false);
        }
    }, [createErrorResponse, setAndTriggerError]);

    // Google OAuth Validate State
    const googleOAuthValidateState = useCallback(
        async (
            props: GoogleOAuthValdatePayload
        ): Promise<AuthResponse<GoogleOAuthValidateDto>> => {
            setLoading(true);
            setError(null);

            try {
                const response =
                    await paktSDKService.googleOAuthValidateState(props);

                if (response.status === "success" && response.data) {
                    const userData = response.data as UserData;
                    setUser(userData);
                    // Store token in cookie if available
                    if ("token" in userData && userData.token) {
                        setCookie(AUTH_TOKEN_KEY, userData.token);
                    }
                } else {
                    setAndTriggerError(
                        response.message || "Google OAuth validation failed"
                    );
                }

                return response;
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : "Google OAuth validation failed";
                return createErrorResponse<GoogleOAuthValidateDto>(
                    errorMessage,
                    "Google OAuth validation failed"
                );
            } finally {
                setLoading(false);
            }
        },
        [createErrorResponse, setUser, setAndTriggerError]
    );

    // Get User
    const getUser = useCallback(
        async (authToken: string): Promise<AuthResponse<any>> => {
            setLoading(true);
            setError(null);

            try {
                const response = await paktSDKService.getUser(authToken);

                if (response.status === "success" && response.data) {
                    const userData = response.data as UserData;
                    setUser(userData);
                } else {
                    setAndTriggerError(
                        response.message || "Failed to get user"
                    );
                }

                return response;
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "Failed to get user";
                return createErrorResponse<any>(
                    errorMessage,
                    "Failed to get user"
                );
            } finally {
                setLoading(false);
            }
        },
        [createErrorResponse, setAndTriggerError, setUser]
    );

    // Get Account (full profile from /account endpoint)
    const getAccount = useCallback(
        async (authToken: string): Promise<AuthResponse<any>> => {
            setLoading(true);
            setError(null);

            try {
                const response = await paktSDKService.getAccount(authToken);

                if (response.status === "success" && response.data) {
                    const userData = response.data as UserData;
                    setUser(userData);
                } else {
                    setAndTriggerError(
                        response.message || "Failed to get account"
                    );
                }

                return response;
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : "Failed to get account";
                return createErrorResponse<any>(
                    errorMessage,
                    "Failed to get account"
                );
            } finally {
                setLoading(false);
            }
        },
        [createErrorResponse, setAndTriggerError, setUser]
    );

    // Fetch Account
    const fetchAccount = useCallback(async (): Promise<void> => {
        const authToken = getCookie(AUTH_TOKEN_KEY);
        if (!authToken) {
            Logger.error("No auth token found. Cannot fetch account.");
            return;
        }

        // Wait for SDK initialization with retry mechanism
        const maxRetries = 10;
        const retryDelay = 200; // 200ms between retries

        for (let retries = 0; retries < maxRetries; retries++) {
            if (paktSDKService.getInitialized()) {
                break;
            }
            // eslint-disable-next-line no-await-in-loop
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, retryDelay);
            });
        }

        if (!paktSDKService.getInitialized()) {
            Logger.error(
                "PAKT SDK not initialized after retries. Cannot fetch account."
            );
            return;
        }

        setLoading(true);
        try {
            const response = await paktSDKService.getAccount(authToken);
            if (response.status === "success" && response.data) {
                const userData = response.data as UserData;
                setUser(userData);
            } else {
                setAndTriggerError(
                    response.message || "Failed to fetch account"
                );
            }
        } catch (err) {
            Logger.error("Failed to fetch account:", {
                error: err instanceof Error ? err.message : String(err),
            });
        } finally {
            setLoading(false);
        }
    }, [setUser, setAndTriggerError]);

    // Logout
    const logout = useCallback(async (): Promise<void> => {
        const currentToken = getCookie(AUTH_TOKEN_KEY);
        setLoading(true);
        setError(null);

        try {
            if (currentToken) {
                await paktSDKService.logout(currentToken);
            }
        } catch (err) {
            Logger.error("Logout error:", {
                error: err instanceof Error ? err.message : String(err),
            });
        } finally {
            // Always clear local state and cookies, even if API call fails
            clearUser();
            removeCookie(AUTH_TOKEN_KEY);
            setLoading(false);
        }
    }, [clearUser]);

    // Send Email 2FA
    const resendTwoFAEmailCode = useCallback(
        async (email: string): Promise<AuthResponse<object>> => {
            setLoading(true);
            setError(null);

            try {
                const response =
                    await paktSDKService.resendTwoFAEmailCode(email);

                if (response.status === "error") {
                    setAndTriggerError(
                        response.message || "Failed to resend 2FA email"
                    );
                }

                return response;
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : "Failed to resend 2FA email";
                return createErrorResponse<object>(
                    errorMessage,
                    "Failed to resend 2FA email"
                );
            } finally {
                setLoading(false);
            }
        },
        [createErrorResponse, setAndTriggerError]
    );

    // Validate Referral
    const validateReferral = useCallback(
        async (
            referralToken: string
        ): Promise<AuthResponse<ValidateReferralDto>> => {
            setLoading(true);
            setError(null);

            try {
                const response =
                    await paktSDKService.validateReferral(referralToken);

                if (response.status === "error") {
                    setAndTriggerError(
                        response.message || "Referral validation failed"
                    );
                }

                return response;
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : "Referral validation failed";
                return createErrorResponse<ValidateReferralDto>(
                    errorMessage,
                    "Referral validation failed"
                );
            } finally {
                setLoading(false);
            }
        },
        [createErrorResponse, setAndTriggerError]
    );

    // Login Two-Factor Authentication
    const loginTwoFa = useCallback(
        async (payload: LoginTwoFAPayload): Promise<AuthResponse<LoginDto>> => {
            setLoading(true);
            setError(null);

            try {
                const response = await paktSDKService.loginTwoFa(payload);

                if (response.status === "success" && response.data) {
                    const userData = response.data as UserData;
                    setUser(userData);
                    // Store token in cookie if available
                    if ("token" in userData && userData.token) {
                        setCookie(AUTH_TOKEN_KEY, userData.token);
                    }
                } else {
                    setAndTriggerError(
                        response.message || "Two-factor authentication failed"
                    );
                }

                return response;
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : "Two-factor authentication failed";
                return createErrorResponse<LoginDto>(
                    errorMessage,
                    "Two-factor authentication failed"
                );
            } finally {
                setLoading(false);
            }
        },
        [createErrorResponse, setAndTriggerError, setUser]
    );

    return {
        // State
        user,
        loading,
        error,
        isAuthenticated,
        token,

        // Authentication Methods
        login,
        loginTwoFa,
        register,
        verifyAccount,
        resendVerifyLink,
        resetPassword,
        changePassword,
        validatePasswordToken,
        validateReferral,
        googleOAuthGenerateState,
        googleOAuthValidateState,
        getUser,
        getAccount,
        fetchAccount,
        logout,
        resendTwoFAEmailCode,

        // Utility Methods
        clearError,
        clearUser,
    };
};
