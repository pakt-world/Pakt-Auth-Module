/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { ChevronLeft } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { loginSchema, type LoginFormValues } from "../../../utils/validation";
import { Button } from "../../common/button";
import { Spinner } from "../../common/loader";
import { LoginFormProps } from "../../../types/auth";

const LoginForm = ({
    onSubmit,
    isLoading = false,
    error,
    onForgotPassword,
    onSignup,
    onGoogleLogin,
    backToLoginMethod,
}: LoginFormProps): JSX.Element => {
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const handleSubmit: SubmitHandler<LoginFormValues> = (values) => {
        onSubmit(values);
    };

    return (
        <form
            method="post"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="pam-mx-auto pam-flex pam-w-full pam-flex-col pam-items-center pam-gap-6 pam-rounded-2xl pam-bg-white pam-p-4 sm:pam-max-w-[600px] sm:pam-px-[40px] sm:pam-py-10"
        >
            {backToLoginMethod && (
                <button
                    type="button"
                    onClick={backToLoginMethod}
                    className="pam-inline-flex pam-items-center pam-justify-start pam-gap-2 pam-self-start"
                >
                    <ChevronLeft size={24} className="pam-text-[#007C5B]" />
                    <div className="pam-text-base pam-leading-normal pam-tracking-tight pam-text-[#007c5b]">
                        Log in another way
                    </div>
                </button>
            )}

            {error && (
                <div className="pam-w-full pam-rounded-lg pam-border pam-border-red-200 pam-bg-red-50 pam-p-3 pam-text-sm pam-text-red-600">
                    {error}
                </div>
            )}

            <div className="pam-flex pam-w-full pam-flex-col pam-gap-4">
                <div className="pam-flex pam-flex-col pam-gap-2">
                    <label
                        htmlFor="email"
                        className="pam-text-base pam-text-body sm:pam-text-sm"
                    >
                        Email Address
                    </label>
                    <input
                        {...form.register("email")}
                        className="pam-input_style"
                        placeholder="Email Address"
                        type="email"
                    />
                    {form.formState.errors.email && (
                        <span className="pam-text-sm pam-text-red-500">
                            {form.formState.errors.email.message}
                        </span>
                    )}
                </div>

                <div className="pam-flex pam-flex-col pam-gap-2">
                    <label
                        htmlFor="password"
                        className="pam-text-base pam-text-body sm:pam-text-sm"
                    >
                        Password
                    </label>
                    <input
                        {...form.register("password")}
                        className="pam-input_style"
                        placeholder="Password"
                        type="password"
                    />
                    {form.formState.errors.password && (
                        <span className="pam-text-sm pam-text-red-500">
                            {form.formState.errors.password.message}
                        </span>
                    )}
                </div>

                {onForgotPassword && (
                    <div className="pam-flex pam-items-center pam-justify-end">
                        <button
                            type="button"
                            onClick={onForgotPassword}
                            className="pam-cursor-pointer pam-font-bold pam-text-primary hover:pam-underline"
                        >
                            Forgot Password?
                        </button>
                    </div>
                )}
            </div>

            <Button
                fullWidth
                disabled={!form.formState.isValid || isLoading}
                className="pam-touch-manipulation"
                variant="primary"
                type="submit"
            >
                {isLoading ? <Spinner /> : "Login"}
            </Button>

            {onGoogleLogin && (
                <Button
                    fullWidth
                    variant="outline"
                    onClick={onGoogleLogin}
                    type="button"
                    className="pam-mt-4"
                >
                    Continue with Google
                </Button>
            )}
        </form>
    );
};

export default LoginForm;
