/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { forwardRef, Ref, useImperativeHandle, useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { ConfigProvider } from "../../context/config-context";
// import MobileAuth from "../auth/mobile";
import DesktopAuth from "./desktop";
import { AuthRef, PaktAuthProps } from "./types";

const PaktAuth = forwardRef(
    (
        { config, onLoginSuccess, onSignupSuccess }: PaktAuthProps,
        ref: Ref<AuthRef>
    ) => {
        // const isMobile = useMediaQuery("(max-width: 640px)");
        const desktopAuthRef = useRef<AuthRef>(null);

        useImperativeHandle(ref, () => ({
            onLogin: () => {
                desktopAuthRef.current?.onLogin();
            },
            onSignup: () => {
                desktopAuthRef.current?.onSignup();
            },
        }));

        return (
            <ConfigProvider config={config}>
                {/* {isMobile ? <DesktopAuth /> : <DesktopAuth />} */}
                <DesktopAuth
                    ref={desktopAuthRef}
                    onLoginSuccess={onLoginSuccess}
                    onSignupSuccess={onSignupSuccess}
                />
            </ConfigProvider>
        );
    }
);

PaktAuth.displayName = "PaktAuth";

export default PaktAuth;
