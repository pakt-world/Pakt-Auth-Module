/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { memo } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../common/headless-modal";
import PoweredByPakt from "../../common/powered-by-pakt";
import ForgotPasswordForm from "../forms/forgot-password-form";

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
            <div className="pka:z-[2] pka:flex pka:size-full pka:flex-col pka:items-center pka:justify-center pka:gap-6">
                <div className="pka:flex pka:flex-col pka:items-center pka:gap-2 pka:text-center pka:text-white">
                    <h3 className="pka:font-sans pka:text-2xl pka:font-bold sm:pka:text-3xl">
                        Forgot Password
                    </h3>
                    <p className="pka:font-sans pka:text-base pka:leading-normal pka:tracking-tight">
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
                <div className="pka:flex pka:w-full pka:items-center pka:justify-end">
                    <PoweredByPakt className="!pka:text-white" />
                </div>
            </div>
        </HeadlessModal>
    );
};

export default memo(ForgotPasswordDialog);
