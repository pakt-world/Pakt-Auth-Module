/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { Check } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

interface PasswordCriteriaProps {
    isValidated: boolean;
    criteria: string;
    isSignUp?: boolean;
}

export const PasswordCriteria = ({
    isValidated,
    criteria,
}: PasswordCriteriaProps): React.JSX.Element => {
    return (
        <div
            className={`pam-flex pam-flex-row pam-items-center pam-gap-4 ${isValidated ? "pam-text-success" : "pam-text-body"}`}
        >
            <Check size={15} />
            {criteria}
        </div>
    );
};
