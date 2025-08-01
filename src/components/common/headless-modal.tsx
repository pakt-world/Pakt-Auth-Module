/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { type FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { cn } from "../../utils";

interface HeadlessModalProps {
    isOpen: boolean;
    closeModal: () => void;
    className?: string;
    children?: React.ReactNode;
    disableClickOutside?: boolean;
}

export const HeadlessModal: FC<HeadlessModalProps> = ({
    children,
    isOpen,
    closeModal,
    className,
    disableClickOutside,
}) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="pam-relative !pam-z-[79]"
                onClose={() => {
                    if (!disableClickOutside) {
                        closeModal();
                    }
                }}
            >
                <Transition.Child
                    as={Fragment}
                    enter="pam-ease-out"
                    enterFrom="pam-opacity-0"
                    enterTo="pam-opacity-100"
                    leave="pam-ease-in pam-duration-200"
                    leaveFrom="pam-opacity-100"
                    leaveTo="pam-opacity-0"
                >
                    <div className="pam-fixed pam-inset-0 pam-bg-black pam-bg-opacity-80 pam-backdrop-blur-lg" />
                </Transition.Child>

                <div className="pam-fixed pam-inset-0 pam-overflow-y-auto">
                    <div className="pam-flex pam-min-h-full pam-items-center pam-justify-center pam-p-4 pam-text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="pam-ease-out"
                            enterFrom="pam-opacity-0 pam-scale-95"
                            enterTo="pam-opacity-100 pam-scale-100"
                            leave="pam-ease-in pam-duration-200"
                            leaveFrom="pam-opacity-100 pam-scale-100"
                            leaveTo="pam-opacity-0 pam-scale-95"
                        >
                            <Dialog.Panel
                                className={cn(
                                    "pam-relative !pam-z-10 pam-w-full pam-max-w-lg pam-transform pam-overflow-hidden pam-bg-transparent pam-text-left pam-align-middle pam-transition-all",
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
