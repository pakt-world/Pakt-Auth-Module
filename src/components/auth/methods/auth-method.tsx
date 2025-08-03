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
            className="pka-inline-flex pka-h-14 pka-w-full pka-items-center pka-justify-center pka-gap-4 pka-overflow-hidden pka-rounded-[10px] pka-border-2 pka-border-slate-200 pka-bg-white pka-p-4"
        >
            <div data-svg-wrapper className="pka-relative">
                {icon}
            </div>
            <div className="pka-text-base pka-font-medium pka-leading-normal pka-text-slate-800">
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
        <div className="pka-flex pka-w-full pka-flex-col pka-items-center pka-justify-center pka-gap-4 pka-rounded-3xl pka-bg-white pka-p-6">
            <h3 className="pka-text-xl pka-leading-[30px] pka-tracking-tight pka-text-[#1f2739]">
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
            <div className="pka-inline-flex pka-h-5 pka-items-start pka-justify-center pka-gap-1">
                <div className="pka-text-sm pka-font-medium pka-leading-tight pka-text-[#1f2739]">
                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}
                </div>
                <button
                    onClick={isLogin ? goToSignupMethod : goToLoginMethod}
                    className="pka-text-sm pka-font-bold pka-leading-tight pka-text-[#3055b3]"
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
        <div className="pka-z-[2] pka-flex pka-w-full pka-items-center sm:pka-mx-auto sm:pka-size-full">
            <div className="pka-flex pka-size-full pka-flex-col pka-items-center pka-justify-center pka-gap-6">
                <div className="pka-flex pka-flex-col pka-items-center pka-gap-2 pka-text-center">
                    <h3 className="pka-font-sans pka-text-2xl pka-font-bold sm:pka-text-3xl pka-text-white">
                        {title}
                    </h3>
                    <p className="pka-w-[392px] pka-text-center pka-text-base pka-font-medium pka-leading-normal pka-tracking-tight pka-text-body pka-text-white">
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
