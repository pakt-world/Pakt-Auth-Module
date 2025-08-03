/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { memo } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import LoginForm from "../forms/login-form";
import { HeadlessModal } from "../../common/headless-modal";
import PoweredByPakt from "../../common/powered-by-pakt";

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
            <div className="pka-z-[2] pka-flex pka-size-full pka-flex-col pka-items-center pka-justify-center pka-gap-6">
                <div className="pka-flex pka-flex-col pka-items-center pka-gap-2 pka-text-center pka-text-white">
                    <h3 className="pka-font-sans pka-text-2xl pka-font-bold sm:pka-text-3xl">
                        Login to your account
                    </h3>
                    <p className="pka-font-sans pka-text-base pka-leading-normal pka-tracking-tight">
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
                <div className="pka-flex pka-w-full pka-items-center pka-justify-end">
                    <PoweredByPakt className="!pka-text-white" />
                </div>
            </div>
        </HeadlessModal>
    );
};

export default memo(LoginDialog);
