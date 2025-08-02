/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { memo } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../../common/headless-modal";
import PoweredByPakt from "../../../common/powered-by-pakt";
import VerifyLoginForm from "../../forms/verify-login-form";

interface VerifyLoginDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify: (data: { otp: string }) => void;
    onResend: () => void;
    isLoading?: boolean;
    resendLoading?: boolean;
    email?: string;
    isSuccess?: boolean;
    onSuccess?: () => void;
    type?: "authenticator" | "email";
}

const VerifyLoginDialog = ({
    isOpen,
    onClose,
    onVerify,
    onResend,
    isLoading = false,
    resendLoading = false,
    email,
    isSuccess = false,
    onSuccess,
    type = "email",
}: VerifyLoginDialogProps): JSX.Element => {
    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose} disableClickOutside>
            <div className="pam-z-[2] pam-flex pam-size-full pam-flex-col pam-items-center pam-justify-center pam-gap-6">
                <div className="pam-flex pam-flex-col pam-items-center pam-gap-2 pam-text-center">
                    <h3 className="pam-font-sans pam-text-2xl pam-font-bold pam-text-title sm:pam-text-3xl sm:pam-text-white">
                        2FA Security
                    </h3>
                    <p className="pam-font-sans pam-text-base pam-leading-normal pam-tracking-tight pam-text-body sm:pam-text-white">
                        {type === "authenticator"
                            ? "Enter the OTP from your authenticator app"
                            : "Enter the code that was sent to"}
                        {type === "email" && (
                            <span className="pam-ml-1 pam-text-green-400">
                                {email}
                            </span>
                        )}
                    </p>
                </div>
                <VerifyLoginForm
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

export default memo(VerifyLoginDialog);
