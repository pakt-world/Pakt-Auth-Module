/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import SignUpForm from "./signup-form";

interface SignupPageProps {
    onSubmit: (data: any) => void;
    isLoading?: boolean;
    error?: string;
    backToSignupMethod?: () => void;
}

export default function SignupPage({
    onSubmit,
    isLoading,
    error,
    backToSignupMethod,
}: SignupPageProps): JSX.Element {
    return (
        <div className="pam-sm:mx-auto pam-sm:size-full pam-z-[2] pam-flex pam-w-full pam-items-center">
            <div className="pam-flex pam-size-full pam-flex-col pam-items-center pam-justify-center pam-gap-6">
                <div className="pam-flex pam-flex-col pam-items-center pam-gap-2 pam-text-center">
                    <h3 className="pam-sm:text-3xl pam-sm:text-white pam-font-sans pam-text-2xl pam-font-bold pam-text-title">
                        Create Your Account
                    </h3>
                    <p className="pam-sm:text-white pam-w-[392px] pam-text-center pam-text-base pam-font-medium pam-leading-normal pam-tracking-tight pam-text-body">
                        Connect with world-class builders
                    </p>
                </div>
                <SignUpForm
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    error={error}
                    backToSignupMethod={backToSignupMethod}
                />
            </div>
        </div>
    );
}
