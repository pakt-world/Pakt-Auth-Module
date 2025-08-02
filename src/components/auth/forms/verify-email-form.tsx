/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import ReactOTPInput from "react-otp-input";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "usehooks-ts";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { Spinner } from "../../common/loader";
import { otpSchema } from "../../../utils/validation";
import { Button } from "../../common/button";
import {
    RESEND_INTERVAL,
    COUNTDOWN_START,
    ONE_SECOND,
} from "../../../lib/constants";

type FormValues = z.infer<typeof otpSchema>;

interface VerifyEmailFormProps {
    onSubmit: (data: FormValues) => void;
    onResend: () => void;
    isLoading?: boolean;
    resendLoading?: boolean;
    email?: string;
}

function VerifyEmailForm({
    onSubmit,
    onResend,
    isLoading = false,
    resendLoading = false,
    email,
}: VerifyEmailFormProps): React.JSX.Element {
    const [countdown, setCountdown] = useState(0);
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    const isMobile = useMediaQuery("(max-width: 640px)");

    useEffect(() => {
        if (isResendDisabled) {
            setCountdown(COUNTDOWN_START);
            const timer = setInterval(() => {
                setCountdown((prev) => (prev > 1 ? prev - 1 : 0));
            }, ONE_SECOND);
            const timeout = setTimeout(() => {
                setIsResendDisabled(false);
            }, RESEND_INTERVAL);

            return () => {
                clearInterval(timer);
                clearTimeout(timeout);
            };
        }

        return () => {};
    }, [isResendDisabled]);

    const form = useForm<FormValues>({
        resolver: zodResolver(otpSchema),
    });

    const handleSubmit: SubmitHandler<FormValues> = (values) => {
        onSubmit(values);
    };

    const handleResendOTP = (): void => {
        if (isResendDisabled || resendLoading) return;
        onResend();
        setIsResendDisabled(true);
    };

    const formatCountdown = (counter: number): string => {
        const minutes = Math.floor(counter / 60);
        const seconds = counter % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="pam-flex pam-w-full pam-max-w-2xl pam-flex-col pam-items-center pam-gap-6 sm:pam-mt-28">
            <div className="pam-flex pam-flex-col pam-items-center pam-gap-2 pam-text-center">
                <h3 className="pam-font-sans pam-text-3xl pam-font-bold pam-text-title sm:pam-text-white">
                    Reset Password Code
                </h3>
                <p className="pam-font-sans pam-text-base pam-text-body sm:pam-text-white">
                    A code has been sent to your email address. Enter it to
                    verify your reset password.
                </p>
            </div>
            <form
                className="pam-relative pam-z-[100] pam-mx-auto pam-flex pam-w-full pam-flex-col pam-items-center pam-gap-6 pam-rounded-2xl pam-bg-white pam-p-4 sm:pam-max-w-[600px] sm:pam-px-[40px] sm:pam-py-10"
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <div className="pam-flex pam-w-fit pam-flex-col pam-gap-4">
                    <Controller
                        name="otp"
                        control={form.control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <ReactOTPInput
                                    value={value}
                                    onChange={onChange}
                                    shouldAutoFocus
                                    numInputs={6}
                                    containerStyle="gap-3 flex"
                                    renderInput={(props) => (
                                        <input
                                            {...props}
                                            className="pam-otp_style pam-focus:outline-none pam-focus:ring-1 pam-focus:ring-primary !pam-select-none pam-px-3 pam-py-2"
                                        />
                                    )}
                                />
                            );
                        }}
                    />

                    <Button
                        variant="primary"
                        size="md"
                        fullWidth
                        disabled={isLoading || !form.formState.isValid}
                    >
                        {isLoading ? <Spinner /> : "Reset Password"}
                    </Button>

                    <div className="pam-flex pam-w-full pam-flex-col pam-items-center pam-gap-4">
                        <span className="pam-text-body">
                            {formatCountdown(countdown)}
                        </span>

                        <Button
                            size="xs"
                            fullWidth
                            variant="outline"
                            onClick={handleResendOTP}
                            disabled={resendLoading || isResendDisabled}
                            className="!pam-h-7 pam-max-w-[150px] pam-items-center pam-justify-center !pam-py-2"
                            style={{
                                opacity:
                                    resendLoading || isResendDisabled ? 0.2 : 1,
                            }}
                        >
                            <span className="pam-flex pam-flex-row pam-gap-2">
                                <Timer size={16} className="" />
                                {resendLoading ? (
                                    <Spinner size={16} />
                                ) : (
                                    "Resend Code"
                                )}
                            </span>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default VerifyEmailForm;
