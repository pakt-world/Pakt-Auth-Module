/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { type FC } from "react";
import { Loader } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { cn } from "../../utils";

interface SpinnerProps {
    size?: number;
    className?: string;
}

export const Spinner: FC<SpinnerProps> = ({ size = 24, className }) => {
    return (
        <div
            className={cn(
                `pka-flex pka-w-full pka-items-center pka-justify-center`,
                className
            )}
        >
            <Loader className="pka-animate-spin" size={size} />
        </div>
    );
};
