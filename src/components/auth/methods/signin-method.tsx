/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import PoweredByPakt from "../../common/powered-by-pakt";
import { AuthMethod } from "./auth-method";
import { useGoogleAuth } from "../../../hooks/use-google-auth";
import { AuthTextConfig } from "../../pakt-auth/types";

interface SigninMethodProps {
    textConfig?: AuthTextConfig;
    onEmailLogin: () => void;
    goToSignupMethod: () => void;
    onGoogleLoginSuccess?: (userData: any) => void;
    onGoogleLoginError?: (error: string) => void;
}

export const SigninMethod = ({
    textConfig,
    onEmailLogin,
    goToSignupMethod,
    onGoogleLoginSuccess,
    onGoogleLoginError,
}: SigninMethodProps): JSX.Element => {
    const { signIn, isGoogleOAuthEnabled } = useGoogleAuth({
        onSuccess: onGoogleLoginSuccess,
        onError: onGoogleLoginError,
    });

    return (
        <div className="pka-z-[2] pka-flex pka-size-full pka-flex-col pka-items-center pka-justify-center pka-gap-6">
            <AuthMethod
                title={textConfig?.loginTitle || "Login to your account"}
                description={
                    textConfig?.loginDescription ||
                    "Collaborate with world-class builders"
                }
                instruction="Choose Log in method"
                currentAuth="signin_method"
                google={isGoogleOAuthEnabled ? () => signIn() : undefined}
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
