/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { ReactElement } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../common/headless-modal";
import { SignupMethod } from "../methods/signup-method";
import { AuthTextConfig, UserData } from "../../pakt-auth/types";

interface SignupMethodDialogProps {
    isOpen: boolean;
    onClose: () => void;
    textConfig?: AuthTextConfig;
    onEmailSignup: () => void;
    goToLoginMethod: () => void;
    onGoogleSignupSuccess?: (userData: UserData) => void;
    onGoogleSignupError?: (error: string) => void;
}

const SignupMethodDialog = ({
    isOpen,
    onClose,
    textConfig,
    onEmailSignup,
    goToLoginMethod,
    onGoogleSignupSuccess,
    onGoogleSignupError,
}: SignupMethodDialogProps) => {
    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose}>
            <SignupMethod
                textConfig={textConfig}
                onEmailSignup={onEmailSignup}
                goToLoginMethod={goToLoginMethod}
                onGoogleSignupSuccess={onGoogleSignupSuccess}
                onGoogleSignupError={onGoogleSignupError}
            />
        </HeadlessModal>
    );
};

export default SignupMethodDialog;
