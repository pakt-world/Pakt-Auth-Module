/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { ReactElement } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../../common/headless-modal";
import { SignupMethod } from "../../methods/signup-method";

interface SignupMethodDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onEmailSignup: () => void;
    onGoogleSignup: () => void;
    goToLoginMethod: () => void;
}

const SignupMethodDialog = ({
    isOpen,
    onClose,
    onEmailSignup,
    onGoogleSignup,
    goToLoginMethod,
}: SignupMethodDialogProps) => {
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

    const onNavigate = (path: string) => {
        console.log("onNavigate", path);
    };

    const onSetCookie = (key: string, value: string) => {
        document.cookie = `${key}=${value}; path=/`;
    };

    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose}>
            <SignupMethod
                onEmailSignup={onEmailSignup}
                onNavigate={onNavigate}
                onSetCookie={onSetCookie}
                generateGoogleAuth={generateGoogleAuth}
                verifyGoogleAuth={verifyGoogleAuth}
                goToLoginMethod={goToLoginMethod}
            />
        </HeadlessModal>
    );
};

export default SignupMethodDialog;
