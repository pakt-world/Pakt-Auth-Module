// Import PAKT SDK types and classes
import {
    PaktSDK,
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
    ResponseDto,
} from "pakt-sdk";

// Define LoginTwoFAPayload interface since it might not be exported from pakt-sdk
export interface LoginTwoFAPayload {
    code: string;
    tempToken: string;
}

export interface PaktSDKConfig {
    baseUrl: string;
    testnet?: boolean;
    verbose?: boolean;
}

export interface AuthResponse<T = any> {
    status: "success" | "error";
    message: string;
    data: T;
    statusCode?: number;
    code?: number;
}

class PaktSDKService {
    private sdk: any = null;
    private config: PaktSDKConfig | null = null;
    private isInitialized: boolean = false;

    async initialize(config: PaktSDKConfig): Promise<void> {
        try {
            this.config = config;
            this.sdk = await PaktSDK.init(config);
            this.isInitialized = true;
        } catch (error) {
            this.isInitialized = false;
            throw new Error(
                `Failed to initialize PAKT SDK: ${error instanceof Error ? error.message : "Unknown error"}`
            );
        }
    }

    private ensureInitialized(): any {
        if (!this.isInitialized || !this.sdk) {
            throw new Error(
                "PAKT SDK not initialized. Call initialize() first."
            );
        }
        return this.sdk;
    }

    private static createErrorResponse<T>(
        error: unknown,
        defaultMessage: string
    ): AuthResponse<T> {
        let statusCode = 500;
        let message = defaultMessage;

        if (error instanceof Error) {
            message = error.message;

            // Extract status code from Axios errors
            if (
                typeof (error as any).response !== "undefined" &&
                (error as any).response?.status
            ) {
                statusCode = (error as any).response.status;
            }
            // Extract status code from fetch errors or other error formats
            else if (typeof (error as any).status === "number") {
                statusCode = (error as any).status;
            } else if (typeof (error as any).statusCode === "number") {
                statusCode = (error as any).statusCode;
            } else if (typeof (error as any).code === "number") {
                // Some errors use 'code' for status code
                const { code } = error as any;
                if (code >= 100 && code < 600) {
                    statusCode = code;
                }
            }
        } else if (typeof error === "object" && error !== null) {
            // Handle error objects that might have status information
            const err = error as any;
            if (typeof err.status === "number") {
                statusCode = err.status;
            } else if (typeof err.statusCode === "number") {
                statusCode = err.statusCode;
            } else if (
                typeof err.code === "number" &&
                err.code >= 100 &&
                err.code < 600
            ) {
                statusCode = err.code;
            }
            if (err.message) {
                message = err.message;
            }
        }

        return {
            status: "error",
            message,
            data: null as T,
            statusCode,
        };
    }

    // Check if SDK is initialized
    getInitialized(): boolean {
        return this.isInitialized;
    }

    // Get current config
    getConfig(): PaktSDKConfig | null {
        return this.config;
    }

    // Authentication Methods
    async login(payload: LoginPayload): Promise<AuthResponse<LoginDto>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.login(payload);
            return response as AuthResponse<LoginDto>;
        } catch (error) {
            return PaktSDKService.createErrorResponse<LoginDto>(
                error,
                "Login failed"
            );
        }
    }

    async loginTwoFa(
        payload: LoginTwoFAPayload
    ): Promise<AuthResponse<LoginDto>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.loginTwoFa(payload);
            return response as AuthResponse<LoginDto>;
        } catch (error) {
            return PaktSDKService.createErrorResponse<LoginDto>(
                error,
                "Two-factor authentication failed"
            );
        }
    }

    async register(
        payload: RegisterPayload
    ): Promise<AuthResponse<RegisterDto>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.register(payload);
            return response as AuthResponse<RegisterDto>;
        } catch (error) {
            return PaktSDKService.createErrorResponse<RegisterDto>(
                error,
                "Registration failed"
            );
        }
    }

    async verifyAccount(
        payload: VerifyAccountPayload
    ): Promise<AuthResponse<AccountVerifyDto>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.verifyAccount(payload);
            return response as AuthResponse<AccountVerifyDto>;
        } catch (error) {
            return PaktSDKService.createErrorResponse<AccountVerifyDto>(
                error,
                "Account verification failed"
            );
        }
    }

    async resendVerifyLink(
        payload: ResendVerifyPayload
    ): Promise<AuthResponse<IResendVerifyLink>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.resendVerifyLink(payload);
            return response as AuthResponse<IResendVerifyLink>;
        } catch (error) {
            return PaktSDKService.createErrorResponse<IResendVerifyLink>(
                error,
                "Resend verification failed"
            );
        }
    }

    async resetPassword(
        payload: ResetPasswordPayload
    ): Promise<AuthResponse<ResetDto>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.resetPassword(payload);
            return response as AuthResponse<ResetDto>;
        } catch (error) {
            return PaktSDKService.createErrorResponse<ResetDto>(
                error,
                "Password reset failed"
            );
        }
    }

    async changePassword(
        payload: ChangeAuthenticationPasswordPayload
    ): Promise<AuthResponse<ChangePasswordDto>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.changePassword(payload);
            return response as AuthResponse<ChangePasswordDto>;
        } catch (error) {
            return PaktSDKService.createErrorResponse<ChangePasswordDto>(
                error,
                "Password change failed"
            );
        }
    }

    async validatePasswordToken(props: {
        token: string;
        tempToken: string;
    }): Promise<AuthResponse<ValidatePasswordToken>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.validatePasswordToken(props);
            return response as AuthResponse<ValidatePasswordToken>;
        } catch (error) {
            return PaktSDKService.createErrorResponse<ValidatePasswordToken>(
                error,
                "Password token validation failed"
            );
        }
    }

    async validateReferral(
        token: string
    ): Promise<AuthResponse<ValidateReferralDto>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.validateReferral(token);
            return response as AuthResponse<ValidateReferralDto>;
        } catch (error) {
            return PaktSDKService.createErrorResponse<ValidateReferralDto>(
                error,
                "Referral validation failed"
            );
        }
    }

    async googleOAuthGenerateState(): Promise<
        AuthResponse<GoogleOAuthGenerateDto>
    > {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.googleOAuthGenerateState();
            return response as AuthResponse<GoogleOAuthGenerateDto>;
        } catch (error) {
            return PaktSDKService.createErrorResponse<GoogleOAuthGenerateDto>(
                error,
                "Google OAuth state generation failed"
            );
        }
    }

    async googleOAuthValidateState(
        props: GoogleOAuthValdatePayload
    ): Promise<AuthResponse<GoogleOAuthValidateDto>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.googleOAuthValidateState(props);
            return response as AuthResponse<GoogleOAuthValidateDto>;
        } catch (error) {
            return PaktSDKService.createErrorResponse<GoogleOAuthValidateDto>(
                error,
                "Google OAuth validation failed"
            );
        }
    }

    // Account Methods
    async getAccount(authToken: string): Promise<AuthResponse<any>> {
        const sdk = this.ensureInitialized();
        try {
            // The account endpoint returns full user profile
            const response = await sdk.account.getUser(authToken);
            return response as AuthResponse<any>;
        } catch (error) {
            return PaktSDKService.createErrorResponse<any>(
                error,
                "Failed to get account"
            );
        }
    }

    async logout(authToken: string): Promise<AuthResponse<void>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.account.logout(authToken);
            return response as AuthResponse<void>;
        } catch (error) {
            return PaktSDKService.createErrorResponse<void>(
                error,
                "Logout failed"
            );
        }
    }

    // Two-Factor Authentication
    async resendTwoFAEmailCode(email: string): Promise<AuthResponse<object>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.resendTwoFAEmailCode(email);
            return response as AuthResponse<object>;
        } catch (error) {
            return PaktSDKService.createErrorResponse<object>(
                error,
                "Failed to resend 2FA email code"
            );
        }
    }

    // Reset SDK state (useful for testing or re-initialization)
    reset(): void {
        this.sdk = null;
        this.config = null;
        this.isInitialized = false;
    }
}

// Export a singleton instance
export const paktSDKService = new PaktSDKService();

// Export types for use in components
export type {
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
};
