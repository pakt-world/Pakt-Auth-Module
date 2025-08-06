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
            className="pka:relative pka:mx-auto pka:flex pka:w-full pka:max-w-[600px] pka:flex-col pka:items-center pka:gap-6 pka:rounded-2xl pka:bg-white pka:p-4 sm:pka:px-[40px] sm:pka:py-10"
            onSubmit={form.handleSubmit(handleSubmit)}
        >
            {error && (
                <div className="pka:w-full pka:rounded-lg pka:border pka:border-red-200 pka:bg-red-50 pka:p-3 pka:text-sm pka:text-danger">
                    {error}
                </div>
            )}

            <div className="pka:relative pka:flex pka:w-full pka:flex-col pka:gap-2">
                <label
                    className="pka:font-sans pka:text-base input_label sm:pka:text-sm"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    {...form.register("email")}
                    placeholder="Email"
                    type="email"
                    className="input_style"
                    id="email"
                />
                {form.formState.errors.email?.message && (
                    <div className="pka:text-sm pka:text-danger">
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
                    className="pka:text-primary"
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
