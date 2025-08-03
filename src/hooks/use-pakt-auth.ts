/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { useCallback, useState, useEffect } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { paktSDKService } from "../lib/pakt-sdk";
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
    LoginTwoFAPayload
} from "../lib/pakt-sdk";

interface User {
    id?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    isVerified?: boolean;
    [key: string]: any;
}

interface UsePaktAuthReturn {
    // State
    user: User | null;
    loading: boolean;
    error: string | null;
    
    // Authentication Methods
    login: (payload: LoginPayload) => Promise<AuthResponse<LoginDto>>;
    loginTwoFa: (payload: LoginTwoFAPayload) => Promise<AuthResponse<LoginDto>>;
    register: (payload: RegisterPayload) => Promise<AuthResponse<RegisterDto>>;
    verifyAccount: (payload: VerifyAccountPayload) => Promise<AuthResponse<AccountVerifyDto>>;
    resendVerifyLink: (payload: ResendVerifyPayload) => Promise<AuthResponse<IResendVerifyLink>>;
    resetPassword: (payload: ResetPasswordPayload) => Promise<AuthResponse<ResetDto>>;
    changePassword: (payload: ChangeAuthenticationPasswordPayload) => Promise<AuthResponse<ChangePasswordDto>>;
    validatePasswordToken: (props: { token: string; tempToken: string }) => Promise<AuthResponse<ValidatePasswordToken>>;
    validateReferral: (token: string) => Promise<AuthResponse<ValidateReferralDto>>;
    googleOAuthGenerateState: () => Promise<AuthResponse<GoogleOAuthGenerateDto>>;
    googleOAuthValidateState: (props: GoogleOAuthValdatePayload) => Promise<AuthResponse<GoogleOAuthValidateDto>>;
    getUser: (authToken: string) => Promise<AuthResponse<any>>;
    logout: (authToken: string) => Promise<AuthResponse<void>>;
    sendEmailTwoFA: (authToken: string) => Promise<AuthResponse<{}>>;
    
    // Utility Methods
    clearError: () => void;
    clearUser: () => void;
}

export const usePaktAuth = (): UsePaktAuthReturn => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Helper function to create error response
    const createErrorResponse = useCallback(<T>(errorMessage: string, defaultMessage: string): AuthResponse<T> => {
        const message = errorMessage || defaultMessage;
        setError(message);
        return {
            status: 'error',
            message,
            data: null as unknown as T,
            statusCode: 500
        };
    }, []);

    // Clear error
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Clear user
    const clearUser = useCallback(() => {
        setUser(null);
    }, []);

    // Login
    const login = useCallback(async (payload: LoginPayload): Promise<AuthResponse<LoginDto>> => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await paktSDKService.login(payload);
            
            if (response.status === 'success' && response.data) {
                setUser(response.data);
            } else {
                setError(response.message || 'Login failed');
            }
            
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            return createErrorResponse<LoginDto>(errorMessage, 'Login failed');
        } finally {
            setLoading(false);
        }
    }, [createErrorResponse]);

    // Register
    const register = useCallback(async (payload: RegisterPayload): Promise<AuthResponse<RegisterDto>> => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await paktSDKService.register(payload);
            
            if (response.status === 'error') {
                setError(response.message || 'Registration failed');
            }
            
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Registration failed';
            return createErrorResponse<RegisterDto>(errorMessage, 'Registration failed');
        } finally {
            setLoading(false);
        }
    }, [createErrorResponse]);

    // Verify Account
    const verifyAccount = useCallback(async (payload: VerifyAccountPayload): Promise<AuthResponse<AccountVerifyDto>> => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await paktSDKService.verifyAccount(payload);
            
            if (response.status === 'success' && response.data) {
                setUser(response.data);
            } else {
                setError(response.message || 'Account verification failed');
            }
            
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Account verification failed';
            return createErrorResponse<AccountVerifyDto>(errorMessage, 'Account verification failed');
        } finally {
            setLoading(false);
        }
    }, [createErrorResponse]);

    // Resend Verify Link
    const resendVerifyLink = useCallback(async (payload: ResendVerifyPayload): Promise<AuthResponse<IResendVerifyLink>> => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await paktSDKService.resendVerifyLink(payload);
            
            if (response.status === 'error') {
                setError(response.message || 'Failed to resend verification link');
            }
            
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to resend verification link';
            return createErrorResponse<IResendVerifyLink>(errorMessage, 'Failed to resend verification link');
        } finally {
            setLoading(false);
        }
    }, [createErrorResponse]);

    // Reset Password
    const resetPassword = useCallback(async (payload: ResetPasswordPayload): Promise<AuthResponse<ResetDto>> => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await paktSDKService.resetPassword(payload);
            
            if (response.status === 'error') {
                setError(response.message || 'Password reset failed');
            }
            
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Password reset failed';
            return createErrorResponse<ResetDto>(errorMessage, 'Password reset failed');
        } finally {
            setLoading(false);
        }
    }, [createErrorResponse]);

    // Change Password
    const changePassword = useCallback(async (payload: ChangeAuthenticationPasswordPayload): Promise<AuthResponse<ChangePasswordDto>> => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await paktSDKService.changePassword(payload);
            
            if (response.status === 'error') {
                setError(response.message || 'Password change failed');
            }
            
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Password change failed';
            return createErrorResponse<ChangePasswordDto>(errorMessage, 'Password change failed');
        } finally {
            setLoading(false);
        }
    }, [createErrorResponse]);

    // Validate Password Token
    const validatePasswordToken = useCallback(async (props: { token: string; tempToken: string }): Promise<AuthResponse<ValidatePasswordToken>> => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await paktSDKService.validatePasswordToken(props);
            
            if (response.status === 'error') {
                setError(response.message || 'Password token validation failed');
            }
            
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Password token validation failed';
            return createErrorResponse<ValidatePasswordToken>(errorMessage, 'Password token validation failed');
        } finally {
            setLoading(false);
        }
    }, [createErrorResponse]);

    // Google OAuth Generate State
    const googleOAuthGenerateState = useCallback(async (): Promise<AuthResponse<GoogleOAuthGenerateDto>> => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await paktSDKService.googleOAuthGenerateState();
            
            if (response.status === 'error') {
                setError(response.message || 'Google OAuth state generation failed');
            }
            
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Google OAuth state generation failed';
            return createErrorResponse<GoogleOAuthGenerateDto>(errorMessage, 'Google OAuth state generation failed');
        } finally {
            setLoading(false);
        }
    }, [createErrorResponse]);

    // Google OAuth Validate State
    const googleOAuthValidateState = useCallback(async (props: GoogleOAuthValdatePayload): Promise<AuthResponse<GoogleOAuthValidateDto>> => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await paktSDKService.googleOAuthValidateState(props);
            
            if (response.status === 'success' && response.data) {
                setUser(response.data as unknown as User);
            } else {
                setError(response.message || 'Google OAuth validation failed');
            }
            
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Google OAuth validation failed';
            return createErrorResponse<GoogleOAuthValidateDto>(errorMessage, 'Google OAuth validation failed');
        } finally {
            setLoading(false);
        }
    }, [createErrorResponse]);

    // Get User
    const getUser = useCallback(async (authToken: string): Promise<AuthResponse<any>> => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await paktSDKService.getUser(authToken);
            
            if (response.status === 'success' && response.data) {
                setUser(response.data);
            } else {
                setError(response.message || 'Failed to get user');
            }
            
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to get user';
            return createErrorResponse<any>(errorMessage, 'Failed to get user');
        } finally {
            setLoading(false);
        }
    }, [createErrorResponse]);

    // Logout
    const logout = useCallback(async (authToken: string): Promise<AuthResponse<void>> => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await paktSDKService.logout(authToken);
            
            if (response.status === 'success') {
                clearUser();
            } else {
                setError(response.message || 'Logout failed');
            }
            
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Logout failed';
            return createErrorResponse<void>(errorMessage, 'Logout failed');
        } finally {
            setLoading(false);
        }
    }, [clearUser, createErrorResponse]);

    // Send Email 2FA
    const sendEmailTwoFA = useCallback(async (authToken: string): Promise<AuthResponse<{}>> => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await paktSDKService.sendEmailTwoFA(authToken);
            
            if (response.status === 'error') {
                setError(response.message || 'Failed to send 2FA email');
            }
            
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to send 2FA email';
            return createErrorResponse<{}>(errorMessage, 'Failed to send 2FA email');
        } finally {
            setLoading(false);
        }
    }, [createErrorResponse]);

    // Validate Referral
    const validateReferral = useCallback(async (token: string): Promise<AuthResponse<ValidateReferralDto>> => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await paktSDKService.validateReferral(token);
            
            if (response.status === 'error') {
                setError(response.message || 'Referral validation failed');
            }
            
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Referral validation failed';
            return createErrorResponse<ValidateReferralDto>(errorMessage, 'Referral validation failed');
        } finally {
            setLoading(false);
        }
    }, [createErrorResponse]);

    // Login Two-Factor Authentication
    const loginTwoFa = useCallback(async (payload: LoginTwoFAPayload): Promise<AuthResponse<LoginDto>> => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await paktSDKService.loginTwoFa(payload);
            
            if (response.status === 'success' && response.data) {
                setUser(response.data);
            } else {
                setError(response.message || 'Two-factor authentication failed');
            }
            
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Two-factor authentication failed';
            return createErrorResponse<LoginDto>(errorMessage, 'Two-factor authentication failed');
        } finally {
            setLoading(false);
        }
    }, [createErrorResponse]);

    return {
        // State
        user,
        loading,
        error,
        
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
        logout,
        sendEmailTwoFA,
        
        // Utility Methods
        clearError,
        clearUser,
    };
};