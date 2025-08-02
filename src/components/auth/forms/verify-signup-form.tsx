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

interface VerifySignupFormProps {
    onSubmit: (data: FormValues) => void;
    onResend: () => void;
    isLoading?: boolean;
    resendLoading?: boolean;
    email?: string;
    isSuccess?: boolean;
    onSuccess?: () => void;
}

function VerifySignupForm({
    onSubmit,
    onResend,
    isLoading = false,
    resendLoading = false,
    email,
    isSuccess = false,
    onSuccess,
}: VerifySignupFormProps): React.JSX.Element {
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
                    className="pka-relative pka-mx-auto pka-flex pka-w-full pka-flex-col pka-items-center pka-gap-6 pka-rounded-2xl pka-bg-white pka-p-4 sm:pka-max-w-[600px] sm:pka-px-[40px] sm:pka-py-10"
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
                                        containerStyle="gap-3 flex"
                                        renderInput={(props) => (
                                            <input
                                                {...props}
                                                className="pka-otp_style pka-focus:outline-none pka-focus:ring-1 pka-focus:ring-primary !pka-select-none pka-px-3 pka-py-2"
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
                            {isLoading ? <Spinner /> : "Verify Email"}
                        </Button>

                        <div className="pka-flex pka-w-full pka-flex-col pka-items-center pka-gap-4">
                            <span className="pka-text-body">
                                {formatCountdown(countdown)}
                            </span>
                            <div className="pka-w-full pka-max-w-[150px]">
                                <Button
                                    size="xs"
                                    fullWidth
                                    variant="outline"
                                    onClick={handleResendOTP}
                                    disabled={resendLoading || isResendDisabled}
                                    className="!pka-h-7 pka-max-w-[150px] pka-items-center pka-justify-center !pka-py-2"
                                    style={{
                                        opacity:
                                            resendLoading || isResendDisabled
                                                ? 0.2
                                                : 1,
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
                    </div>
                </form>
            ) : (
                <div className="pka-mx-auto pka-flex pka-w-full pka-max-w-xl pka-flex-col pka-items-center pka-justify-center pka-gap-2 pka-rounded-2xl pka-bg-white pka-p-8 pka-px-[40px] pka-py-10 pka-text-center pka-text-body">
                    <div className="pka-flex pka-w-full pka-max-w-[150px] pka-items-center pka-justify-center">
                        <Lottie animationData={success} />
                    </div>
                    <h6 className="pka-my-4 pka-flex-wrap pka-text-lg pka-font-thin pka-opacity-[0.8]">
                        Email has been verified
                    </h6>
                    <Button
                        variant="primary"
                        size="md"
                        className=""
                        fullWidth
                        onClick={onSuccess}
                    >
                        Get Started
                    </Button>
                </div>
            )}
        </>
    );
}

export default VerifySignupForm;
