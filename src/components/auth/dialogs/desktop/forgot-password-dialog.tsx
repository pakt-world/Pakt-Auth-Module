/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { useState } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../../common/headless-modal";
import { ForgotPasswordFormData } from "../../../../types/auth";

interface ForgotPasswordDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ForgotPasswordFormData) => void;
    isLoading?: boolean;
    error?: string;
    onSuccess: () => void;
}

const ForgotPasswordDialog = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    error,
    onSuccess,
}: ForgotPasswordDialogProps) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ email });
    };

    return (
        <HeadlessModal isOpen={isOpen} closeModal={onClose}>
            <div className="pam-fixed pam-inset-0 pam-z-50 pam-flex pam-items-center pam-justify-center pam-p-4">
                <div
                    className="pam-fixed pam-inset-0 pam-bg-black pam-bg-opacity-50 pam-transition-opacity"
                    onClick={onClose}
                />
                <div className="pam-relative pam-mx-auto pam-w-full pam-max-w-md pam-rounded-lg pam-bg-white pam-p-6">
                    <div className="pam-mb-6 pam-text-center">
                        <h2 className="pam-text-2xl pam-font-bold pam-text-gray-900">
                            Forgot Password
                        </h2>
                        <p className="pam-mt-2 pam-text-gray-600">
                            Enter your email to reset your password
                        </p>
                    </div>

                    {error && (
                        <div className="pam-mb-4 pam-rounded pam-border pam-border-red-200 pam-bg-red-50 pam-px-4 pam-py-3 pam-text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="pam-space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="pam-mb-2 pam-block pam-text-sm pam-font-medium pam-text-gray-700"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pam-focus:outline-none pam-focus:ring-2 pam-focus:ring-blue-500 pam-focus:border-transparent pam-w-full pam-rounded-md pam-border pam-border-gray-300 pam-px-3 pam-py-2"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="pam-w-full pam-rounded-lg pam-bg-blue-600 pam-px-4 pam-py-3 pam-font-medium pam-text-white pam-transition-colors hover:pam-bg-blue-700 disabled:pam-cursor-not-allowed disabled:pam-opacity-50"
                        >
                            {isLoading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>

                    <div className="pam-mt-6 pam-text-center">
                        <p className="pam-text-sm pam-text-gray-600">
                            Remember your password?{" "}
                            <button
                                onClick={onClose}
                                className="pam-font-medium pam-text-blue-600 hover:pam-text-blue-700"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </HeadlessModal>
    );
};

export default ForgotPasswordDialog;
