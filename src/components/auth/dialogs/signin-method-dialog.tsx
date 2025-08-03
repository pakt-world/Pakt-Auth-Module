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
    onGoogleLoginSuccess?: (userData: any) => void;
    onGoogleLoginError?: (error: string) => void;
}

const SigninMethodDialog = ({
    isOpen,
    onClose,
    onEmailLogin,
    onGoogleLogin,
    goToSignupMethod,
    onGoogleLoginSuccess,
    onGoogleLoginError,
}: SigninMethodDialogProps) => {
    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose}>
            <SigninMethod
                onEmailLogin={onEmailLogin}
                goToSignupMethod={goToSignupMethod}
                onGoogleLoginSuccess={onGoogleLoginSuccess}
                onGoogleLoginError={onGoogleLoginError}
            />
        </HeadlessModal>
    );
};

export default SigninMethodDialog;
