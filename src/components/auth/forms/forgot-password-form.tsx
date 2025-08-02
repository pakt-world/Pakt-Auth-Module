/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { type SubmitHandler, useForm } from "react-hook-form";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "usehooks-ts";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { forgotPasswordSchema } from "../../../utils/validation";
import { Button } from "../../common/button";
import { Spinner } from "../../common/loader";

type FormValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
    onSubmit: (data: FormValues) => void;
    isLoading?: boolean;
    error?: string;
    onBackToLogin?: () => void;
}

const ForgotPasswordForm = ({
    onSubmit,
    isLoading = false,
    error,
    onBackToLogin,
}: ForgotPasswordFormProps): React.JSX.Element => {
    const isMobile = useMediaQuery("(max-width: 640px)");

    const form = useForm<FormValues>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const handleSubmit: SubmitHandler<FormValues> = (values) => {
        onSubmit(values);
    };

    return (
        <form
            className="pam-relative pam-mx-auto pam-flex pam-w-full pam-max-w-[600px] pam-flex-col pam-items-center pam-gap-6 pam-rounded-2xl pam-bg-white pam-p-4 sm:pam-px-[40px] sm:pam-py-10"
            onSubmit={form.handleSubmit(handleSubmit)}
        >
            {error && (
                <div className="pam-w-full pam-rounded-lg pam-border pam-border-red-200 pam-bg-red-50 pam-p-3 pam-text-sm pam-text-red-600">
                    {error}
                </div>
            )}

            <div className="pam-relative pam-flex pam-w-full pam-flex-col pam-gap-2">
                <label
                    className="pam-font-sans pam-text-base pam-text-body sm:pam-text-sm"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    {...form.register("email")}
                    placeholder="Email"
                    type="email"
                    className="pam-input_style"
                    id="email"
                />
                {form.formState.errors.email?.message && (
                    <div className="pam-text-sm pam-text-red-500">
                        {form.formState.errors.email.message}
                    </div>
                )}
            </div>

            <Button
                variant="primary"
                fullWidth
                disabled={!form.formState.isValid || isLoading}
            >
                {isLoading ? <Spinner /> : "Reset Password"}
            </Button>

            {!isMobile && onBackToLogin && (
                <Button
                    variant="transparent"
                    className="pam-text-primary"
                    onClick={onBackToLogin}
                    type="button"
                >
                    Back to Login
                </Button>
            )}
        </form>
    );
};

export default ForgotPasswordForm;
