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
    ResponseDto
} from "pakt-sdk";

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
            throw new Error(`Failed to initialize PAKT SDK: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    private ensureInitialized(): any {
        if (!this.isInitialized || !this.sdk) {
            throw new Error("PAKT SDK not initialized. Call initialize() first.");
        }
        return this.sdk;
    }

    private createErrorResponse<T>(error: unknown, defaultMessage: string): AuthResponse<T> {
        return {
            status: "error",
            message: error instanceof Error ? error.message : defaultMessage,
            data: null as T,
            statusCode: 500
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
            return this.createErrorResponse<LoginDto>(error, "Login failed");
        }
    }

    async register(payload: RegisterPayload): Promise<AuthResponse<RegisterDto>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.register(payload);
            return response as AuthResponse<RegisterDto>;
        } catch (error) {
            return this.createErrorResponse<RegisterDto>(error, "Registration failed");
        }
    }

    async verifyAccount(payload: VerifyAccountPayload): Promise<AuthResponse<AccountVerifyDto>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.verifyAccount(payload);
            return response as AuthResponse<AccountVerifyDto>;
        } catch (error) {
            return this.createErrorResponse<AccountVerifyDto>(error, "Account verification failed");
        }
    }

    async resendVerifyLink(payload: ResendVerifyPayload): Promise<AuthResponse<IResendVerifyLink>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.resendVerifyLink(payload);
            return response as AuthResponse<IResendVerifyLink>;
        } catch (error) {
            return this.createErrorResponse<IResendVerifyLink>(error, "Resend verification failed");
        }
    }

    async resetPassword(payload: ResetPasswordPayload): Promise<AuthResponse<ResetDto>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.resetPassword(payload);
            return response as AuthResponse<ResetDto>;
        } catch (error) {
            return this.createErrorResponse<ResetDto>(error, "Password reset failed");
        }
    }

    async changePassword(payload: ChangeAuthenticationPasswordPayload): Promise<AuthResponse<ChangePasswordDto>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.changePassword(payload);
            return response as AuthResponse<ChangePasswordDto>;
        } catch (error) {
            return this.createErrorResponse<ChangePasswordDto>(error, "Password change failed");
        }
    }

    async validatePasswordToken(props: { token: string; tempToken: string }): Promise<AuthResponse<ValidatePasswordToken>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.validatePasswordToken(props);
            return response as AuthResponse<ValidatePasswordToken>;
        } catch (error) {
            return this.createErrorResponse<ValidatePasswordToken>(error, "Password token validation failed");
        }
    }

    async validateReferral(token: string): Promise<AuthResponse<ValidateReferralDto>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.validateReferral(token);
            return response as AuthResponse<ValidateReferralDto>;
        } catch (error) {
            return this.createErrorResponse<ValidateReferralDto>(error, "Referral validation failed");
        }
    }

    async googleOAuthGenerateState(): Promise<AuthResponse<GoogleOAuthGenerateDto>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.googleOAuthGenerateState();
            return response as AuthResponse<GoogleOAuthGenerateDto>;
        } catch (error) {
            return this.createErrorResponse<GoogleOAuthGenerateDto>(error, "Google OAuth state generation failed");
        }
    }

    async googleOAuthValidateState(props: GoogleOAuthValdatePayload): Promise<AuthResponse<GoogleOAuthValidateDto>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.auth.googleOAuthValidateState(props);
            return response as AuthResponse<GoogleOAuthValidateDto>;
        } catch (error) {
            return this.createErrorResponse<GoogleOAuthValidateDto>(error, "Google OAuth validation failed");
        }
    }

    // Account Methods
    async getUser(authToken: string): Promise<AuthResponse<any>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.account.getUser(authToken);
            return response as AuthResponse<any>;
        } catch (error) {
            return this.createErrorResponse<any>(error, "Failed to get user");
        }
    }

    async logout(authToken: string): Promise<AuthResponse<void>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.account.logout(authToken);
            return response as AuthResponse<void>;
        } catch (error) {
            return this.createErrorResponse<void>(error, "Logout failed");
        }
    }

    // Two-Factor Authentication
    async sendEmailTwoFA(authToken: string): Promise<AuthResponse<{}>> {
        const sdk = this.ensureInitialized();
        try {
            const response = await sdk.account.sendEmailTwoFA(authToken);
            return response as AuthResponse<{}>;
        } catch (error) {
            return this.createErrorResponse<{}>(error, "Failed to send 2FA email");
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
    GoogleOAuthValidateDto
}; 