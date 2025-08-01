/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

// Auth response types
export interface AuthResponseData {
  email: string;
  tempToken?: {
    token: string;
  };
  isVerified?: boolean;
  twoFa?: {
    status: boolean;
    type: string;
  };
  timeZone?: string;
  token?: string;
}

export interface LoginResponse {
  email: string;
  token: string;
  type: string;
  verifyType: string;
}

export interface SignUpResponse {
  email: string;
  token: string;
  verifyType: string;
}

// User profile types
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth state types
export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Auth context types
export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupFormData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  verifyTwoFactor: (code: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  refreshToken: () => Promise<void>;
}

// Form data types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
  token: string;
}

export interface EmailVerificationFormData {
  code: string;
}

export interface TwoFactorFormData {
  code: string;
}

export interface ProfileUpdateFormData {
  firstName: string;
  lastName: string;
  email: string;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthApiResponse extends ApiResponse<AuthResponseData> {}

// Configuration types
export interface AuthConfig {
  apiBaseUrl: string;
  googleClientId?: string;
  onNavigate?: (path: string) => void;
  onSetCookie?: (key: string, value: string) => void;
  onGetCookie?: (key: string) => string | null;
  onRemoveCookie?: (key: string) => void;
  onError?: (error: string) => void;
  onSuccess?: (message: string) => void;
}

// Component props types
export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup' | 'forgot-password';
  onSuccess?: (user: UserProfile) => void;
  onError?: (error: string) => void;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
  error?: string;
  onForgotPassword?: () => void;
  onSignup?: () => void;
  onGoogleLogin?: () => void; 
  backToLoginMethod?: () => void;
}

export interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
  isLoading?: boolean;
  error?: string;
  backToSignupMethod?: () => void;
  onGoogleSignup?: () => void;
}

export interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormData) => void;
  isLoading?: boolean;
  error?: string;
  onBackToLogin?: () => void;
}

export interface EmailVerificationFormProps {
  onSubmit: (data: EmailVerificationFormData) => void;
  isLoading?: boolean;
  error?: string;
  email?: string;
  onResendCode?: () => void;
}

export interface TwoFactorFormProps {
  onSubmit: (data: TwoFactorFormData) => void;
  isLoading?: boolean;
  error?: string;
  type?: 'email' | 'sms' | 'authenticator';
  onResendCode?: () => void;
} 