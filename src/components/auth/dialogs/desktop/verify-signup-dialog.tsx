/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { memo } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../../common/headless-modal";
import PoweredByPakt from "../../../common/powered-by-pakt";
import VerifySignupForm from "../../forms/verify-signup-form";

interface VerifySignUpDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify: (data: { otp: string }) => void;
    onResend: () => void;
    isLoading?: boolean;
    resendLoading?: boolean;
    email?: string;
    isSuccess?: boolean;
    onSuccess?: () => void;
}

const VerifySignUpDialog = ({
    isOpen,
    onClose,
    onVerify,
    onResend,
    isLoading = false,
    resendLoading = false,
    email,
    isSuccess = false,
    onSuccess,
}: VerifySignUpDialogProps): JSX.Element => {
    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose} disableClickOutside>
            <div className="pam-z-[2] pam-flex pam-size-full pam-flex-col pam-items-center pam-justify-center pam-gap-6 sm:pam-mx-auto">
                <div className="pam-flex pam-flex-col pam-items-center pam-gap-2 pam-text-center">
                    <h3 className="pam-font-sans pam-text-2xl pam-font-bold pam-text-title sm:pam-text-3xl sm:pam-text-white">
                        Verify Email
                    </h3>
                    <p className="pam-font-sans pam-text-base pam-text-body sm:pam-text-white">
                        A code has been sent to your email address.
                        <br /> Enter it to verify your email.
                    </p>
                </div>
                <VerifySignupForm
                    onSubmit={onVerify}
                    onResend={onResend}
                    isLoading={isLoading}
                    resendLoading={resendLoading}
                    email={email}
                    isSuccess={isSuccess}
                    onSuccess={onSuccess}
                />
                <div className="pam-flex pam-w-full pam-items-center pam-justify-end">
                    <PoweredByPakt className="!pam-text-white" />
                </div>
            </div>
        </HeadlessModal>
    );
};

export default memo(VerifySignUpDialog);
