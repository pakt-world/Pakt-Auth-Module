/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { ReactElement } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../common/headless-modal";
import { SigninMethod } from "../methods/signin-method";

interface SigninMethodDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onEmailLogin: () => void;
    onGoogleLogin: () => void;
    goToSignupMethod: () => void;
}

const SigninMethodDialog = ({
    isOpen,
    onClose,
    onEmailLogin,
    onGoogleLogin,
    goToSignupMethod,
}: SigninMethodDialogProps) => {
    const onNavigate = (path: string) => {
        console.log("onNavigate", path);
    };

    const onSetCookie = (key: string, value: string) => {
        document.cookie = `${key}=${value}; path=/`;
    };

    const generateGoogleAuth = (options: { enable: boolean }) => {
        console.log("generateGoogleAuth", options);
        return {
            data: {},
            isSuccess: true,
        };
    };

    const verifyGoogleAuth = {
        mutate: (data: { code: string; state: string }) => {
            console.log("verifyGoogleAuth", data);
        },
    };

    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose}>
            <SigninMethod
                onEmailLogin={onEmailLogin}
                onNavigate={onNavigate}
                onSetCookie={onSetCookie}
                generateGoogleAuth={generateGoogleAuth}
                verifyGoogleAuth={verifyGoogleAuth}
                goToSignupMethod={goToSignupMethod}
            />
        </HeadlessModal>
    );
};

export default SigninMethodDialog;
