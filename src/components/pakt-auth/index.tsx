/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { forwardRef, Ref, useImperativeHandle, useRef } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { ConfigProvider } from "../../context/config-context";
import AuthSystem from "./auth-system";
import { AuthRef, PaktAuthProps } from "./types";
import "../../styles/index.css";

const PaktAuth = forwardRef(
    (
        { config, onLoginSuccess, onSignupSuccess }: PaktAuthProps,
        ref: Ref<AuthRef>
    ) => {
        const authSystemRef = useRef<AuthRef>(null);

        useImperativeHandle(ref, () => ({
            onLogin: () => {
                authSystemRef.current?.onLogin();
            },
            onSignup: () => {
                authSystemRef.current?.onSignup();
            },
        }));

        return (
            <div className="pakt-auth-module">
                <ConfigProvider config={config}>
                    <AuthSystem
                        ref={authSystemRef}
                        onLoginSuccess={onLoginSuccess}
                        onSignupSuccess={onSignupSuccess}
                    />
                </ConfigProvider>
            </div>
        );
    }
);

PaktAuth.displayName = "PaktAuth";

export default PaktAuth;
