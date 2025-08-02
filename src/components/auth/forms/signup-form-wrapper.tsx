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
        <div className="pam-z-[2] pam-flex pam-w-full pam-items-center sm:pam-mx-auto sm:pam-size-full">
            <div className="pam-flex pam-size-full pam-flex-col pam-items-center pam-justify-center pam-gap-6"></div>
        </div>
    );
}
