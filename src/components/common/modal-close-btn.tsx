/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { XIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { Button } from "./button";

interface ModalCloseBtnProps {
    onClick: () => void;
    text?: string;
}

const ModalCloseBtn = ({ onClick, text }: ModalCloseBtnProps) => {
    return (
        <Button
            className="pka-flex !pka-h-[37px] !pka-w-[106px] pka-items-center pka-justify-center pka-gap-2 !pka-px-4 !pka-py-2 pka-font-bold sm:!pka-h-[51px] sm:!pka-w-[151px] sm:pka-gap-4"
            variant="secondary"
            onClick={onClick}
        >
            <XIcon className="pka-cursor-pointer pka-text-primary" />
            <span className="!pka-text-sm sm:!pka-text-lg">
                {text || "Cancel"}
            </span>
        </Button>
    );
};

export default ModalCloseBtn;
