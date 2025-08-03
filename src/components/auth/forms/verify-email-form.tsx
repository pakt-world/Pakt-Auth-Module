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
        <div className="pka-flex pka-w-full pka-max-w-2xl pka-flex-col pka-items-center pka-gap-6 sm:pka-mt-28">
            <div className="pka-flex pka-flex-col pka-items-center pka-gap-2 pka-text-center">
                <h3 className="pka-font-sans pka-text-3xl pka-font-bold pka-text-white">
                    Reset Password Code
                </h3>
                <p className="pka-font-sans pka-text-base pka-text-body pka-text-white">
                    A code has been sent to your email address. Enter it to
                    verify your reset password.
                </p>
            </div>
            <form
                className="pka-relative pka-z-[100] pka-mx-auto pka-flex pka-w-full pka-flex-col pka-items-center pka-gap-6 pka-rounded-2xl pka-bg-white pka-p-4 sm:pka-max-w-[600px] sm:pka-px-[40px] sm:pka-py-10"
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <div className="pka-flex pka-w-fit pka-flex-col pka-gap-4">
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
                                    containerStyle="pka-gap-3 pka-flex"
                                    renderInput={(props) => (
                                        <input
                                            {...props}
                                            className="otp_style !pka-select-none pka-px-3 pka-py-2 focus:pka-outline-none focus:pka-ring-1 focus:pka-ring-primary"
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

                    <div className="pka-flex pka-w-full pka-flex-col pka-items-center pka-gap-4">
                        <span className="pka-text-body">
                            {formatCountdown(countdown)}
                        </span>

                        <Button
                            size="xs"
                            fullWidth
                            variant="outline"
                            onClick={handleResendOTP}
                            disabled={resendLoading || isResendDisabled}
                            className="!pka-h-7 pka-max-w-[150px] pka-items-center pka-justify-center !pka-py-2"
                            style={{
                                opacity:
                                    resendLoading || isResendDisabled ? 0.2 : 1,
                            }}
                        >
                            <span className="pka-flex pka-flex-row pka-gap-2">
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
