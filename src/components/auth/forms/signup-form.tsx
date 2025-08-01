/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { useMemo } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "usehooks-ts";
import { ChevronLeft } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { spChars } from "../../../utils/auth-utils";
import { signupSchema } from "../../../utils/validation";
import { Button } from "../../common/button";
import { AuthEnums } from "../../../utils/auth-utils";

type FormValues = z.infer<typeof signupSchema>;

interface SignUpFormProps {
    onSubmit: (data: FormValues) => void;
    isLoading?: boolean;
    error?: string;
    backToSignupMethod?: () => void;
}

const SignUpForm = ({
    onSubmit,
    isLoading,
    error,
    backToSignupMethod,
}: SignUpFormProps): React.JSX.Element => {
    const isMobile = useMediaQuery("(max-width: 640px)");

    const form = useForm<FormValues>({
        resolver: zodResolver(signupSchema),
    });

    const handleSubmit: SubmitHandler<FormValues> = (values) => {
        onSubmit(values);
    };

    const { password } = form.getValues();
    const { confirmPassword } = form.getValues();

    const passwordWatch = form.watch("password");
    const confirmPasswordWatch = form.watch("confirmPassword");

    const validatingErr = useMemo(
        () => ({
            isMinLength: password?.length >= 8 || false,
            checkLowerUpper:
                (/[A-Z]/.test(password) && /[a-z]/.test(password)) || false,
            checkNumber: !(password?.match(/\d+/g) == null),
            specialCharacter: spChars.test(password) || false,
            confirmedPassword:
                (password === confirmPassword &&
                    password !== "" &&
                    password !== undefined &&
                    password !== null) ||
                false,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [passwordWatch, confirmPasswordWatch]
    );

    // Check if when user starts typing the password
    const isPasswordTyping =
        passwordWatch !== "" &&
        passwordWatch !== undefined &&
        passwordWatch !== null;

    return (
        <form
            method="post"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="pam-sm:max-w-[600px] pam-sm:px-[40px] pam-sm:py-10 pam-relative pam-z-[100] pam-mx-auto pam-flex pam-w-full pam-flex-col pam-items-center pam-gap-6 pam-rounded-2xl pam-bg-white pam-p-4 pam-shadow"
        >
            {backToSignupMethod && (
                <button
                    type="button"
                    onClick={backToSignupMethod}
                    className="pam-inline-flex pam-items-center pam-justify-start pam-gap-2 pam-self-start"
                >
                    <ChevronLeft size={24} className="pam-text-[#007C5B]" />
                    <div className="pam-text-base pam-leading-normal pam-tracking-tight pam-text-[#007c5b]">
                        Sign up another way
                    </div>
                </button>
            )}

            <div className="pam-flex pam-w-full pam-flex-col pam-gap-2">
                <div className="pam-grid pam-grid-cols-1 pam-gap-4">
                    <div className="pam-relative pam-mb-1 pam-flex pam-w-full pam-flex-col pam-gap-2">
                        <label
                            htmlFor="firstName"
                            className="pam-sm:text-sm pam-text-base pam-text-body"
                        >
                            Full Name
                        </label>
                        <input
                            id="firstName"
                            {...form.register("firstName")}
                            placeholder="Enter Full Name"
                            className="pam-input_style"
                        />
                        {form.formState.errors.firstName?.message && (
                            <div className="pam-text-sm pam-text-red-500">
                                {form.formState.errors.firstName.message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="pam-relative pam-mb-1 pam-flex pam-flex-col pam-gap-2">
                    <label
                        htmlFor="email"
                        className="pam-sm:text-sm pam-text-base pam-text-body"
                    >
                        Email Address
                    </label>
                    <input
                        id="email"
                        {...form.register("email")}
                        placeholder="Enter Email Address"
                        className="pam-input_style"
                    />
                    {form.formState.errors.email?.message && (
                        <div className="pam-text-sm pam-text-red-500">
                            {form.formState.errors.email.message}
                        </div>
                    )}
                </div>

                <div className="pam-relative pam-mb-1 pam-flex pam-flex-col pam-gap-2">
                    <label
                        htmlFor="password"
                        className="pam-sm:text-sm pam-text-base pam-text-body"
                    >
                        Create Password
                    </label>
                    <input
                        id="password"
                        {...form.register("password")}
                        className="pam-input_style"
                        placeholder="Password"
                        type="password"
                    />
                    {isPasswordTyping && (
                        <div className="pam-flex pam-flex-col pam-gap-4 pam-p-4 pam-text-xs pam-text-body">
                            <div
                                className={`pam-flex pam-items-center pam-gap-2 ${validatingErr.isMinLength ? "pam-text-green-500" : "pam-text-red-500"}`}
                            >
                                <span>
                                    {validatingErr.isMinLength ? "✓" : "✗"}
                                </span>
                                <span>At least 8 characters</span>
                            </div>
                            <div
                                className={`pam-flex pam-items-center pam-gap-2 ${validatingErr.checkLowerUpper ? "pam-text-green-500" : "pam-text-red-500"}`}
                            >
                                <span>
                                    {validatingErr.checkLowerUpper ? "✓" : "✗"}
                                </span>
                                <span>Upper and lower case characters</span>
                            </div>
                            <div
                                className={`pam-flex pam-items-center pam-gap-2 ${validatingErr.checkNumber ? "pam-text-green-500" : "pam-text-red-500"}`}
                            >
                                <span>
                                    {validatingErr.checkNumber ? "✓" : "✗"}
                                </span>
                                <span>1 or more numbers</span>
                            </div>
                            <div
                                className={`pam-flex pam-items-center pam-gap-2 ${validatingErr.specialCharacter ? "pam-text-green-500" : "pam-text-red-500"}`}
                            >
                                <span>
                                    {validatingErr.specialCharacter ? "✓" : "✗"}
                                </span>
                                <span>1 or more special characters</span>
                            </div>
                            <div
                                className={`pam-flex pam-items-center pam-gap-2 ${validatingErr.confirmedPassword ? "pam-text-green-500" : "pam-text-red-500"}`}
                            >
                                <span>
                                    {validatingErr.confirmedPassword
                                        ? "✓"
                                        : "✗"}
                                </span>
                                <span>passwords must match</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="pam-relative pam-mb-1 pam-flex pam-flex-col pam-gap-2">
                    <label
                        htmlFor="confirmPassword"
                        className="pam-sm:text-sm pam-text-base pam-text-body"
                    >
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        {...form.register("confirmPassword")}
                        className="pam-input_style"
                        placeholder="Confirm Password"
                        type="password"
                    />
                    {form.formState.errors.confirmPassword?.message && (
                        <div className="pam-text-sm pam-text-red-500">
                            {form.formState.errors.confirmPassword.message}
                        </div>
                    )}
                </div>
            </div>

            {error && (
                <div className="pam-text-center pam-text-sm pam-text-red-500">
                    {error}
                </div>
            )}

            <Button
                className=""
                fullWidth
                disabled={!form.formState.isValid || isLoading}
                variant="primary"
            >
                {isLoading ? (
                    <div className="pam-h-4 pam-w-4 pam-animate-spin pam-rounded-full pam-border-2 pam-border-white pam-border-t-transparent"></div>
                ) : (
                    "Signup"
                )}
            </Button>

            {!isMobile && (
                <div className="pam-relative pam-flex pam-w-full pam-items-center pam-justify-center pam-gap-2">
                    <span className="pam-text-title">
                        Already have an account?{" "}
                    </span>
                    <span
                        onClick={() => {
                            // This would need to be handled by the parent component
                            console.log("Navigate to login");
                        }}
                        className="pam-hover:underline pam-cursor-pointer pam-font-bold pam-text-primary"
                    >
                        Login
                    </span>
                </div>
            )}
        </form>
    );
};

export default SignUpForm;
