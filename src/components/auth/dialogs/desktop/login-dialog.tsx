/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { memo } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import LoginForm from "../../forms/login-form";
import { HeadlessModal } from "../../../common/headless-modal";
import PoweredByPakt from "../../../common/powered-by-pakt";

interface LoginDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
    error?: string;
    onForgotPassword?: () => void;
    onSignup?: () => void;
    backToLoginMethod?: () => void;
}

const LoginDialog = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    error,
    onForgotPassword,
    onSignup,
    backToLoginMethod,
}: LoginDialogProps): JSX.Element => {
    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose} disableClickOutside>
            <div className="pam-z-[2] pam-flex pam-size-full pam-flex-col pam-items-center pam-justify-center pam-gap-6">
                <div className="pam-flex pam-flex-col pam-items-center pam-gap-2 pam-text-center pam-text-white">
                    <h3 className="pam-font-sans pam-text-2xl pam-font-bold sm:pam-text-3xl">
                        Login to your account
                    </h3>
                    <p className="pam-font-sans pam-text-base pam-leading-normal pam-tracking-tight">
                        Collaborate with world-class builders
                    </p>
                </div>
                <LoginForm
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    error={error}
                    onForgotPassword={onForgotPassword}
                    onSignup={onSignup}
                    backToLoginMethod={backToLoginMethod}
                />
                <div className="pam-flex pam-w-full pam-items-center pam-justify-end">
                    <PoweredByPakt className="!pam-text-white" />
                </div>
            </div>
        </HeadlessModal>
    );
};

export default memo(LoginDialog);
