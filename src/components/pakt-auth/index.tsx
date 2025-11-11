/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { forwardRef, Ref, useImperativeHandle, useState } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { ConfigProvider } from "../../context/config-context";
import AuthSystem from "./auth-system";
import { AuthRef, PaktAuthProps } from "./types";
import "../../styles/index.css";

/**
 * @deprecated Use PaktAuthProvider instead for context-based access.
 * This component is kept for backward compatibility.
 */
const PaktAuth = forwardRef(
    (
        { config, textConfig, onLoginSuccess, onSignupSuccess }: PaktAuthProps,
        ref: Ref<AuthRef>
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const [view, setView] = useState<"login" | "signup" | null>(null);

        useImperativeHandle(ref, () => ({
            onLogin: () => {
                setView("login");
                setIsOpen(true);
            },
            onSignup: () => {
                setView("signup");
                setIsOpen(true);
            },
        }));

        return (
            <div className="pakt-auth-module">
                <ConfigProvider config={config}>
                    {isOpen && (
                        <AuthSystem
                            textConfig={textConfig}
                            initialView={view || undefined}
                            onLoginSuccess={(userData) => {
                                onLoginSuccess?.(userData);
                                setIsOpen(false);
                                setView(null);
                            }}
                            onSignupSuccess={(userData) => {
                                onSignupSuccess?.(userData);
                                setIsOpen(false);
                                setView(null);
                            }}
                            onClose={() => {
                                setIsOpen(false);
                                setView(null);
                            }}
                        />
                    )}
                </ConfigProvider>
            </div>
        );
    }
);

PaktAuth.displayName = "PaktAuth";

export default PaktAuth;
