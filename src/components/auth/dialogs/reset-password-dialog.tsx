/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { memo } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../common/headless-modal";
import PoweredByPakt from "../../common/powered-by-pakt";
import ResetPasswordForm from "../forms/reset-password-form";

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
            <div className="pka-z-[2] pka-flex pka-size-full pka-flex-col pka-items-center pka-justify-center pka-gap-6">
                <ResetPasswordForm
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    error={error}
                    onSuccess={onSuccess}
                    isSuccess={isSuccess}
                />
                <div className="pka-flex pka-w-full pka-items-center pka-justify-end">
                    <PoweredByPakt className="!pka-text-white" />
                </div>
            </div>
        </HeadlessModal>
    );
};

export default memo(ResetPasswordDialog);
