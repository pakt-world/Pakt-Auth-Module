/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import PoweredByPakt from "../../common/powered-by-pakt";
import { AuthMethod } from "./auth-method";
import { useGoogleAuth } from "../../../hooks/use-google-auth";

interface SigninMethodProps {
    onEmailLogin: () => void;
    goToSignupMethod: () => void;
    onGoogleLoginSuccess?: (userData: any) => void;
    onGoogleLoginError?: (error: string) => void;
}

export const SigninMethod = ({
    onEmailLogin,
    goToSignupMethod,
    onGoogleLoginSuccess,
    onGoogleLoginError,
}: SigninMethodProps): JSX.Element => {
    const { signIn } = useGoogleAuth({
        onSuccess: onGoogleLoginSuccess,
        onError: onGoogleLoginError,
    });

    return (
        <div className="pka-z-[2] pka-flex pka-size-full pka-flex-col pka-items-center pka-justify-center pka-gap-6">
            <AuthMethod
                title="Login to your account"
                description="Collaborate with world-class builders"
                instruction="Choose Log in method"
                currentAuth="signin_method"
                google={() => {
                    signIn();
                }}
                github={() => {
                    console.log(
                        "Github authentication is not implemented yet."
                    );
                }}
                email={onEmailLogin}
                goToSignupMethod={goToSignupMethod}
            />
            <div className="pka-flex pka-w-full pka-items-center pka-justify-end">
                <PoweredByPakt className="sm:!pka-text-white" />
            </div>
        </div>
    );
};
