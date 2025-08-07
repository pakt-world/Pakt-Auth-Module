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
                className="pka:relative !pka:z-[79]"
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
                    <div className="pka:fixed pka:inset-0 pka:bg-black/80 pka:backdrop-blur-lg" />
                </Transition.Child>

                <div className="pka:fixed pka:inset-0 pka:z-50 pka:flex pka:items-center pka:justify-center pka:bg-modal-overlay">
                    <div className="pka:relative pka:mx-4 pka:w-full pka:max-w-md pka:rounded-lg pka:bg-form-background pka:p-6 pka:shadow-xl">
                        {children}
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default memo(Modal);
