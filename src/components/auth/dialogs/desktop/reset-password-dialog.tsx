/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { memo } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../../common/headless-modal";
import PoweredByPakt from "../../../common/powered-by-pakt";
import ResetPasswordForm from "../../forms/reset-password-form";

interface ResetPasswordDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { password: string; confirmPassword: string }) => void;
    isLoading?: boolean;
    error?: string;
    onSuccess?: () => void;
    isSuccess?: boolean;
}

const ResetPasswordDialog = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    error,
    onSuccess,
    isSuccess,
}: ResetPasswordDialogProps): JSX.Element => {
    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose} disableClickOutside>
            <div className="pam-z-[2] pam-flex pam-size-full pam-flex-col pam-items-center pam-justify-center pam-gap-6">
                <ResetPasswordForm
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    error={error}
                    onSuccess={onSuccess}
                    isSuccess={isSuccess}
                />
                <div className="pam-flex pam-w-full pam-items-center pam-justify-end">
                    <PoweredByPakt className="!pam-text-white" />
                </div>
            </div>
        </HeadlessModal>
    );
};

export default memo(ResetPasswordDialog);
