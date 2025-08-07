/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { memo } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../common/headless-modal";
import PoweredByPakt from "../../common/powered-by-pakt";
import SignUpForm from "../forms/signup-form";
import { AuthTextConfig } from "../../pakt-auth/types";

interface SignupDialogProps {
    isOpen: boolean;
    onClose: () => void;
    textConfig?: AuthTextConfig;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
    error?: string;
    backToSignupMethod?: () => void;
    goToLoginMethod?: () => void;
}

const SignupDialog = ({
    isOpen,
    onClose,
    textConfig,
    onSubmit,
    isLoading,
    error,
    backToSignupMethod,
    goToLoginMethod,
}: SignupDialogProps): JSX.Element => {
    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose}>
            <div className="pka:size-full pka:gap-6 pka:z-[2] pka:flex pka:flex-col pka:items-center pka:justify-center">
                <div className="pka:gap-2 pka:text-white pka:flex pka:flex-col pka:items-center pka:text-center">
                    <h3 className="pka:font-sans pka:text-2xl pka:font-bold pka:sm:text-3xl">
                        {textConfig?.signupTitle || "Create Your Account"}
                    </h3>
                    <p className="pka:font-sans pka:text-base pka:leading-normal pka:tracking-tight">
                        {textConfig?.signupDescription ||
                            "Connect with world-class builders"}
                    </p>
                </div>
                <SignUpForm
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    error={error}
                    backToSignupMethod={backToSignupMethod}
                    goToLoginMethod={goToLoginMethod}
                />
                <div className="pka:flex pka:w-full pka:items-center pka:justify-end">
                    <PoweredByPakt className="!pka:text-white" />
                </div>
            </div>
        </HeadlessModal>
    );
};

export default memo(SignupDialog);
