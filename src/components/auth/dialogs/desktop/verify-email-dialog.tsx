/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { memo } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../../common/headless-modal";
import PoweredByPakt from "../../../common/powered-by-pakt";
import VerifyEmailForm from "../../forms/verify-email-form";

interface VerifyEmailDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify: (data: { otp: string }) => void;
    onResend: () => void;
    isLoading?: boolean;
    resendLoading?: boolean;
    email?: string;
}

const VerifyEmailDialog = ({
    isOpen,
    onClose,
    onVerify,
    onResend,
    isLoading = false,
    resendLoading = false,
    email,
}: VerifyEmailDialogProps): JSX.Element => {
    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose} disableClickOutside>
            <div className="pka-z-[2] pka-flex pka-size-full pka-flex-col pka-items-center pka-justify-center pka-gap-6">
                <VerifyEmailForm
                    onSubmit={onVerify}
                    onResend={onResend}
                    isLoading={isLoading}
                    resendLoading={resendLoading}
                    email={email}
                />
                <div className="pka-flex pka-w-full pka-items-center pka-justify-end">
                    <PoweredByPakt className="!pka-text-white" />
                </div>
            </div>
        </HeadlessModal>
    );
};

export default memo(VerifyEmailDialog);
