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
import { signupSchema, type SignupFormValues } from "../../../utils/validation";
import { Button } from "../../common/button";
import { AuthEnums } from "../../../utils/auth-utils";
import { Spinner } from "../../../components/common/loader";
import { PasswordCriteria } from "../../../components/common/password-criteria";

interface SignUpFormProps {
    onSubmit: (data: SignupFormValues) => void;
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

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    });

    const handleSubmit: SubmitHandler<SignupFormValues> = (values) => {
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
            className="pka:mx-auto pka:flex pka:w-full pka:flex-col pka:items-center pka:gap-6 pka:rounded-2xl pka:bg-form-background pka:p-4 pka:sm:max-w-[600px] pka:sm:px-[40px] pka:sm:py-10"
        >
            {backToSignupMethod && (
                <button
                    type="button"
                    onClick={backToSignupMethod}
                    className="pka:inline-flex pka:items-center pka:justify-start pka:gap-2 pka:self-start"
                >
                    <ChevronLeft size={24} className="pka:text-primary" />
                    <div className="pka:text-base pka:leading-normal pka:tracking-tight pka:text-primary">
                        Sign up another way
                    </div>
                </button>
            )}

            <div className="pka:flex pka:w-full pka:flex-col pka:gap-2">
                <div className="pka:grid pka:grid-cols-1 pka:gap-4">
                    <div className="pka:relative pka:mb-1 pka:flex pka:w-full pka:flex-col pka:gap-2">
                        <label
                            htmlFor="firstName"
                            className="pka:text-base pka:text-input-label pka:sm:text-sm"
                        >
                            Full Name
                        </label>
                        <input
                            id="firstName"
                            {...form.register("firstName")}
                            placeholder="Enter Full Name"
                            className="input_style"
                        />
                        {form.formState.errors.firstName?.message && (
                            <div className="pka:text-sm pka:text-danger">
                                {form.formState.errors.firstName.message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="pka:relative pka:mb-1 pka:flex pka:flex-col pka:gap-2">
                    <label
                        htmlFor="email"
                        className="pka:text-base pka:text-input-label pka:sm:text-sm"
                    >
                        Email Address
                    </label>
                    <input
                        id="email"
                        {...form.register("email")}
                        placeholder="Enter Email Address"
                        className="input_style"
                    />
                    {form.formState.errors.email?.message && (
                        <div className="pka:text-sm pka:text-danger">
                            {form.formState.errors.email.message}
                        </div>
                    )}
                </div>

                <div className="pka:relative pka:mb-1 pka:flex pka:flex-col pka:gap-2">
                    <label
                        htmlFor="password"
                        className="pka:text-base pka:text-input-label pka:sm:text-sm"
                    >
                        Create Password
                    </label>
                    <input
                        id="password"
                        {...form.register("password")}
                        className="input_style"
                        placeholder="Password"
                        type="password"
                    />
                    {isPasswordTyping && (
                        <div className="pka:flex pka:flex-col pka:gap-4 pka:p-4 pka:text-xs pka:text-body">
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

                <div className="pka:relative pka:mb-1 pka:flex pka:flex-col pka:gap-2">
                    <label
                        htmlFor="confirmPassword"
                        className="pka:text-base pka:text-input-label pka:sm:text-sm"
                    >
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        {...form.register("confirmPassword")}
                        className="input_style"
                        placeholder="Confirm Password"
                        type="password"
                    />
                    {form.formState.errors.confirmPassword?.message && (
                        <div className="pka:text-sm pka:text-danger">
                            {form.formState.errors.confirmPassword.message}
                        </div>
                    )}
                </div>
            </div>

            {error && (
                <div className="pka:text-center pka:text-sm pka:text-danger">
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
                <div className="pka:relative pka:flex pka:w-full pka:items-center pka:justify-center pka:gap-2">
                    <span className="pka:text-title">
                        Already have an account?{" "}
                    </span>
                    <span
                        onClick={goToLoginMethod}
                        className="pka:hover:underline pka:cursor-pointer pka:font-bold pka:text-primary"
                    >
                        Login
                    </span>
                </div>
            )}
        </form>
    );
};

export default SignUpForm;
