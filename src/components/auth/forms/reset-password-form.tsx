/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { useMemo } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "usehooks-ts";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { resetPasswordSchema } from "../../../utils/validation";
import { PasswordCriteria } from "../../common/password-criteria";
import { Button } from "../../common/button";
import { Spinner } from "../../common/loader";
import { spChars } from "../../../utils/auth-utils";
import Lottie from "../../common/lottie";
import success from "../../../assets/success.json";

type ResetFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
    onSubmit: (data: ResetFormValues) => void;
    isLoading?: boolean;
    error?: string;
    onSuccess?: () => void;
    isSuccess?: boolean;
}

function ResetPasswordForm({
    onSubmit,
    isLoading = false,
    error,
    onSuccess,
    isSuccess = false,
}: ResetPasswordFormProps): React.JSX.Element {
    const isMobile = useMediaQuery("(max-width: 640px)");

    const resetForm = useForm<ResetFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
            token: "123456",
        },
    });

    const handleSubmit: SubmitHandler<ResetFormValues> = (values) => {
        onSubmit(values);
    };

    const { password } = resetForm.getValues();
    const { confirmPassword } = resetForm.getValues();

    const passwordWatch = resetForm.watch("password");
    const confirmPasswordWatch = resetForm.watch("confirmPassword");

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
        <>
            {!isSuccess ? (
                <div className="pam-flex pam-h-full pam-w-full pam-flex-col pam-items-center pam-justify-center pam-gap-6 sm:pam-max-w-2xl max-sm:pam-p-0">
                    <div className="pam-flex pam-flex-col pam-items-center pam-gap-2 pam-text-center">
                        <h3 className="pam-2xl:text-3xl pam-font-sans pam-text-2xl pam-font-bold pam-text-title sm:pam-text-white">
                            Reset Password
                        </h3>
                        <p className="pam-font-sans pam-text-base pam-leading-normal pam-tracking-tight pam-text-body sm:pam-text-white">
                            Choose a new password for your account
                        </p>
                    </div>
                    <form
                        onSubmit={resetForm.handleSubmit(handleSubmit)}
                        className="pam-relative pam-z-[100] pam-mx-auto pam-flex pam-w-full pam-flex-col pam-items-center pam-gap-6 pam-rounded-2xl pam-bg-white sm:pam-max-w-[600px] sm:pam-px-[40px] sm:pam-py-10 max-sm:pam-p-4"
                    >
                        {error && (
                            <div className="pam-w-full pam-rounded-lg pam-border pam-border-red-200 pam-bg-red-50 pam-p-3 pam-text-sm pam-text-red-600">
                                {error}
                            </div>
                        )}

                        <div className="pam-flex pam-w-full pam-flex-col pam-gap-4">
                            <div className="pam-relative pam-mb-2 pam-flex pam-flex-col pam-gap-2">
                                <label
                                    htmlFor="password"
                                    className="pam-text-base pam-text-body sm:pam-text-sm"
                                >
                                    Create Password
                                </label>
                                <input
                                    id="password"
                                    {...resetForm.register("password")}
                                    className="pam-input_style"
                                    placeholder="create password"
                                    type="password"
                                />
                                {isPasswordTyping && (
                                    <div className="pam-flex pam-flex-col pam-gap-4 pam-p-4 pam-text-xs pam-text-body">
                                        <PasswordCriteria
                                            isValidated={
                                                validatingErr.isMinLength
                                            }
                                            criteria="At least 8 characters"
                                            isSignUp
                                        />
                                        <PasswordCriteria
                                            isValidated={
                                                validatingErr.checkLowerUpper
                                            }
                                            criteria="Upper and lower case characters"
                                            isSignUp
                                        />
                                        <PasswordCriteria
                                            isValidated={
                                                validatingErr.checkNumber
                                            }
                                            criteria="1 or more numbers"
                                            isSignUp
                                        />
                                        <PasswordCriteria
                                            isValidated={
                                                validatingErr.specialCharacter
                                            }
                                            criteria="1 or more special characters"
                                            isSignUp
                                        />
                                        <PasswordCriteria
                                            isValidated={
                                                validatingErr.confirmedPassword
                                            }
                                            criteria="passwords must match"
                                            isSignUp
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="pam-relative pam-mb-2 pam-flex pam-flex-col pam-gap-2">
                                <label
                                    htmlFor="confirmPassword"
                                    className="pam-text-base pam-text-body sm:pam-text-sm"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    {...resetForm.register("confirmPassword")}
                                    className="pam-input_style"
                                    placeholder="re-type password"
                                    type="password"
                                />
                                {resetForm.formState.errors.confirmPassword
                                    ?.message && (
                                    <div className="pam-text-sm pam-text-red-500">
                                        {
                                            resetForm.formState.errors
                                                .confirmPassword.message
                                        }
                                    </div>
                                )}
                            </div>
                        </div>

                        <Button
                            variant="primary"
                            size="md"
                            className=""
                            fullWidth
                            disabled={!resetForm.formState.isValid || isLoading}
                        >
                            {isLoading ? <Spinner /> : "Reset Password"}
                        </Button>
                    </form>
                </div>
            ) : (
                <div className="pam-mx-auto pam-mt-8 pam-flex pam-w-full pam-max-w-xl pam-flex-col pam-items-center pam-justify-center pam-gap-2 pam-rounded-2xl pam-bg-white pam-p-8 pam-px-[40px] pam-py-10 pam-text-center pam-text-body sm:pam-mt-28">
                    <div className="pam-flex pam-w-full pam-max-w-[150px] pam-items-center pam-justify-center">
                        <Lottie animationData={success} />
                    </div>
                    <h6 className="pam-my-4 pam-flex-wrap pam-text-lg pam-font-thin pam-opacity-[0.8]">
                        Password Reset Successful.
                    </h6>
                    <Button
                        variant="primary"
                        size="md"
                        className=""
                        fullWidth
                        onClick={onSuccess}
                    >
                        Login
                    </Button>
                </div>
            )}
        </>
    );
}

export default ResetPasswordForm;
