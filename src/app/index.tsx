/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { useState } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import Logger from "../lib/logger";
import { UserData } from "../components/pakt-auth/types";
import { PaktAuthProvider } from "../components/pakt-auth/provider";
import { usePaktAuth } from "../context/auth-context";

const AppContent = () => {
    const {
        user,
        isAuthenticated,
        token,
        loading,
        error,
        logout,
        openLogin,
        openSignup,
        clearError,
    } = usePaktAuth();

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            Logger.info("Logout successful");
        } catch (err) {
            Logger.error("Logout error:", {
                error: err instanceof Error ? err.message : String(err),
            });
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="pka:flex pka:min-h-screen pka:items-center pka:justify-center pka:bg-gradient-to-br pka:from-blue-900 pka:via-purple-900 pka:to-indigo-900 pka:p-4">
            <div className="pka:max-w-md pka:w-full pka:text-center pka:text-white">
                <h1 className="pka:mb-4 pka:text-4xl pka:font-bold">
                    Welcome to Pakt
                </h1>
                <p className="pka:mb-8 pka:text-lg pka:text-gray-300">
                    Connect with world-class builders and collaborate on amazing
                    projects
                </p>

                {error && (
                    <div className="pka:mb-4 pka:rounded-lg pka:bg-red-500/20 pka:border pka:border-red-500 pka:p-4">
                        <div className="pka:flex pka:items-center pka:justify-between">
                            <p className="pka:text-red-200">{error}</p>
                            <button
                                type="button"
                                onClick={clearError}
                                className="pka:text-red-300 pka:hover:text-red-100"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="pka:mb-4 pka:text-center pka:text-gray-300">
                        Loading...
                    </div>
                )}

                {isAuthenticated && user ? (
                    <div className="pka:rounded-lg pka:bg-white/10 pka:p-6 pka:backdrop-blur-sm">
                        <h2 className="pka:mb-4 pka:text-2xl pka:font-semibold">
                            User Profile
                        </h2>
                        <div className="pka:space-y-3 pka:text-left">
                            {"email" in user && (
                                <div>
                                    <span className="pka:font-semibold">
                                        Email:
                                    </span>{" "}
                                    <span className="pka:text-gray-200">
                                        {user.email}
                                    </span>
                                </div>
                            )}
                            {"firstName" in user && user.firstName && (
                                <div>
                                    <span className="pka:font-semibold">
                                        First Name:
                                    </span>{" "}
                                    <span className="pka:text-gray-200">
                                        {user.firstName}
                                    </span>
                                </div>
                            )}
                            {"lastName" in user && user.lastName && (
                                <div>
                                    <span className="pka:font-semibold">
                                        Last Name:
                                    </span>{" "}
                                    <span className="pka:text-gray-200">
                                        {user.lastName}
                                    </span>
                                </div>
                            )}
                            {"_id" in user && (
                                <div>
                                    <span className="pka:font-semibold">
                                        User ID:
                                    </span>{" "}
                                    <span className="pka:text-gray-200 pka:font-mono pka:text-sm">
                                        {user._id}
                                    </span>
                                </div>
                            )}
                            {"isVerified" in user && (
                                <div>
                                    <span className="pka:font-semibold">
                                        Verified:
                                    </span>{" "}
                                    <span className="pka:text-gray-200">
                                        {user.isVerified ? "Yes" : "No"}
                                    </span>
                                </div>
                            )}
                            {token && (
                                <div>
                                    <span className="pka:font-semibold">
                                        Token:
                                    </span>{" "}
                                    <span className="pka:text-gray-200 pka:font-mono pka:text-xs pka:break-all">
                                        {token.substring(0, 20)}...
                                    </span>
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={isLoggingOut || loading}
                            className="pka:mt-6 pka:w-full pka:rounded-lg pka:bg-red-600 pka:px-6 pka:py-3 pka:font-semibold pka:text-white pka:transition-colors pka:hover:bg-red-700 pka:disabled:opacity-50 pka:disabled:cursor-not-allowed"
                        >
                            {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>
                    </div>
                ) : (
                    <div className="pka:space-y-4">
                        <button
                            type="button"
                            onClick={openLogin}
                            disabled={loading}
                            className="pka:w-full pka:rounded-lg pka:bg-white pka:px-6 pka:py-3 pka:font-semibold pka:text-blue-900 pka:transition-colors pka:hover:bg-gray-100 pka:disabled:opacity-50"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={openSignup}
                            disabled={loading}
                            className="pka:w-full pka:rounded-lg pka:border-2 pka:border-white pka:bg-transparent pka:px-6 pka:py-3 pka:font-semibold pka:text-white pka:transition-colors pka:hover:bg-white pka:hover:text-blue-900 pka:disabled:opacity-50"
                        >
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const App = () => {
    const customConfig = {
        baseUrl: "https://api-devpaktbuild.chain.site",
        verbose: true,
        googleOAuth: {
            clientId:
                "583287786734-s8rrgm4ll9ltjm430a25vi6107dbiiib.apps.googleusercontent.com",
            redirectUri: "http://localhost:4234",
        },
        theme: {
            // Glassmorphism theme - transparent and works with any background
            brandPrimary: "rgba(255, 255, 255, 0.9)",
            brandSecondary: "rgba(255, 255, 255, 0.7)",
            inverseText: "rgba(255, 255, 255, 0.95)",
            headingText: "rgba(255, 255, 255, 0.95)",
            bodyText: "rgba(255, 255, 255, 0.85)",
            formBackground: "rgba(255, 255, 255, 0.1)", // Transparent glass effect
            modalOverlay: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark overlay
            buttonPrimaryBackground: "rgba(255, 255, 255, 0.2)",
            buttonPrimaryText: "rgba(255, 255, 255, 0.95)",
            buttonPrimaryHover: "rgba(255, 255, 255, 0.3)",
            buttonOutlineBackground: "transparent",
            buttonOutlineText: "rgba(255, 255, 255, 0.9)",
            buttonOutlineHoverBackground: "rgba(255, 255, 255, 0.15)",
            buttonOutlineHoverText: "rgba(255, 255, 255, 0.95)",
            buttonDisabledBackground: "rgba(128, 128, 128, 0.2)", // Toned-down grey at 20% opacity
            buttonDisabledText: "rgba(128, 128, 128, 0.5)",
            inputBackground: "rgba(255, 255, 255, 0.1)",
            inputBorder: "rgba(255, 255, 255, 0.2)",
            inputFocusBorder: "rgba(255, 255, 255, 0.4)",
            inputPlaceholder: "rgba(255, 255, 255, 0.5)",
            inputText: "rgba(255, 255, 255, 0.9)",
            inputLabel: "rgba(255, 255, 255, 0.85)",
            errorBackground: "rgba(239, 68, 68, 0.15)",
            errorText: "rgba(254, 202, 202, 1)",
            errorBorder: "rgba(239, 68, 68, 0.5)",
            successText: "rgba(134, 239, 172, 1)",
        },
    };

    return (
        <PaktAuthProvider
            config={customConfig}
            textConfig={{
                loginTitle: "Welcome Back",
                loginDescription: "Sign in to continue your journey",
                signupTitle: "Join Our Community",
                signupDescription: "Start building amazing things together",
            }}
            onLoginSuccess={(userData: UserData) => {
                Logger.info("Login success:", userData);
            }}
            onSignupSuccess={(userData: UserData) => {
                Logger.info("Signup success:", userData);
            }}
        >
            <AppContent />
        </PaktAuthProvider>
    );
};

export default App;
