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
    token?: string;
}

function ResetPasswordForm({
    onSubmit,
    isLoading = false,
    error,
    onSuccess,
    isSuccess = false,
    token = "",
}: ResetPasswordFormProps): React.JSX.Element {
    const isMobile = useMediaQuery("(max-width: 640px)");

    const resetForm = useForm<ResetFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
            token: token,
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
                <div className="pka:flex pka:h-full pka:w-full pka:flex-col pka:items-center pka:justify-center pka:gap-6 sm:pka:max-w-2xl max-sm:pka:p-0">
                    <div className="pka:flex pka:flex-col pka:items-center pka:gap-2 pka:text-center">
                        <h3 className="pka:font-sans pka:text-2xl pka:font-bold pka:text-white 2xl:pka:text-3xl">
                            Reset Password
                        </h3>
                        <p className="pka:font-sans pka:text-base pka:leading-normal pka:tracking-tight pka:text-body pka:text-white">
                            Choose a new password for your account
                        </p>
                    </div>
                    <form
                        onSubmit={resetForm.handleSubmit(handleSubmit)}
                        className="pka:relative pka:z-[100] pka:mx-auto pka:flex pka:w-full pka:flex-col pka:items-center pka:gap-6 pka:rounded-2xl pka:bg-surface-primary sm:pka:max-w-[600px] sm:pka:px-[40px] sm:pka:py-10 max-sm:pka:p-4"
                    >
                        {error && (
                            <div className="pka:w-full pka:rounded-lg pka:border pka:border-red-200 pka:bg-red-50 pka:p-3 pka:text-sm pka:text-danger">
                                {error}
                            </div>
                        )}

                        <div className="pka:flex pka:w-full pka:flex-col pka:gap-4">
                            <div className="pka:relative pka:mb-2 pka:flex pka:flex-col pka:gap-2">
                                <label
                                    htmlFor="password"
                                    className="pka:text-base pka:text-input-label sm:pka:text-sm"
                                >
                                    Create Password
                                </label>
                                <input
                                    id="password"
                                    {...resetForm.register("password")}
                                    className="input_style"
                                    placeholder="create password"
                                    type="password"
                                />
                                {isPasswordTyping && (
                                    <div className="pka:flex pka:flex-col pka:gap-4 pka:p-4 pka:text-xs pka:text-body">
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

                            <div className="pka:relative pka:mb-2 pka:flex pka:flex-col pka:gap-2">
                                <label
                                    htmlFor="confirmPassword"
                                    className="pka:text-base pka:text-input-label sm:pka:text-sm"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    {...resetForm.register("confirmPassword")}
                                    className="input_style"
                                    placeholder="re-type password"
                                    type="password"
                                />
                                {resetForm.formState.errors.confirmPassword
                                    ?.message && (
                                    <div className="pka:text-sm pka:text-danger">
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
                <div className="pka:mx-auto pka:mt-8 pka:flex pka:w-full pka:max-w-xl pka:flex-col pka:items-center pka:justify-center pka:gap-2 pka:rounded-2xl pka:bg-surface-primary pka:p-8 pka:px-[40px] pka:py-10 pka:text-center pka:text-body sm:pka:mt-28">
                    <div className="pka:flex pka:w-full pka:max-w-[150px] pka:items-center pka:justify-center">
                        <Lottie animationData={success} />
                    </div>
                    <h6 className="pka:my-4 pka:flex-wrap pka:text-lg pka:font-thin pka:opacity-[0.8]">
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
