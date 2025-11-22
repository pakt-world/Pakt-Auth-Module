/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { useMemo, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "usehooks-ts";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { spChars, AuthEnums } from "../../../utils/auth-utils";
import { signupSchema, type SignupFormValues } from "../../../utils/validation";
import { Button } from "../../common/button";

import { Spinner } from "../../common/loader";
import { PasswordCriteria } from "../../common/password-criteria";

interface SignUpFormProps {
    onSubmit: (data: SignupFormValues) => void;
    isLoading?: boolean;
    backToSignupMethod?: () => void;
    goToLoginMethod?: () => void;
}

const SignUpForm = ({
    onSubmit,
    isLoading,
    backToSignupMethod,
    goToLoginMethod,
}: SignUpFormProps): React.JSX.Element => {
    const isMobile = useMediaQuery("(max-width: 640px)");

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                    <ChevronLeft size={24} className="pka:text-brand-primary" />
                    <div className="pka:text-base pka:leading-normal pka:tracking-tight pka:text-brand-primary">
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
                            <div className="pka:text-sm pka:text-error-text">
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
                        <div className="pka:text-sm pka:text-error-text">
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
                    <div className="pka:relative">
                        <input
                            id="password"
                            {...form.register("password")}
                            className="input_style pka:pr-10"
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="pka:absolute pka:inset-y-0 pka:right-0 pka:flex pka:items-center pka:pr-3 pka:text-gray-400 hover:pka:text-gray-600"
                        >
                            {showPassword ? (
                                <EyeOff className="pka:h-4 pka:w-4" />
                            ) : (
                                <Eye className="pka:h-4 pka:w-4" />
                            )}
                        </button>
                    </div>
                    {isPasswordTyping && (
                        <div className="pka:flex pka:flex-col pka:gap-4 pka:p-4 pka:text-xs pka:text-body-text">
                            <PasswordCriteria
                                isValidated={validatingErr.isMinLength}
                                criteria="At least 8 characters"
                            />
                            <PasswordCriteria
                                isValidated={validatingErr.checkLowerUpper}
                                criteria="Upper and lower case characters"
                            />
                            <PasswordCriteria
                                isValidated={validatingErr.checkNumber}
                                criteria="1 or more numbers"
                            />
                            <PasswordCriteria
                                isValidated={validatingErr.specialCharacter}
                                criteria="1 or more special characters"
                            />
                            <PasswordCriteria
                                isValidated={validatingErr.confirmedPassword}
                                criteria="passwords must match"
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
                    <div className="pka:relative">
                        <input
                            id="confirmPassword"
                            {...form.register("confirmPassword")}
                            className="input_style pka:pr-10"
                            placeholder="Confirm Password"
                            type={showConfirmPassword ? "text" : "password"}
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="pka:absolute pka:inset-y-0 pka:right-0 pka:flex pka:items-center pka:pr-3 pka:text-gray-400 hover:pka:text-gray-600"
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="pka:h-4 pka:w-4" />
                            ) : (
                                <Eye className="pka:h-4 pka:w-4" />
                            )}
                        </button>
                    </div>
                    {form.formState.errors.confirmPassword?.message && (
                        <div className="pka:text-sm pka:text-error-text">
                            {form.formState.errors.confirmPassword.message}
                        </div>
                    )}
                </div>
            </div>

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
                    <span className="pka:text-heading-text">
                        Already have an account?{" "}
                    </span>
                    <button
                        type="button"
                        onClick={goToLoginMethod}
                        className="pka:hover:underline pka:cursor-pointer pka:font-bold pka:text-brand-primary pka:bg-transparent pka:border-none"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                goToLoginMethod?.();
                            }
                        }}
                    >
                        Login
                    </button>
                </div>
            )}
        </form>
    );
};

export default SignUpForm;
