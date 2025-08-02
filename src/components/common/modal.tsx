"use client";

/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { type FC, Fragment, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { cn } from "../../utils";

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    className?: string;
    children?: React.ReactNode;
    disableClickOutside?: boolean;
}

const Modal: FC<ModalProps> = ({
    children,
    isOpen,
    closeModal,
    className,
    disableClickOutside,
}) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                open={isOpen}
                as="div"
                className="pka-relative !pka-z-[79]"
                onClose={() => {
                    if (!disableClickOutside) {
                        closeModal();
                    }
                }}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out "
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="pka-fixed pka-inset-0 pka-bg-black pka-bg-opacity-80 pka-backdrop-blur-lg" />
                </Transition.Child>

                <div className="pka-fixed pka-inset-0 pka-overflow-y-auto">
                    <div className="pka-flex pka-min-h-full pka-items-center pka-justify-center pka-p-4 pka-text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out "
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={cn(
                                    "pka-relative !pka-z-10 pka-w-full pka-max-w-lg pka-transform pka-overflow-hidden pka-bg-transparent pka-text-left pka-align-middle pka-transition-all",
                                    className
                                )}
                            >
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default memo(Modal);
