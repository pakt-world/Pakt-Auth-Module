/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { memo } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../../common/headless-modal";
import PoweredByPakt from "../../../common/powered-by-pakt";
import ForgotPasswordForm from "../../forms/forgot-password-form";

interface ForgotPasswordDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { email: string }) => void;
    isLoading?: boolean;
    error?: string;
    onBackToLogin?: () => void;
}

const ForgotPasswordDialog = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    error,
    onBackToLogin,
}: ForgotPasswordDialogProps): JSX.Element => {
    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose} disableClickOutside>
            <div className="pam-z-[2] pam-flex pam-size-full pam-flex-col pam-items-center pam-justify-center pam-gap-6">
                <div className="pam-flex pam-flex-col pam-items-center pam-gap-2 pam-text-center pam-text-white">
                    <h3 className="pam-font-sans pam-text-2xl pam-font-bold sm:pam-text-3xl">
                        Forgot Password
                    </h3>
                    <p className="pam-font-sans pam-text-base pam-leading-normal pam-tracking-tight">
                        Enter the email you used to create your account so we
                        can send you instructions on how to reset your password.
                    </p>
                </div>
                <ForgotPasswordForm
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    error={error}
                    onBackToLogin={onBackToLogin}
                />
                <div className="pam-flex pam-w-full pam-items-center pam-justify-end">
                    <PoweredByPakt className="!pam-text-white" />
                </div>
            </div>
        </HeadlessModal>
    );
};

export default memo(ForgotPasswordDialog);
