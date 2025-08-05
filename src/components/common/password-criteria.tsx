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
            className={`pka:flex pka:flex-row pka:items-center pka:gap-4 ${isValidated ? "pka:text-success" : "pka:text-body"}`}
        >
            <Check size={15} />
            {criteria}
        </div>
    );
};
