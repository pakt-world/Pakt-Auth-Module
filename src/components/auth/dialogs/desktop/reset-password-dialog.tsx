/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { useState } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { HeadlessModal } from "../../../common/headless-modal";

interface ResetPasswordDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { password: string; confirmPassword: string }) => void;
    isLoading?: boolean;
    error?: string;
    onSuccess: () => void;
}

const ResetPasswordDialog = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    error,
    onSuccess,
}: ResetPasswordDialogProps) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ password, confirmPassword });
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
                            Reset Password
                        </h2>
                        <p className="pam-mt-2 pam-text-gray-600">
                            Enter your new password
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
                                htmlFor="password"
                                className="pam-mb-2 pam-block pam-text-sm pam-font-medium pam-text-gray-700"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pam-focus:outline-none pam-focus:ring-2 pam-focus:ring-blue-500 pam-focus:border-transparent pam-w-full pam-rounded-md pam-border pam-border-gray-300 pam-px-3 pam-py-2"
                                placeholder="Enter new password"
                                required
                                minLength={8}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="pam-mb-2 pam-block pam-text-sm pam-font-medium pam-text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="pam-focus:outline-none pam-focus:ring-2 pam-focus:ring-blue-500 pam-focus:border-transparent pam-w-full pam-rounded-md pam-border pam-border-gray-300 pam-px-3 pam-py-2"
                                placeholder="Confirm new password"
                                required
                                minLength={8}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || password !== confirmPassword}
                            className="pam-w-full pam-rounded-lg pam-bg-blue-600 pam-px-4 pam-py-3 pam-font-medium pam-text-white pam-transition-colors hover:pam-bg-blue-700 disabled:pam-cursor-not-allowed disabled:pam-opacity-50"
                        >
                            {isLoading ? "Resetting..." : "Reset Password"}
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

export default ResetPasswordDialog;
