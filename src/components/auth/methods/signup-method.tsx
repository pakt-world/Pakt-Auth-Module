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

interface SignupMethodProps {
    onNavigate: (path: string) => void;
    onSetCookie: (key: string, value: string) => void;
    generateGoogleAuth: (options: { enable: boolean }) => {
        data: any;
        isSuccess: boolean;
    };
    verifyGoogleAuth: {
        mutate: (data: { code: string; state: string }, options: any) => void;
    };
    onEmailSignup: () => void;
    goToLoginMethod: () => void;
}

export const SignupMethod = ({
    onNavigate,
    onSetCookie,
    generateGoogleAuth,
    verifyGoogleAuth,
    onEmailSignup,
    goToLoginMethod,
}: SignupMethodProps): JSX.Element => {
    const isMobile = useMediaQuery("(max-width: 600px)");
    const { signIn: signUp } = useGoogleAuth({
        isSignUp: true,
        isGoogleSignup: true,
        onNavigate,
        onSetCookie,
        generateGoogleAuth,
        verifyGoogleAuth,
    });

    return (
        <div className="pam-z-[2] pam-flex pam-size-full pam-flex-col pam-items-center pam-justify-center pam-gap-6">
            <AuthMethod
                title="Create Your Account"
                description="Connect with world-class builders"
                instruction="Choose sign up method"
                currentAuth="signup_method"
                google={() => {
                    signUp();
                }}
                github={() => {
                    console.log(
                        "Github authentication is not implemented yet."
                    );
                }}
                email={onEmailSignup}
                goToLoginMethod={goToLoginMethod}
            />
            <div className="pam-flex pam-w-full pam-items-center pam-justify-end">
                <PoweredByPakt className="sm:!pam-text-white" />
            </div>
        </div>
    );
};
