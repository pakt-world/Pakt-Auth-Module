/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { ReactElement } from "react";
import { useMediaQuery } from "usehooks-ts";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { AUTH_METHOD } from "../../../lib/constants";

interface MethodWrapperProps {
    icon: ReactElement;
    method: string;
    onClick: () => void;
    isLogin: boolean;
}

const MethodWrapper = ({
    icon,
    method,
    onClick,
    isLogin,
}: MethodWrapperProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="pam-inline-flex pam-h-14 pam-w-full pam-items-center pam-justify-center pam-gap-4 pam-overflow-hidden pam-rounded-[10px] pam-border-2 pam-border-slate-200 pam-bg-white pam-p-4"
        >
            <div data-svg-wrapper className="pam-relative">
                {icon}
            </div>
            <div className="pam-text-base pam-font-medium pam-leading-normal pam-text-slate-800">
                {isLogin ? "Log in" : "Sign up"} with {method}
            </div>
        </button>
    );
};

interface AuthOptionsProps {
    instruction: string;
    google: () => void;
    github: () => void;
    email: () => void;
    goToSignupMethod: () => void;
    goToLoginMethod: () => void;
    currentAuth?: string;
}

export const AuthOptions = ({
    instruction,
    google,
    github,
    email,
    goToSignupMethod,
    goToLoginMethod,
    currentAuth,
}: AuthOptionsProps) => {
    const isMobile = useMediaQuery("(max-width: 640px)");
    const isLogin = currentAuth === "signin_method";

    return (
        <div className="pam-flex pam-w-full pam-flex-col pam-items-center pam-justify-center pam-gap-4 pam-rounded-3xl pam-bg-white pam-p-6">
            <h3 className="pam-text-xl pam-leading-[30px] pam-tracking-tight pam-text-[#1f2739]">
                {instruction}
            </h3>
            {AUTH_METHOD.map((method) => {
                const actions = () => {
                    switch (method.method) {
                        case "Google":
                            google();
                            break;
                        case "Github":
                            github();
                            break;
                        case "Email":
                            email();
                            break;
                        default:
                            break;
                    }
                };
                return (
                    <MethodWrapper
                        key={method.method}
                        icon={method.icon}
                        method={method.method}
                        onClick={actions}
                        isLogin={isLogin}
                    />
                );
            })}
            <div className="pam-inline-flex pam-h-5 pam-items-start pam-justify-center pam-gap-1">
                <div className="pam-text-sm pam-font-medium pam-leading-tight pam-text-[#1f2739]">
                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}
                </div>
                <button
                    onClick={isLogin ? goToSignupMethod : goToLoginMethod}
                    className="pam-text-sm pam-font-bold pam-leading-tight pam-text-[#3055b3]"
                >
                    {isLogin ? "Sign up" : "Login"}
                </button>
            </div>
        </div>
    );
};

interface AuthMethodProps {
    title: string;
    description: string;
    instruction: string;
    google: () => void;
    github: () => void;
    email: () => void;
    goToSignupMethod?: () => void;
    goToLoginMethod?: () => void;
    currentAuth?: string;
}

export const AuthMethod = ({
    title,
    description,
    instruction,
    google,
    github,
    email,
    goToSignupMethod,
    goToLoginMethod,
    currentAuth,
}: AuthMethodProps) => {
    return (
        <div className="pam-z-[2] pam-flex pam-w-full pam-items-center sm:pam-mx-auto sm:pam-size-full">
            <div className="pam-flex pam-size-full pam-flex-col pam-items-center pam-justify-center pam-gap-6">
                <div className="pam-flex pam-flex-col pam-items-center pam-gap-2 pam-text-center">
                    <h3 className="pam-font-sans pam-text-2xl pam-font-bold pam-text-title sm:pam-text-3xl sm:pam-text-white">
                        {title}
                    </h3>
                    <p className="pam-w-[392px] pam-text-center pam-text-base pam-font-medium pam-leading-normal pam-tracking-tight pam-text-body sm:pam-text-white">
                        {description}
                    </p>
                </div>
                <AuthOptions
                    instruction={instruction}
                    google={google}
                    github={github}
                    email={email}
                    goToSignupMethod={goToSignupMethod ?? (() => {})}
                    goToLoginMethod={goToLoginMethod ?? (() => {})}
                    currentAuth={currentAuth}
                />
            </div>
        </div>
    );
};
