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
        <div className="pka:z-[2] pka:flex pka:w-full pka:items-center sm:pka:mx-auto sm:pka:size-full">
            <div className="pka:flex pka:size-full pka:flex-col pka:items-center pka:justify-center pka:gap-6"></div>
        </div>
    );
}
