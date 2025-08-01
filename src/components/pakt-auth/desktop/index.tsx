/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { forwardRef, Ref, useImperativeHandle, useState } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import {
    SignupMethodDialog,
    SigninMethodDialog,
    SignupDialog,
    LoginDialog,
    ForgotPasswordDialog,
    // VerifySignUpDialog,
    // VerifyLoginDialog,
    // VerifyEmailDialog,
    // ResetPasswordDialog,
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

type DesktopAuthRef = Ref<{
    onSignup: () => void;
    onLogin: () => void;
}>;

const DesktopAuth = forwardRef((_, ref: DesktopAuthRef) => {
    const [currentView, setCurrentView] = useState<AuthView>("");

    const resetCurrentView = () => setCurrentView("");
    const backToSignupMethod = () => setCurrentView("signup-method");
    const backToLoginMethod = () => setCurrentView("login-method");

    useImperativeHandle(ref, () => ({
        onSignup: () => setCurrentView("signup-method"),
        onLogin: () => setCurrentView("login-method"),
    }));

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
                    // Handle Google signup
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
            />
            {/*   <VerifySignUpDialog
                isOpen={currentView === "verify-signup"}
                onClose={() => setCurrentView("signup")}
                onVerify={(code) => {
                    console.log("Verify signup:", code);
                }}
                onResend={() => {
                    console.log("Resend verification");
                }}
            /> */}
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
                onSubmit={(data) => {
                    console.log("Login:", data);
                    setCurrentView("verify-login");
                }}
                isLoading={false}
                error={undefined}
                onForgotPassword={() => setCurrentView("forgot-password")}
                onSignup={() => setCurrentView("signup")}
                backToLoginMethod={backToLoginMethod}
            />

            {/*  <VerifyLoginDialog
                isOpen={currentView === "verify-login"}
                onClose={() => setCurrentView("login")}
                onVerify={(code) => {
                    console.log("Verify login:", code);
                }}
                onResend={() => {
                    console.log("Resend verification");
                }}
            /> */}
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
                onSuccess={() => setCurrentView("verify-email")}
            />

            {/* <VerifyEmailDialog
                isOpen={currentView === "verify-email"}
                onClose={() => setCurrentView("forgot-password")}
                onVerify={(code) => {
                    console.log("Verify email:", code);
                }}
                onResend={() => {
                    console.log("Resend verification");
                }}
                onSuccess={() => setCurrentView("reset-password")}
            />
            <ResetPasswordDialog
                isOpen={currentView === "reset-password"}
                onClose={() => setCurrentView("verify-email")}
                onSubmit={(data) => {
                    console.log("Reset password:", data);
                    setCurrentView("login");
                }}
                isLoading={false}
                error={undefined}
                onSuccess={() => setCurrentView("login")}
            /> */}
        </>
    );
});

export default DesktopAuth;
