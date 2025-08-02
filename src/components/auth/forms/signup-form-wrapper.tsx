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
            <div className="pam-flex pam-size-full pam-flex-col pam-items-center pam-justify-center pam-gap-6"></div>
        </div>
    );
}
