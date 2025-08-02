/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { memo } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../../common/headless-modal";
import PoweredByPakt from "../../../common/powered-by-pakt";
import SignUpForm from "../../forms/signup-form";

interface SignupDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
    error?: string;
    backToSignupMethod?: () => void;
    goToLoginMethod?: () => void;
}

const SignupDialog = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    error,
    backToSignupMethod,
    goToLoginMethod,
}: SignupDialogProps): JSX.Element => {
    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose} disableClickOutside>
            <div className="pam-z-[2] pam-flex pam-size-full pam-flex-col pam-items-center pam-justify-center pam-gap-6">
                <div className="pam-flex pam-flex-col pam-items-center pam-gap-2 pam-text-center pam-text-white">
                    <h3 className="pam-font-sans pam-text-2xl pam-font-bold sm:pam-text-3xl">
                        Create Your Account
                    </h3>
                    <p className="pam-font-sans pam-text-base pam-leading-normal pam-tracking-tight">
                        Connect with world-class builders
                    </p>
                </div>
                <SignUpForm
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    error={error}
                    backToSignupMethod={backToSignupMethod}
                    goToLoginMethod={goToLoginMethod}
                />
                <div className="pam-flex pam-w-full pam-items-center pam-justify-end">
                    <PoweredByPakt className="!pam-text-white" />
                </div>
            </div>
        </HeadlessModal>
    );
};

export default memo(SignupDialog);
