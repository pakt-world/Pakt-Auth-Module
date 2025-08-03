/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { LoginPayload } from "pakt-sdk";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { usePaktAuth } from "../../../hooks/use-pakt-auth";
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
        const [verifySignupSuccess, setVerifySignupSuccess] = useState(false);
        const [verifyLoginSuccess, setVerifyLoginSuccess] = useState(false);
        const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
        const [twoFaType, setTwoFaType] = useState("");
        const [tempToken, setTempToken] = useState("");

        const { login, loading, error } = usePaktAuth();

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
                    onSubmit={(data) => {
                        console.log("Signup:", data);
                        setCurrentView("verify-signup");
                    }}
                    isLoading={false}
                    error={undefined}
                    backToSignupMethod={backToSignupMethod}
                    goToLoginMethod={() => setCurrentView("login-method")}
                />
                <VerifySignupDialog
                    isOpen={currentView === "verify-signup"}
                    onClose={() => setCurrentView("signup")}
                    onVerify={(code) => {
                        console.log("Verify signup:", code);
                        setVerifySignupSuccess(true);
                    }}
                    onResend={() => {
                        console.log("Resend verification");
                    }}
                    isSuccess={verifySignupSuccess}
                    onSuccess={() => {
                        console.log("Verify signup success");
                        const userData = {
                            /* Add user data here */
                        };
                        onSignupSuccess?.(userData);
                        resetCurrentView();
                    }}
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
