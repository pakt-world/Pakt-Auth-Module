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
            <ConfigProvider config={config}>
                <AuthSystem
                    ref={authSystemRef}
                    onLoginSuccess={onLoginSuccess}
                    onSignupSuccess={onSignupSuccess}
                />
            </ConfigProvider>
        );
    }
);

PaktAuth.displayName = "PaktAuth";

export default PaktAuth;
