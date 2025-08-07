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
                className="pka:relative !pka:z-[3000]"
                onClose={() => {
                    if (!disableClickOutside) {
                        closeModal();
                    }
                }}
            >
                <Transition.Child
                    as={Fragment}
                    enter="pka:ease-out"
                    enterFrom="pka:opacity-0"
                    enterTo="pka:opacity-100"
                    leave="pka:ease-in pka:duration-200"
                    leaveFrom="pka:opacity-100"
                    leaveTo="pka:opacity-0"
                >
                    <div className="pka:fixed pka:inset-0 pka:bg-black/80 pka:backdrop-blur-lg" />
                </Transition.Child>

                <div className="pka:fixed pka:inset-0 pka:overflow-y-auto">
                    <div className="pka:flex pka:min-h-full pka:items-center pka:justify-center pka:p-4 pka:text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="pka:ease-out"
                            enterFrom="pka:opacity-0 pka:scale-95"
                            enterTo="pka:opacity-100 pka:scale-100"
                            leave="pka:ease-in pka:duration-200"
                            leaveFrom="pka:opacity-100 pka:scale-100"
                            leaveTo="pka:opacity-0 pka:scale-95"
                        >
                            <Dialog.Panel
                                className={cn(
                                    "pka:relative !pka:z-10 pka:w-full pka:max-w-lg pka:transform pka:overflow-hidden pka:bg-transparent pka:text-left pka:align-middle pka:transition-all",
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
