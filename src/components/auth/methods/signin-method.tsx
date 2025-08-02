/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { useMediaQuery } from "usehooks-ts";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import PoweredByPakt from "../../common/powered-by-pakt";
import { AuthMethod } from "./auth-method";
import { useGoogleAuth } from "../../../hooks/use-google-auth";

interface SigninMethodProps {
    onNavigate: (path: string) => void;
    onSetCookie: (key: string, value: string) => void;
    generateGoogleAuth: (options: { enable: boolean }) => {
        data: any;
        isSuccess: boolean;
    };
    verifyGoogleAuth: {
        mutate: (data: { code: string; state: string }, options: any) => void;
    };
    onEmailLogin: () => void;
    goToSignupMethod: () => void;
}

export const SigninMethod = ({
    onNavigate,
    onSetCookie,
    generateGoogleAuth,
    verifyGoogleAuth,
    onEmailLogin,
    goToSignupMethod,
}: SigninMethodProps): JSX.Element => {
    const isMobile = useMediaQuery("(max-width: 600px)");
    const { signIn } = useGoogleAuth({
        isSignIn: true,
        isGoogleSignIn: true,
        onNavigate,
        onSetCookie,
        generateGoogleAuth,
        verifyGoogleAuth,
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
