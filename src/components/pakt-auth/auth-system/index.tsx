/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { forwardRef, useImperativeHandle, useState } from "react";
import {
    AccountVerifyDto,
    IUserTwoFaType,
    LoginPayload,
    LoginTwoFAPayload,
    RegisterPayload,
    VerifyAccountPayload,
    ChangeAuthenticationPasswordPayload,
} from "pakt-sdk";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { usePaktAuthInternal } from "../../../hooks/use-pakt-auth";
import { useConfig } from "../../../context/config-context";
import { useAuthStore } from "../../../store/auth-store";
import { AUTH_TOKEN_KEY, setCookie } from "../../../utils/auth-utils";
import {
    SignupFormValues,
    ForgotPasswordFormValues,
    ResetPasswordFormValues,
} from "../../../utils/validation";
import {
    SignupMethodDialog,
    SigninMethodDialog,
    SignupDialog,
    LoginDialog,
    ForgotPasswordDialog,
    VerifySignupDialog,
    VerifyLoginDialog,
    VerifyResetDialog,
    ResetPasswordDialog,
} from "../../auth";
import { AuthTextConfig, UserData } from "../types";

type AuthView =
    | "intro"
    | "login-method"
    | "signup-method"
    | "login"
    | "signup"
    | "verify-login"
    | "verify-signup"
    | "forgot-password"
    | "verify-email"
    | "reset-password"
    | "";

interface AuthSystemProps {
    textConfig?: AuthTextConfig;
    onLoginSuccess?: (userData: UserData) => void;
    onSignupSuccess?: (userData: UserData) => void;
    initialView?: "login" | "signup";
    onClose?: () => void;
}

type AuthSystemRef = {
    onSignup: () => void;
    onLogin: () => void;
};

interface AuthSuccess {
    isSuccess: boolean;
    userData: UserData | null;
}

const initialAuthSuccess: AuthSuccess = {
    isSuccess: false,
    userData: null,
};

const AuthSystem = forwardRef<AuthSystemRef, AuthSystemProps>(
    (
        {
            textConfig,
            onLoginSuccess,
            onSignupSuccess,
            initialView,
            onClose,
        }: AuthSystemProps,
        ref
    ) => {
        // Check if Google OAuth is enabled
        const { googleOAuth } = useConfig();
        const isGoogleOAuthEnabled = !!googleOAuth?.clientId;

        const getInitialView = (): AuthView => {
            if (!initialView) return "";
            if (initialView === "login") {
                return isGoogleOAuthEnabled ? "login-method" : "login";
            }
            if (initialView === "signup") {
                return isGoogleOAuthEnabled ? "signup-method" : "signup";
            }
            return "";
        };

        const [currentView, setCurrentView] =
            useState<AuthView>(getInitialView());

        const [verifySignupSuccess, setVerifySignupSuccess] =
            useState<AuthSuccess>(initialAuthSuccess);
        const [verifyLoginSuccess, setVerifyLoginSuccess] =
            useState<AuthSuccess>(initialAuthSuccess);
        const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
        const [twoFaType, setTwoFaType] = useState<IUserTwoFaType | null>(null);
        const [tempToken, setTempToken] = useState("");
        const [signupEmail, setSignupEmail] = useState("");
        const [login2faEmail, setLogin2faEmail] = useState("");
        const [verificationToken, setVerificationToken] = useState("");
        const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

        const {
            login,
            loginTwoFa,
            register,
            verifyAccount,
            resendVerifyLink,
            resetPassword,
            changePassword,
            resendTwoFAEmailCode,
            loading,
        } = usePaktAuthInternal();

        const { setUser } = useAuthStore();

        const resetCurrentView = () => {
            setCurrentView("");
            setVerifySignupSuccess(initialAuthSuccess);
            setVerifyLoginSuccess(initialAuthSuccess);
            setResetPasswordSuccess(false);
            setTwoFaType(null);
            setTempToken("");
            setSignupEmail("");
            setLogin2faEmail("");
            setVerificationToken("");
            setForgotPasswordEmail("");
            onClose?.();
        };
        const backToSignupMethod = () => setCurrentView("signup-method");
        const backToLoginMethod = () => setCurrentView("login-method");

        const handleLoginSuccess = (userData: UserData) => {
            // Persist user data to store (already done by usePaktAuth, but ensure token is in cookie)
            setUser(userData);
            if ("token" in userData && userData.token) {
                setCookie(AUTH_TOKEN_KEY, userData.token);
            }
            onLoginSuccess?.(userData);
            resetCurrentView();
        };

        const handleLogin = async (loginPayload: LoginPayload) => {
            const { data, status } = await login(loginPayload);

            if (status === "success" && data) {
                setTempToken(data?.tempToken?.token);
                if (!data?.isVerified) {
                    setSignupEmail(data?.email);
                    setCurrentView("verify-signup");
                    return;
                }

                if (data?.twoFa?.status) {
                    setLogin2faEmail(data?.email);
                    setTwoFaType(data?.twoFa?.type);
                    setCurrentView("verify-login");
                    return;
                }

                handleLoginSuccess(data);
            }
        };

        const handleVerifyLogin = async (verificationData: { otp: string }) => {
            const loginTwoFaPayload: LoginTwoFAPayload = {
                code: verificationData.otp,
                tempToken,
            };

            const { data, status } = await loginTwoFa(loginTwoFaPayload);

            if (status === "success" && data) {
                setVerifyLoginSuccess({
                    isSuccess: true,
                    userData: data,
                });
            }
        };

        const handleVerifyLoginSuccess = () => {
            const { userData } = verifyLoginSuccess;

            if (userData) {
                // Persist user data to store (already done by usePaktAuth, but ensure token is in cookie)
                setUser(userData);
                if ("token" in userData && userData.token) {
                    setCookie(AUTH_TOKEN_KEY, userData.token);
                }
            }
            onLoginSuccess?.(userData || ({} as UserData));
            resetCurrentView();
        };

        const handleSignup = async (signupPayload: SignupFormValues) => {
            const registerPayload: RegisterPayload = {
                firstName: signupPayload.firstName,
                email: signupPayload.email,
                password: signupPayload.password,
                confirmPassword: signupPayload.confirmPassword,
            };

            const { data, status } = await register(registerPayload);

            if (status === "success" && data) {
                setTempToken(data?.token);
                setSignupEmail(signupPayload.email);
                setCurrentView("verify-signup");
            }
        };

        const handleVerifySignup = async (verificationData: {
            otp: string;
        }) => {
            const verifyPayload: VerifyAccountPayload = {
                tempToken,
                token: verificationData.otp,
            };

            const { data, status } = await verifyAccount(verifyPayload);

            if (status === "success" && data) {
                setVerifySignupSuccess({
                    isSuccess: true,
                    userData: data,
                });
            }
        };

        const handleVerifySignupSuccess = () => {
            const { userData } = verifySignupSuccess;

            if (userData) {
                // Persist user data to store (already done by usePaktAuth, but ensure token is in cookie)
                setUser(userData);
                if ("token" in userData && userData.token) {
                    setCookie(AUTH_TOKEN_KEY, userData.token);
                }
            }
            onSignupSuccess?.(userData as AccountVerifyDto);
            resetCurrentView();
        };

        const handleResendVerification = async () => {
            const resendPayload = {
                email: signupEmail,
            };

            const { data, status } = await resendVerifyLink(resendPayload);
            if (status === "success" && data?.tempToken?.token) {
                setTempToken(data.tempToken.token);
            }
        };

        const handleResendLoginVerification = async () => {
            if (!login2faEmail) return;
            await resendTwoFAEmailCode(login2faEmail);
        };

        const handleForgotPassword = async (
            forgotPasswordPayload: ForgotPasswordFormValues
        ) => {
            const { data, status } = await resetPassword(forgotPasswordPayload);

            if (status === "success" && data) {
                setTempToken(data?.tempToken?.token);
                setForgotPasswordEmail(forgotPasswordPayload.email);
                setCurrentView("verify-email");
            }
        };

        const handleVerifyEmail = async (verificationData: { otp: string }) => {
            // Store the verification token for the reset password step
            setVerificationToken(verificationData.otp);
            setCurrentView("reset-password");
        };

        const handleResetPassword = async (
            resetPasswordPayload: ResetPasswordFormValues
        ) => {
            const changePasswordPayload: ChangeAuthenticationPasswordPayload = {
                token: resetPasswordPayload.token,
                tempToken,
                password: resetPasswordPayload.password,
            };

            const { status } = await changePassword(changePasswordPayload);

            if (status === "success") {
                setResetPasswordSuccess(true);
            }
        };

        const handleResetPasswordSuccess = () => {
            setCurrentView("login");
        };

        const handleGoogleSignupSuccess = (userData: UserData) => {
            // Persist user data to store (already done by usePaktAuth, but ensure token is in cookie)
            setUser(userData);
            if ("token" in userData && userData.token) {
                setCookie(AUTH_TOKEN_KEY, userData.token);
            }
            onSignupSuccess?.(userData);
            resetCurrentView();
        };

        const handleGoogleLoginSuccess = (userData: UserData) => {
            // Persist user data to store (already done by usePaktAuth, but ensure token is in cookie)
            setUser(userData);
            if ("token" in userData && userData.token) {
                setCookie(AUTH_TOKEN_KEY, userData.token);
            }
            onLoginSuccess?.(userData);
            resetCurrentView();
        };

        useImperativeHandle(ref, () => ({
            onSignup: () => {
                // If Google OAuth is not enabled, go directly to signup form
                if (!isGoogleOAuthEnabled) {
                    setCurrentView("signup");
                } else {
                    setCurrentView("signup-method");
                }
            },
            onLogin: () => {
                // If Google OAuth is not enabled, go directly to login form
                if (!isGoogleOAuthEnabled) {
                    setCurrentView("login");
                } else {
                    setCurrentView("login-method");
                }
            },
        }));

        const handleResendResetVerification = async () => {
            if (!forgotPasswordEmail) return;

            const { data, status } = await resetPassword({
                email: forgotPasswordEmail,
            });

            if (status === "success" && data) {
                setTempToken(data?.tempToken?.token);
            }
        };

        return (
            <>
                {/* == Sign Up == */}
                <SignupMethodDialog
                    isOpen={currentView === "signup-method"}
                    onClose={resetCurrentView}
                    textConfig={textConfig}
                    onEmailSignup={() => setCurrentView("signup")}
                    goToLoginMethod={() => setCurrentView("login-method")}
                    onGoogleSignupSuccess={handleGoogleSignupSuccess}
                />
                <SignupDialog
                    isOpen={currentView === "signup"}
                    onClose={resetCurrentView}
                    textConfig={textConfig}
                    onSubmit={handleSignup}
                    isLoading={loading}
                    backToSignupMethod={
                        isGoogleOAuthEnabled ? backToSignupMethod : undefined
                    }
                    goToLoginMethod={() => {
                        // If Google OAuth is not enabled, go directly to login form
                        if (!isGoogleOAuthEnabled) {
                            setCurrentView("login");
                        } else {
                            setCurrentView("login-method");
                        }
                    }}
                />
                <VerifySignupDialog
                    isOpen={currentView === "verify-signup"}
                    onClose={() => setCurrentView("signup")}
                    onVerify={handleVerifySignup}
                    onResend={handleResendVerification}
                    isLoading={loading}
                    isSuccess={verifySignupSuccess.isSuccess}
                    onSuccess={handleVerifySignupSuccess}
                />
                {/* == Login == */}
                <SigninMethodDialog
                    isOpen={currentView === "login-method"}
                    onClose={resetCurrentView}
                    textConfig={textConfig}
                    onEmailLogin={() => setCurrentView("login")}
                    onGoogleLogin={() => {
                        // no-op: Google login handled via onGoogleLoginSuccess/onGoogleLoginError
                    }}
                    goToSignupMethod={() => setCurrentView("signup-method")}
                    onGoogleLoginSuccess={handleGoogleLoginSuccess}
                />
                <LoginDialog
                    isOpen={currentView === "login"}
                    onClose={resetCurrentView}
                    textConfig={textConfig}
                    onSubmit={handleLogin}
                    isLoading={loading}
                    onForgotPassword={() => setCurrentView("forgot-password")}
                    onSignup={() => {
                        // If Google OAuth is not enabled, go directly to signup form
                        if (!isGoogleOAuthEnabled) {
                            setCurrentView("signup");
                        } else {
                            setCurrentView("signup-method");
                        }
                    }}
                    backToLoginMethod={
                        isGoogleOAuthEnabled ? backToLoginMethod : undefined
                    }
                />

                <VerifyLoginDialog
                    isOpen={currentView === "verify-login"}
                    onClose={() => setCurrentView("login")}
                    onVerify={handleVerifyLogin}
                    onResend={handleResendLoginVerification}
                    isLoading={loading}
                    isSuccess={verifyLoginSuccess.isSuccess}
                    onSuccess={handleVerifyLoginSuccess}
                    type={twoFaType}
                    email={login2faEmail}
                />
                {/* == Forgot Password == */}
                <ForgotPasswordDialog
                    isOpen={currentView === "forgot-password"}
                    onClose={() => setCurrentView("login")}
                    onSubmit={handleForgotPassword}
                    isLoading={loading}
                    onBackToLogin={() => setCurrentView("login")}
                />

                <VerifyResetDialog
                    isOpen={currentView === "verify-email"}
                    onClose={() => setCurrentView("forgot-password")}
                    onVerify={handleVerifyEmail}
                    onResend={handleResendResetVerification}
                    email={forgotPasswordEmail}
                />
                <ResetPasswordDialog
                    isOpen={currentView === "reset-password"}
                    onClose={() => setCurrentView("verify-email")}
                    onSubmit={handleResetPassword}
                    isLoading={loading}
                    isSuccess={resetPasswordSuccess}
                    onSuccess={handleResetPasswordSuccess}
                    token={verificationToken}
                />
            </>
        );
    }
);

export default AuthSystem;
