/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import PoweredByPakt from "../../common/powered-by-pakt";
import { AuthMethod } from "./auth-method";
import { useGoogleAuth } from "../../../hooks/use-google-auth";
import { AuthTextConfig } from "../../pakt-auth/types";

interface SignupMethodProps {
    textConfig?: AuthTextConfig;
    onEmailSignup: () => void;
    goToLoginMethod: () => void;
    onGoogleSignupSuccess?: (userData: any) => void;
    onGoogleSignupError?: (error: string) => void;
}

export const SignupMethod = ({
    textConfig,
    onEmailSignup,
    goToLoginMethod,
    onGoogleSignupSuccess,
    onGoogleSignupError,
}: SignupMethodProps): JSX.Element => {
    const {
        signIn: signUp,
        loading,
        isGoogleOAuthEnabled,
    } = useGoogleAuth({
        onSuccess: onGoogleSignupSuccess,
        onError: onGoogleSignupError,
    });

    return (
        <div className="pka-z-[2] pka-flex pka-size-full pka-flex-col pka-items-center pka-justify-center pka-gap-6">
            <AuthMethod
                title={textConfig?.signupTitle || "Create Your Account"}
                description={
                    textConfig?.signupDescription ||
                    "Connect with world-class builders"
                }
                instruction="Choose sign up method"
                currentAuth="signup_method"
                google={isGoogleOAuthEnabled ? signUp : undefined}
                github={() => {
                    console.log(
                        "Github authentication is not implemented yet."
                    );
                }}
                email={onEmailSignup}
                goToLoginMethod={goToLoginMethod}
            />
            <div className="pka-flex pka-w-full pka-items-center pka-justify-end">
                <PoweredByPakt className="sm:!pka-text-white" />
            </div>
        </div>
    );
};
