/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import {
    forgotPasswordSchema,
    type ForgotPasswordFormValues,
} from "../../utils/validation";
import { Button } from "../common/button";
import { Spinner } from "../common/loader";
import { ForgotPasswordFormProps } from "../../types/auth";

const ForgotPasswordForm = ({
    onSubmit,
    isLoading = false,
    error,
    onBackToLogin,
}: ForgotPasswordFormProps): React.JSX.Element => {
    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const handleSubmit: SubmitHandler<ForgotPasswordFormValues> = (values) => {
        onSubmit(values);
    };

    return (
        <form
            method="post"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="pam-mx-auto pam-flex pam-w-full pam-flex-col pam-items-center pam-gap-6 pam-rounded-2xl pam-bg-white pam-p-4 sm:pam-max-w-[600px] sm:pam-px-[40px] sm:pam-py-10"
        >
            {onBackToLogin && (
                <button
                    type="button"
                    onClick={onBackToLogin}
                    className="pam-inline-flex pam-items-center pam-justify-start pam-gap-2 pam-self-start"
                >
                    <ChevronLeft size={24} className="pam-text-[#007C5B]" />
                    <div className="pam-text-base pam-leading-normal pam-tracking-tight pam-text-[#007c5b]">
                        Back to login
                    </div>
                </button>
            )}

            {error && (
                <div className="pam-w-full pam-rounded-lg pam-border pam-border-red-200 pam-bg-red-50 pam-p-3 pam-text-sm pam-text-red-600">
                    {error}
                </div>
            )}

            <div className="pam-flex pam-w-full pam-flex-col pam-gap-4">
                <div className="pam-text-center">
                    <h3 className="pam-text-xl pam-font-semibold pam-text-gray-900">
                        Forgot your password?
                    </h3>
                    <p className="pam-mt-2 pam-text-sm pam-text-gray-600">
                        Enter your email address and we'll send you a link to
                        reset your password.
                    </p>
                </div>

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
            </div>

            <Button
                fullWidth
                disabled={!form.formState.isValid || isLoading}
                className="pam-touch-manipulation"
                variant="primary"
                type="submit"
            >
                {isLoading ? <Spinner /> : "Send Reset Link"}
            </Button>
        </form>
    );
};

export default ForgotPasswordForm;
