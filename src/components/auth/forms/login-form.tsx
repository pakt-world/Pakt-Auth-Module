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
            className="pka:mx-auto pka:flex pka:w-full pka:flex-col pka:items-center pka:gap-6 pka:rounded-2xl pka:bg-white pka:p-4 sm:pka:max-w-[600px] sm:pka:px-[40px] sm:pka:py-10"
        >
            {backToLoginMethod && (
                <button
                    type="button"
                    onClick={backToLoginMethod}
                    className="pka:inline-flex pka:items-center pka:justify-start pka:gap-2 pka:self-start"
                >
                    <ChevronLeft size={24} className="pka:text-[#007C5B]" />
                    <div className="pka:text-base pka:leading-normal pka:tracking-tight pka:text-[#007c5b]">
                        Log in another way
                    </div>
                </button>
            )}

            {error && (
                <div className="pka:w-full pka:rounded-lg pka:border pka:border-red-200 pka:bg-red-50 pka:p-3 pka:text-sm pka:text-red-600">
                    {error}
                </div>
            )}

            <div className="pka:flex pka:w-full pka:flex-col pka:gap-4">
                <div className="pka:flex pka:flex-col pka:gap-2">
                    <label
                        htmlFor="email"
                        className="pka:text-base pka:text-body sm:pka:text-sm"
                    >
                        Email Address
                    </label>
                    <input
                        {...form.register("email")}
                        className="input_style"
                        placeholder="Email Address"
                        type="email"
                    />
                    {form.formState.errors.email && (
                        <span className="pka:text-sm pka:text-red-500">
                            {form.formState.errors.email.message}
                        </span>
                    )}
                </div>

                <div className="pka:flex pka:flex-col pka:gap-2">
                    <label
                        htmlFor="password"
                        className="pka:text-base pka:text-body sm:pka:text-sm"
                    >
                        Password
                    </label>
                    <input
                        {...form.register("password")}
                        className="input_style"
                        placeholder="Password"
                        type="password"
                    />
                    {form.formState.errors.password && (
                        <span className="pka:text-sm pka:text-red-500">
                            {form.formState.errors.password.message}
                        </span>
                    )}
                </div>

                {onForgotPassword && (
                    <div className="pka:flex pka:items-center pka:justify-end">
                        <button
                            type="button"
                            onClick={onForgotPassword}
                            className="pka:cursor-pointer pka:font-bold pka:text-primary hover:pka:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>
                )}
            </div>

            <Button
                fullWidth
                disabled={!form.formState.isValid || isLoading}
                className="pka:touch-manipulation"
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
                    className="pka:mt-4"
                >
                    Continue with Google
                </Button>
            )}
        </form>
    );
};

export default LoginForm;
