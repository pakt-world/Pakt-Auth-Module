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
import { Spinner } from "../../../components/common/loader";
import { PasswordCriteria } from "../../../components/common/password-criteria";

type FormValues = z.infer<typeof signupSchema>;

interface SignUpFormProps {
    onSubmit: (data: FormValues) => void;
    isLoading?: boolean;
    error?: string;
    backToSignupMethod?: () => void;
    goToLoginMethod?: () => void;
}

const SignUpForm = ({
    onSubmit,
    isLoading,
    error,
    backToSignupMethod,
    goToLoginMethod,
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
            className="pam-mx-auto pam-flex pam-w-full pam-flex-col pam-items-center pam-gap-6 pam-rounded-2xl pam-bg-white pam-p-4 sm:pam-max-w-[600px] sm:pam-px-[40px] sm:pam-py-10"
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
                            className="pam-text-base pam-text-body sm:pam-text-sm"
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
                        className="pam-text-base pam-text-body sm:pam-text-sm"
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
                        className="pam-text-base pam-text-body sm:pam-text-sm"
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
                            <PasswordCriteria
                                isValidated={validatingErr.isMinLength}
                                criteria="At least 8 characters"
                                isSignUp
                            />
                            <PasswordCriteria
                                isValidated={validatingErr.checkLowerUpper}
                                criteria="Upper and lower case characters"
                                isSignUp
                            />
                            <PasswordCriteria
                                isValidated={validatingErr.checkNumber}
                                criteria="1 or more numbers"
                                isSignUp
                            />
                            <PasswordCriteria
                                isValidated={validatingErr.specialCharacter}
                                criteria="1 or more special characters"
                                isSignUp
                            />
                            <PasswordCriteria
                                isValidated={validatingErr.confirmedPassword}
                                criteria="passwords must match"
                                isSignUp
                            />
                        </div>
                    )}
                </div>

                <div className="pam-relative pam-mb-1 pam-flex pam-flex-col pam-gap-2">
                    <label
                        htmlFor="confirmPassword"
                        className="pam-text-base pam-text-body sm:pam-text-sm"
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
                {isLoading ? <Spinner /> : "Signup"}
            </Button>

            {!isMobile && (
                <div className="pam-relative pam-flex pam-w-full pam-items-center pam-justify-center pam-gap-2">
                    <span className="pam-text-title">
                        Already have an account?{" "}
                    </span>
                    <span
                        onClick={goToLoginMethod}
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
