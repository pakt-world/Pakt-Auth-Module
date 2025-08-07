/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { memo } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../common/headless-modal";
import PoweredByPakt from "../../common/powered-by-pakt";
import VerifySignupForm from "../forms/verify-signup-form";

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
            <div className="pka:z-[2] pka:flex pka:size-full pka:flex-col pka:items-center pka:justify-center pka:gap-6 pka:sm:mx-auto">
                <div className="pka:flex pka:flex-col pka:items-center pka:gap-2 pka:text-center">
                    <h3 className="pka:font-sans pka:text-2xl pka:font-bold pka:sm:text-3xl pka:text-white">
                        Verify Email
                    </h3>
                    <p className="pka:font-sans pka:text-base pka:text-body pka:text-white">
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
                <div className="pka:flex pka:w-full pka:items-center pka:justify-end">
                    <PoweredByPakt className="!pka:text-white" />
                </div>
            </div>
        </HeadlessModal>
    );
};

export default memo(VerifySignUpDialog);
