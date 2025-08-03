/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { ReactElement } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../common/headless-modal";
import { SignupMethod } from "../methods/signup-method";

interface SignupMethodDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onEmailSignup: () => void;
    goToLoginMethod: () => void;
    onGoogleSignupSuccess?: (userData: any) => void;
    onGoogleSignupError?: (error: string) => void;
}

const SignupMethodDialog = ({
    isOpen,
    onClose,
    onEmailSignup,
    goToLoginMethod,
    onGoogleSignupSuccess,
    onGoogleSignupError,
}: SignupMethodDialogProps) => {
    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose}>
            <SignupMethod
                onEmailSignup={onEmailSignup}
                goToLoginMethod={goToLoginMethod}
                onGoogleSignupSuccess={onGoogleSignupSuccess}
                onGoogleSignupError={onGoogleSignupError}
            />
        </HeadlessModal>
    );
};

export default SignupMethodDialog;
