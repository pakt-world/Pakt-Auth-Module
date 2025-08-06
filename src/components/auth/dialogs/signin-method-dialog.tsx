/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { ReactElement } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../common/headless-modal";
import { SigninMethod } from "../methods/signin-method";
import { AuthTextConfig, UserData } from "../../pakt-auth/types";

interface SigninMethodDialogProps {
    isOpen: boolean;
    onClose: () => void;
    textConfig?: AuthTextConfig;
    onEmailLogin: () => void;
    onGoogleLogin: () => void;
    goToSignupMethod: () => void;
    onGoogleLoginSuccess?: (userData: UserData) => void;
    onGoogleLoginError?: (error: string) => void;
}

const SigninMethodDialog = ({
    isOpen,
    onClose,
    textConfig,
    onEmailLogin,
    onGoogleLogin,
    goToSignupMethod,
    onGoogleLoginSuccess,
    onGoogleLoginError,
}: SigninMethodDialogProps) => {
    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose}>
            <SigninMethod
                textConfig={textConfig}
                onEmailLogin={onEmailLogin}
                goToSignupMethod={goToSignupMethod}
                onGoogleLoginSuccess={onGoogleLoginSuccess}
                onGoogleLoginError={onGoogleLoginError}
            />
        </HeadlessModal>
    );
};

export default SigninMethodDialog;
