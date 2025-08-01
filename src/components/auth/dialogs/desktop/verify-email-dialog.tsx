/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { useState } from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import HeadlessModal from "../../common/headless-modal";

interface VerifyEmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  onResend: () => void;
  onSuccess: () => void;
}

const VerifyEmailDialog = ({ isOpen, onClose, onVerify, onResend, onSuccess }: VerifyEmailDialogProps) => {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(code);
  };

  return (
    <HeadlessModal isOpen={isOpen} onClose={onClose}>
      <div className="pam-fixed pam-inset-0 pam-z-50 pam-flex pam-items-center pam-justify-center pam-p-4">
        <div className="pam-fixed pam-inset-0 pam-bg-black pam-bg-opacity-50 pam-transition-opacity" onClick={onClose} />
        <div className="pam-relative pam-bg-white pam-rounded-lg pam-p-6 pam-w-full pam-max-w-md pam-mx-auto">
          <div className="pam-text-center pam-mb-6">
            <h2 className="pam-text-2xl pam-font-bold pam-text-gray-900">Verify Email</h2>
            <p className="pam-text-gray-600 pam-mt-2">Enter the verification code sent to your email</p>
          </div>
          
          <form onSubmit={handleSubmit} className="pam-space-y-4">
            <div>
              <label htmlFor="code" className="pam-block pam-text-sm pam-font-medium pam-text-gray-700 pam-mb-2">
                Verification Code
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="pam-w-full pam-px-3 pam-py-2 pam-border pam-border-gray-300 pam-rounded-md pam-focus:outline-none pam-focus:ring-2 pam-focus:ring-blue-500 pam-focus:border-transparent"
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
              />
            </div>
            
            <button
              type="submit"
              className="pam-w-full pam-bg-blue-600 pam-text-white pam-rounded-lg pam-px-4 pam-py-3 pam-font-medium pam-transition-colors hover:pam-bg-blue-700"
            >
              Verify Email
            </button>
          </form>
          
          <div className="pam-text-center pam-mt-6">
            <p className="pam-text-sm pam-text-gray-600">
              Didn't receive the code?{" "}
              <button
                onClick={onResend}
                className="pam-text-blue-600 pam-font-medium hover:pam-text-blue-700"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </HeadlessModal>
  );
};

export default VerifyEmailDialog; 