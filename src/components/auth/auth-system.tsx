/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { SigninMethod, SignupMethod } from "./auth-method";
import LoginDialog from "./desktop/login-dialog";
import SignupDialog from "./desktop/signup-dialog";
import SignupMethodDialog from "../dialog/signup-method-dialog";
import SigninMethodDialog from "../dialog/signin-method-dialog";
import VerifySignUpDialog from "./desktop/verify-signup-dialog";
import VerifyLoginDialog from "./desktop/verify-login-dialog";
import ForgotPasswordDialog from "./desktop/forgot-password-dialog";
import VerifyEmailDialog from "./desktop/verify-email-dialog";
import ResetPasswordDialog from "./desktop/reset-password-dialog";
import LoginForm from "./login/login-form";
import SignupForm from "../ui/signup/signup-form";
import {
    LoginFormData,
    SignupFormData,
    ForgotPasswordFormData,
} from "../../types/auth";

interface AuthSystemProps {
    onLogin?: (data: LoginFormData) => void;
    onSignup?: (data: SignupFormData) => void;
    onForgotPassword?: (data: ForgotPasswordFormData) => void;
    onGoogleAuth?: () => void;
    onNavigate?: (path: string) => void;
    onSetCookie?: (key: string, value: string) => void;
    generateGoogleAuth?: (options: { enable: boolean }) => {
        data: any;
        isSuccess: boolean;
    };
    verifyGoogleAuth?: {
        mutate: (data: { code: string; state: string }, options: any) => void;
    };
    isLoading?: boolean;
    error?: string;
}

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
    | "reset-password";

const AuthSystem = ({
    onLogin,
    onSignup,
    onForgotPassword,
    onGoogleAuth,
    onNavigate,
    onSetCookie,
    generateGoogleAuth,
    verifyGoogleAuth,
    isLoading = false,
    error,
}: AuthSystemProps) => {
    const [currentView, setCurrentView] = useState<AuthView>("intro");
    const isMobile = useMediaQuery("(max-width: 640px)");

    const handleLogin = async (data: LoginFormData) => {
        if (onLogin) {
            await onLogin(data);
        }
    };

    const handleSignup = async (data: SignupFormData) => {
        if (onSignup) {
            await onSignup(data);
        }
    };

    const handleForgotPassword = async (data: ForgotPasswordFormData) => {
        if (onForgotPassword) {
            await onForgotPassword(data);
        }
    };

    const handleNavigate = (path: string) => {
        if (onNavigate) {
            onNavigate(path);
        }
    };

    const handleSetCookie = (key: string, value: string) => {
        if (onSetCookie) {
            onSetCookie(key, value);
        }
    };

    // Intro page with login/signup buttons
    if (currentView === "intro") {
        return (
            <div className="pam-flex pam-min-h-screen pam-items-center pam-justify-center pam-bg-gradient-to-br pam-from-blue-900 pam-via-purple-900 pam-to-indigo-900 pam-p-4">
                <div className="pam-max-w-md pam-text-center pam-text-white">
                    <h1 className="pam-mb-4 pam-text-4xl pam-font-bold">
                        Welcome to Pakt
                    </h1>
                    <p className="pam-mb-8 pam-text-lg pam-text-gray-300">
                        Connect with world-class builders and collaborate on
                        amazing projects
                    </p>
                    <div className="pam-space-y-4">
                        <button
                            onClick={() => setCurrentView("login-method")}
                            className="pam-w-full pam-rounded-lg pam-bg-white pam-px-6 pam-py-3 pam-font-semibold pam-text-blue-900 pam-transition-colors hover:pam-bg-gray-100"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setCurrentView("signup-method")}
                            className="pam-w-full pam-rounded-lg pam-border-2 pam-border-white pam-bg-transparent pam-px-6 pam-py-3 pam-font-semibold pam-text-white pam-transition-colors hover:pam-bg-white hover:pam-text-blue-900"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Mobile view - show full page components
    if (isMobile) {
        switch (currentView) {
            case "login-method":
                return (
                    <SigninMethod
                        onNavigate={handleNavigate}
                        onSetCookie={handleSetCookie}
                        generateGoogleAuth={
                            generateGoogleAuth ||
                            (() => ({ data: null, isSuccess: false }))
                        }
                        verifyGoogleAuth={
                            verifyGoogleAuth || { mutate: () => {} }
                        }
                    />
                );
            case "signup-method":
                return (
                    <SignupMethod
                        onNavigate={handleNavigate}
                        onSetCookie={handleSetCookie}
                        generateGoogleAuth={
                            generateGoogleAuth ||
                            (() => ({ data: null, isSuccess: false }))
                        }
                        verifyGoogleAuth={
                            verifyGoogleAuth || { mutate: () => {} }
                        }
                    />
                );
            case "login":
                return (
                    <div className="pam-flex pam-min-h-screen pam-items-center pam-justify-center pam-bg-gradient-to-br pam-from-blue-900 pam-via-purple-900 pam-to-indigo-900 pam-p-4">
                        <div className="pam-w-full pam-max-w-md">
                            <div className="pam-mb-6 pam-text-center pam-text-white">
                                <h2 className="pam-text-2xl pam-font-bold">
                                    Login to your account
                                </h2>
                                <p className="pam-text-gray-300">
                                    Collaborate with world-class builders
                                </p>
                            </div>
                            <div className="pam-rounded-lg pam-bg-white pam-p-6">
                                <LoginForm
                                    onSubmit={handleLogin}
                                    isLoading={isLoading}
                                    error={error}
                                    onForgotPassword={() =>
                                        setCurrentView("forgot-password")
                                    }
                                    onSignup={() => setCurrentView("signup")}
                                />
                            </div>
                        </div>
                    </div>
                );
            case "signup":
                return (
                    <div className="pam-flex pam-min-h-screen pam-items-center pam-justify-center pam-bg-gradient-to-br pam-from-blue-900 pam-via-purple-900 pam-to-indigo-900 pam-p-4">
                        <div className="pam-w-full pam-max-w-md">
                            <div className="pam-mb-6 pam-text-center pam-text-white">
                                <h2 className="pam-text-2xl pam-font-bold">
                                    Create Your Account
                                </h2>
                                <p className="pam-text-gray-300">
                                    Connect with world-class builders
                                </p>
                            </div>
                            <div className="pam-rounded-lg pam-bg-white pam-p-6">
                                <SignupForm
                                    onSubmit={handleSignup}
                                    isLoading={isLoading}
                                    error={error}
                                    onLogin={() => setCurrentView("login")}
                                />
                            </div>
                        </div>
                    </div>
                );
            case "verify-login":
                return (
                    <div className="pam-flex pam-min-h-screen pam-items-center pam-justify-center pam-bg-gradient-to-br pam-from-blue-900 pam-via-purple-900 pam-to-indigo-900 pam-p-4">
                        <div className="pam-w-full pam-max-w-md">
                            <div className="pam-mb-6 pam-text-center pam-text-white">
                                <h2 className="pam-text-2xl pam-font-bold">
                                    Verify Login
                                </h2>
                                <p className="pam-text-gray-300">
                                    Enter the verification code sent to your
                                    email
                                </p>
                            </div>
                            <div className="pam-rounded-lg pam-bg-white pam-p-6">
                                {/* VerifyLoginForm component would go here */}
                                <div className="pam-text-center pam-text-gray-600">
                                    Verify Login Form
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "verify-signup":
                return (
                    <div className="pam-flex pam-min-h-screen pam-items-center pam-justify-center pam-bg-gradient-to-br pam-from-blue-900 pam-via-purple-900 pam-to-indigo-900 pam-p-4">
                        <div className="pam-w-full pam-max-w-md">
                            <div className="pam-mb-6 pam-text-center pam-text-white">
                                <h2 className="pam-text-2xl pam-font-bold">
                                    Verify Your Email
                                </h2>
                                <p className="pam-text-gray-300">
                                    Enter the verification code sent to your
                                    email
                                </p>
                            </div>
                            <div className="pam-rounded-lg pam-bg-white pam-p-6">
                                {/* VerifySignupForm component would go here */}
                                <div className="pam-text-center pam-text-gray-600">
                                    Verify Signup Form
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "forgot-password":
                return (
                    <div className="pam-flex pam-min-h-screen pam-items-center pam-justify-center pam-bg-gradient-to-br pam-from-blue-900 pam-via-purple-900 pam-to-indigo-900 pam-p-4">
                        <div className="pam-w-full pam-max-w-md">
                            <div className="pam-mb-6 pam-text-center pam-text-white">
                                <h2 className="pam-text-2xl pam-font-bold">
                                    Forgot Password
                                </h2>
                                <p className="pam-text-gray-300">
                                    Enter your email to reset your password
                                </p>
                            </div>
                            <div className="pam-rounded-lg pam-bg-white pam-p-6">
                                {/* ForgotPasswordForm component would go here */}
                                <div className="pam-text-center pam-text-gray-600">
                                    Forgot Password Form
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "verify-email":
                return (
                    <div className="pam-flex pam-min-h-screen pam-items-center pam-justify-center pam-bg-gradient-to-br pam-from-blue-900 pam-via-purple-900 pam-to-indigo-900 pam-p-4">
                        <div className="pam-w-full pam-max-w-md">
                            <div className="pam-mb-6 pam-text-center pam-text-white">
                                <h2 className="pam-text-2xl pam-font-bold">
                                    Verify Email
                                </h2>
                                <p className="pam-text-gray-300">
                                    Enter the verification code sent to your
                                    email
                                </p>
                            </div>
                            <div className="pam-rounded-lg pam-bg-white pam-p-6">
                                {/* VerifyEmailForm component would go here */}
                                <div className="pam-text-center pam-text-gray-600">
                                    Verify Email Form
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "reset-password":
                return (
                    <div className="pam-flex pam-min-h-screen pam-items-center pam-justify-center pam-bg-gradient-to-br pam-from-blue-900 pam-via-purple-900 pam-to-indigo-900 pam-p-4">
                        <div className="pam-w-full pam-max-w-md">
                            <div className="pam-mb-6 pam-text-center pam-text-white">
                                <h2 className="pam-text-2xl pam-font-bold">
                                    Reset Password
                                </h2>
                                <p className="pam-text-gray-300">
                                    Enter your new password
                                </p>
                            </div>
                            <div className="pam-rounded-lg pam-bg-white pam-p-6">
                                {/* ResetPasswordForm component would go here */}
                                <div className="pam-text-center pam-text-gray-600">
                                    Reset Password Form
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    // Desktop view - show modals
    return (
        <div className="pam-flex pam-min-h-screen pam-items-center pam-justify-center pam-bg-gradient-to-br pam-from-blue-900 pam-via-purple-900 pam-to-indigo-900 pam-p-4">
            <div className="pam-max-w-md pam-text-center pam-text-white">
                <h1 className="pam-mb-4 pam-text-4xl pam-font-bold">
                    Welcome to Pakt
                </h1>
                <p className="pam-mb-8 pam-text-lg pam-text-gray-300">
                    Connect with world-class builders and collaborate on amazing
                    projects
                </p>
                <div className="pam-space-y-4">
                    <button
                        onClick={() => setCurrentView("login-method")}
                        className="pam-w-full pam-rounded-lg pam-bg-white pam-px-6 pam-py-3 pam-font-semibold pam-text-blue-900 pam-transition-colors hover:pam-bg-gray-100"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setCurrentView("signup-method")}
                        className="pam-w-full pam-rounded-lg pam-border-2 pam-border-white pam-bg-transparent pam-px-6 pam-py-3 pam-font-semibold pam-text-white pam-transition-colors hover:pam-bg-white hover:pam-text-blue-900"
                    >
                        Sign Up
                    </button>
                </div>
            </div>

            {/* Desktop Modals - Signup Flow */}
            <SignupMethodDialog
                isOpen={currentView === "signup-method"}
                onClose={() => setCurrentView("intro")}
                onEmailSignup={() => setCurrentView("signup")}
                onGoogleSignup={() => {
                    // Handle Google signup
                    console.log("Google signup");
                }}
            />

            <SignupDialog
                isOpen={currentView === "signup"}
                onClose={() => setCurrentView("signup-method")}
                onSubmit={handleSignup}
                isLoading={isLoading}
                error={error}
                onLogin={() => setCurrentView("login")}
            />

            <VerifySignUpDialog
                isOpen={currentView === "verify-signup"}
                onClose={() => setCurrentView("signup")}
                onVerify={(code: string) => {
                    // Handle verification
                    console.log("Verify signup:", code);
                }}
                onResend={() => {
                    // Handle resend
                    console.log("Resend verification");
                }}
            />

            {/* Desktop Modals - Login Flow */}
            <SigninMethodDialog
                isOpen={currentView === "login-method"}
                onClose={() => setCurrentView("intro")}
                onEmailLogin={() => setCurrentView("login")}
                onGoogleLogin={() => {
                    // Handle Google login
                    console.log("Google login");
                }}
            />

            <LoginDialog
                isOpen={currentView === "login"}
                onClose={() => setCurrentView("login-method")}
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
                onForgotPassword={() => setCurrentView("forgot-password")}
                onSignup={() => setCurrentView("signup")}
            />

            <VerifyLoginDialog
                isOpen={currentView === "verify-login"}
                onClose={() => setCurrentView("login")}
                onVerify={(code: string) => {
                    // Handle verification
                    console.log("Verify login:", code);
                }}
                onResend={() => {
                    // Handle resend
                    console.log("Resend verification");
                }}
            />

            {/* Desktop Modals - Forgot Password Flow */}
            <ForgotPasswordDialog
                isOpen={currentView === "forgot-password"}
                onClose={() => setCurrentView("login")}
                onSubmit={handleForgotPassword}
                isLoading={isLoading}
                error={error}
                onSuccess={() => setCurrentView("verify-email")}
            />

            <VerifyEmailDialog
                isOpen={currentView === "verify-email"}
                onClose={() => setCurrentView("forgot-password")}
                onVerify={(code: string) => {
                    // Handle verification
                    console.log("Verify email:", code);
                }}
                onResend={() => {
                    // Handle resend
                    console.log("Resend verification");
                }}
                onSuccess={() => setCurrentView("reset-password")}
            />

            <ResetPasswordDialog
                isOpen={currentView === "reset-password"}
                onClose={() => setCurrentView("verify-email")}
                onSubmit={(data: {
                    password: string;
                    confirmPassword: string;
                }) => {
                    // Handle password reset
                    console.log("Reset password:", data);
                }}
                isLoading={isLoading}
                error={error}
                onSuccess={() => setCurrentView("login")}
            />
        </div>
    );
};

export default AuthSystem;
