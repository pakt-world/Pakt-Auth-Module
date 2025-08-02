"use client";

/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { memo, ReactNode } from "react";
import { X } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import PoweredByPakt from "../../components/powdered-by-pakt";

const PaktWrapper = ({
    children,
    showPakt,
    closeModal,
}: {
    children: ReactNode;
    showPakt?: boolean;
    closeModal?: () => void;
}) => {
    const isMobile = useMediaQuery("(max-width: 640px)");
    return (
        <div className="pka-mx-auto pka-flex pka-w-full pka-flex-col pka-gap-4 sm:pka-max-w-[400px]">
            <div className="pka-flex pka-w-full pka-items-center pka-justify-end">
                {closeModal && (
                    <button
                        className="pka-flex pka-items-center pka-justify-center pka-rounded-full pka-border pka-border-[#DFDFE6] pka-p-1 pka-text-black pka-duration-200 pka-hover:pka-border-danger hover:pka-text-danger max-sm:pka-size-[24px] sm:pka-p-2"
                        onClick={closeModal}
                        type="button"
                        aria-label="Close"
                    >
                        <X size={16} strokeWidth={2} />
                    </button>
                )}
            </div>
            <>{children}</>
            {!isMobile && showPakt && (
                <div className="pka-flex pka-w-full pka-items-center pka-justify-end">
                    <PoweredByPakt className="!pka-text-white" />
                </div>
            )}
        </div>
    );
};

export default memo(PaktWrapper);
