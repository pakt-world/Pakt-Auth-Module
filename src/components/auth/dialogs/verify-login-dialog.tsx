/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { memo } from "react";
import { IUserTwoFaType } from "pakt-sdk";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../common/headless-modal";
import PoweredByPakt from "../../common/powered-by-pakt";
import VerifyLoginForm from "../forms/verify-login-form";

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
    type?: IUserTwoFaType | null;
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
    type = null,
}: VerifyLoginDialogProps): JSX.Element => {
    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose} disableClickOutside>
            <div className="pka:z-[2] pka:flex pka:size-full pka:flex-col pka:items-center pka:justify-center pka:gap-6">
                <div className="pka:flex pka:flex-col pka:items-center pka:gap-2 pka:text-center">
                    <h3 className="pka:font-sans pka:text-2xl pka:font-bold pka:text-white pka:sm:text-3xl">
                        2FA Security
                    </h3>
                    <p className="pka:font-sans pka:text-base pka:leading-normal pka:tracking-tight pka:text-body pka:text-white">
                        {type === "google_auth"
                            ? "Enter the OTP from your authenticator app"
                            : "Enter the code that was sent to"}
                        {type === "email" && (
                            <span className="pka:ml-1 pka:text-green-400">
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
                <div className="pka:flex pka:w-full pka:items-center pka:justify-end">
                    <PoweredByPakt className="!pka:text-white" />
                </div>
            </div>
        </HeadlessModal>
    );
};

export default memo(VerifyLoginDialog);
