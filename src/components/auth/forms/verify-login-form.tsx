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
import Lottie from "../../common/lottie";
import success from "../../../assets/success.json";

type FormValues = z.infer<typeof otpSchema>;

interface VerifyLoginFormProps {
    onSubmit: (data: FormValues) => void;
    onResend: () => void;
    isLoading?: boolean;
    resendLoading?: boolean;
    email?: string;
    isSuccess?: boolean;
    onSuccess?: () => void;
}

function VerifyLoginForm({
    onSubmit,
    onResend,
    isLoading = false,
    resendLoading = false,
    email,
    isSuccess = false,
    onSuccess,
}: VerifyLoginFormProps): React.JSX.Element {
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
        <>
            {!isSuccess ? (
                <form
                    className="pam-sm:max-w-[600px] pam-sm:px-[40px] pam-sm:py-10 pam-relative pam-z-[100] pam-mx-auto pam-flex pam-w-full pam-flex-col pam-items-center pam-gap-6 pam-rounded-2xl pam-bg-white pam-p-4"
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
                            fullWidth
                            disabled={isLoading || !form.formState.isValid}
                        >
                            {isLoading ? <Spinner /> : "Submit"}
                        </Button>

                        <div className="pam-flex pam-w-full pam-flex-col pam-items-center pam-gap-4">
                            <span className="pam-text-body">
                                {formatCountdown(countdown)}
                            </span>

                            <Button
                                size="xs"
                                fullWidth
                                className="!pam-h-7 pam-max-w-[150px] pam-items-center pam-justify-center !pam-py-2"
                                variant="outline"
                                onClick={handleResendOTP}
                                disabled={resendLoading || isResendDisabled}
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
            ) : (
                <div className="pam-mx-auto pam-flex pam-w-full pam-max-w-xl pam-flex-col pam-items-center pam-justify-center pam-gap-2 pam-rounded-2xl pam-bg-white pam-p-8 pam-px-[40px] pam-py-10 pam-text-center pam-text-body">
                    <div className="pam-flex pam-w-full pam-max-w-[150px] pam-items-center pam-justify-center">
                        <Lottie animationData={success} />
                    </div>
                    <h6 className="pam-my-4 pam-flex-wrap pam-text-lg pam-font-thin pam-opacity-[0.8]">
                        Login Successful
                    </h6>
                    <Button
                        variant="primary"
                        size="md"
                        className=""
                        fullWidth
                        onClick={onSuccess}
                    >
                        Continue
                    </Button>
                </div>
            )}
        </>
    );
}

export default VerifyLoginForm;
