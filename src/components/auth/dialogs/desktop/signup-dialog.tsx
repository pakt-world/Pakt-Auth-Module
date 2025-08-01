/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { memo } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../../common/headless-modal";
import PoweredByPakt from "../../../common/powered-by-pakt";
import Signup from "../../forms/signup-form-wrapper";

interface SignupDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
    error?: string;
    backToSignupMethod?: () => void;
}

const SignupDialog = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    error,
    backToSignupMethod,
}: SignupDialogProps): JSX.Element => {
    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose}>
            <div className="pam-z-[2] pam-flex pam-size-full pam-flex-col pam-items-center pam-justify-center pam-gap-6">
                <Signup
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    error={error}
                    backToSignupMethod={backToSignupMethod}
                />
                <div className="pam-flex pam-w-full pam-items-center pam-justify-end">
                    <PoweredByPakt className="!pam-text-white" />
                </div>
            </div>
        </HeadlessModal>
    );
};

export default memo(SignupDialog);
