/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { useState, useCallback, useMemo, ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { ConfigProvider } from "../../context/config-context";
import { AuthContext, AuthContextType } from "../../context/auth-context";
import { usePaktAuthInternal } from "../../hooks/use-pakt-auth";
import AuthSystem from "./auth-system";
import { AuthTextConfig, UserData } from "./types";
import { ConfigContextType } from "../../types";
import "../../styles/index.css";

interface PaktAuthProviderProps {
    config: ConfigContextType;
    textConfig?: AuthTextConfig;
    children: ReactNode;
    onLoginSuccess?: (userData: UserData) => void;
    onSignupSuccess?: (userData: UserData) => void;
}

export const PaktAuthProvider = ({
    config,
    textConfig,
    children,
    onLoginSuccess,
    onSignupSuccess,
}: PaktAuthProviderProps) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [currentAuthView, setCurrentAuthView] = useState<
        "login" | "signup" | null
    >(null);

    // Get all auth functionality from hook
    const authHook = usePaktAuthInternal();

    // Modal controls
    const openLogin = useCallback(() => {
        setCurrentAuthView("login");
        setIsAuthModalOpen(true);
    }, []);

    const openSignup = useCallback(() => {
        setCurrentAuthView("signup");
        setIsAuthModalOpen(true);
    }, []);

    const closeAuth = useCallback(() => {
        setIsAuthModalOpen(false);
        setCurrentAuthView(null);
    }, []);

    // Handle login success
    const handleLoginSuccess = useCallback(
        (userData: UserData) => {
            onLoginSuccess?.(userData);
            closeAuth();
        },
        [onLoginSuccess, closeAuth]
    );

    // Handle signup success
    const handleSignupSuccess = useCallback(
        (userData: UserData) => {
            onSignupSuccess?.(userData);
            closeAuth();
        },
        [onSignupSuccess, closeAuth]
    );

    const contextValue: AuthContextType = useMemo(
        () => ({
            // State from hook
            user: authHook.user,
            loading: authHook.loading,
            error: authHook.error,
            isAuthenticated: authHook.isAuthenticated,
            token: authHook.token,

            // Modal controls
            openLogin,
            openSignup,
            closeAuth,

            // Auth methods from hook
            login: authHook.login,
            loginTwoFa: authHook.loginTwoFa,
            register: authHook.register,
            verifyAccount: authHook.verifyAccount,
            resendVerifyLink: authHook.resendVerifyLink,
            resetPassword: authHook.resetPassword,
            changePassword: authHook.changePassword,
            validatePasswordToken: authHook.validatePasswordToken,
            validateReferral: authHook.validateReferral,
            googleOAuthGenerateState: authHook.googleOAuthGenerateState,
            googleOAuthValidateState: authHook.googleOAuthValidateState,
            getAccount: authHook.getAccount,
            logout: authHook.logout,
            resendTwoFAEmailCode: authHook.resendTwoFAEmailCode,

            // Utility methods
            clearError: authHook.clearError,
            clearUser: authHook.clearUser,
        }),
        [
            authHook.user,
            authHook.loading,
            authHook.error,
            authHook.isAuthenticated,
            authHook.token,
            openLogin,
            openSignup,
            closeAuth,
            authHook.login,
            authHook.loginTwoFa,
            authHook.register,
            authHook.verifyAccount,
            authHook.resendVerifyLink,
            authHook.resetPassword,
            authHook.changePassword,
            authHook.validatePasswordToken,
            authHook.validateReferral,
            authHook.googleOAuthGenerateState,
            authHook.googleOAuthValidateState,
            authHook.getAccount,
            authHook.logout,
            authHook.resendTwoFAEmailCode,
            authHook.clearError,
            authHook.clearUser,
        ]
    );

    return (
        <ConfigProvider config={config}>
            <AuthContext.Provider value={contextValue}>
                {children}
                {isAuthModalOpen && (
                    <AuthSystem
                        textConfig={textConfig}
                        initialView={currentAuthView || undefined}
                        onLoginSuccess={handleLoginSuccess}
                        onSignupSuccess={handleSignupSuccess}
                        onClose={closeAuth}
                    />
                )}
            </AuthContext.Provider>
        </ConfigProvider>
    );
};
