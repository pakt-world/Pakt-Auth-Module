/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { forwardRef, Ref, useImperativeHandle, useState } from "react";
import {
    AccountVerifyDto,
    LoginPayload,
    RegisterPayload,
    VerifyAccountPayload,
} from "pakt-sdk";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { usePaktAuth } from "../../../hooks/use-pakt-auth";
import { SignupFormValues } from "../../../utils/validation";
import {
    SignupMethodDialog,
    SigninMethodDialog,
    SignupDialog,
    LoginDialog,
    ForgotPasswordDialog,
    VerifySignupDialog,
    VerifyLoginDialog,
    VerifyEmailDialog,
    ResetPasswordDialog,
} from "../../auth";
// import { DesktopAuthProps } from "../types";

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

interface DesktopAuthProps {
    onLoginSuccess?: (userData: any) => void;
    onSignupSuccess?: (userData: any) => void;
}

type DesktopAuthRef = {
    onSignup: () => void;
    onLogin: () => void;
};

const DesktopAuth = forwardRef<DesktopAuthRef, DesktopAuthProps>(
    ({ onLoginSuccess, onSignupSuccess }, ref) => {
        const [currentView, setCurrentView] = useState<AuthView>("");
        const [verifySignupSuccess, setVerifySignupSuccess] = useState<{
            isSuccess: boolean;
            userData: AccountVerifyDto | null;
        }>({
            isSuccess: false,
            userData: null,
        });
        const [verifyLoginSuccess, setVerifyLoginSuccess] = useState(false);
        const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
        const [twoFaType, setTwoFaType] = useState("");
        const [tempToken, setTempToken] = useState("");
        const [signupEmail, setSignupEmail] = useState("");

        const {
            login,
            register,
            verifyAccount,
            resendVerifyLink,
            loading,
            error,
        } = usePaktAuth();

        const resetCurrentView = () => setCurrentView("");
        const backToSignupMethod = () => setCurrentView("signup-method");
        const backToLoginMethod = () => setCurrentView("login-method");

        useImperativeHandle(ref, () => ({
            onSignup: () => setCurrentView("signup-method"),
            onLogin: () => setCurrentView("login-method"),
        }));

        const handleLogin = async (loginPayload: LoginPayload) => {
            const { data, status } = await login(loginPayload);

            if (status === "success" && data) {
                if (data?.twoFa?.status) {
                    setTwoFaType(data?.twoFa?.type);
                    setTempToken(data?.tempToken?.token);
                    setCurrentView("verify-login");
                } else {
                    onLoginSuccess?.(data);
                    resetCurrentView();
                }
            }
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
                tempToken: tempToken,
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
            onSignupSuccess?.(verifySignupSuccess.userData);
            resetCurrentView();
        };

        const handleResendVerification = async () => {
            const resendPayload = {
                email: signupEmail,
            };

            await resendVerifyLink(resendPayload);
        };

        console.log("currentView", currentView);

        return (
            <>
                {/* == Sign Up == */}
                <SignupMethodDialog
                    isOpen={currentView === "signup-method"}
                    onClose={resetCurrentView}
                    onEmailSignup={() => setCurrentView("signup")}
                    goToLoginMethod={() => setCurrentView("login-method")}
                    onGoogleSignup={() => {
                        console.log("Google signup");
                    }}
                />
                <SignupDialog
                    isOpen={currentView === "signup"}
                    onClose={resetCurrentView}
                    onSubmit={handleSignup}
                    isLoading={loading}
                    error={error || undefined}
                    backToSignupMethod={backToSignupMethod}
                    goToLoginMethod={() => setCurrentView("login-method")}
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
                    onEmailLogin={() => setCurrentView("login")}
                    onGoogleLogin={() => {
                        console.log("Google login");
                    }}
                    goToSignupMethod={() => setCurrentView("signup-method")}
                />
                <LoginDialog
                    isOpen={currentView === "login"}
                    onClose={resetCurrentView}
                    onSubmit={handleLogin}
                    isLoading={loading}
                    error={error || undefined}
                    onForgotPassword={() => setCurrentView("forgot-password")}
                    onSignup={() => setCurrentView("signup")}
                    backToLoginMethod={backToLoginMethod}
                />

                <VerifyLoginDialog
                    isOpen={currentView === "verify-login"}
                    onClose={() => setCurrentView("login")}
                    onVerify={(code) => {
                        console.log("Verify login:", code);
                        setVerifyLoginSuccess(true);
                    }}
                    onResend={() => {
                        console.log("Resend verification");
                    }}
                    isSuccess={verifyLoginSuccess}
                    onSuccess={() => {
                        console.log("Verify login success");
                        const userData = {
                            /* Add user data here */
                        };
                        onLoginSuccess?.(userData);
                        resetCurrentView();
                    }}
                    type="email"
                />
                {/* == Forgot Password == */}
                <ForgotPasswordDialog
                    isOpen={currentView === "forgot-password"}
                    onClose={() => setCurrentView("login")}
                    onSubmit={(data) => {
                        console.log("Forgot password:", data);
                        setCurrentView("verify-email");
                    }}
                    isLoading={false}
                    error={undefined}
                    onBackToLogin={() => setCurrentView("login")}
                />

                <VerifyEmailDialog
                    isOpen={currentView === "verify-email"}
                    onClose={() => setCurrentView("forgot-password")}
                    onVerify={(code) => {
                        console.log("Verify email:", code);
                        setCurrentView("reset-password");
                    }}
                    onResend={() => {
                        console.log("Resend verification");
                    }}
                />
                <ResetPasswordDialog
                    isOpen={currentView === "reset-password"}
                    onClose={() => setCurrentView("verify-email")}
                    onSubmit={(data) => {
                        console.log("Reset password:", data);
                        setResetPasswordSuccess(true);
                    }}
                    isLoading={false}
                    error={undefined}
                    isSuccess={resetPasswordSuccess}
                    onSuccess={() => {
                        console.log("Reset password success");
                        setCurrentView("login");
                    }}
                />
            </>
        );
    }
);

export default DesktopAuth;
