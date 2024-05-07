import { Fragment } from "react";
import type { FC, ReactNode } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { CloseBtn } from "../btns";

type Tprops = {
    open: boolean;
    onClose: () => void;
    onCloseForce?: () => void;
    // using red color for major warning
    isMajor?: boolean;
    title: string;
    children: ReactNode[] | ReactNode;
    mode?: Tmode;
    className?: string;
};

const ModalFrame: FC<Tprops> = ({
    open,
    onClose,
    onCloseForce,
    isMajor = false,
    title,
    children,
    mode = "md",
    className,
}) => {
    const { t } = useTranslation();

    const widthSize = (mode: Tmode) => {
        switch (mode) {
            case "sm":
                return "max-w-sm rounded-lg";
            case "md":
                return "max-w-xl rounded-lg";
            case "lg":
                return "max-w-2xl rounded-lg";
            case "xl":
                return "max-w-3xl rounded-lg";
            case "full":
                return `w-screen h-[93dvh] lg:w-[95vw] lg:ml-[5vw]`;
            case "md-full":
                return `w-screen h-[93dvh] sm:max-w-xl sm:rounded-lg`;
        }
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => {
                    onClose();
                }}
            >
                {/* background overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-in duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/80" />
                </Transition.Child>

                {/* modal content */}
                <div className="mt-[7vh] fixed inset-0 z-10 overflow-y-auto">
                    {/* min-h-full */}
                    <div className="flex h-[93dvh] items-end justify-center text-center sm:items-center p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className={`relative overflow-y-auto bg-slate-100 text-left shadow-xl transition-all px-4 pb-4 pt-5 sm:my-8 sm:py-3 sm:px-4 ${widthSize(
                                    mode
                                )} ${className}`}
                            >
                                {/* right top close button */}
                                <div className="absolute right-0 top-0 pr-4 pt-4 block">
                                    <CloseBtn
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (onCloseForce) {
                                                onCloseForce();
                                            } else {
                                                onClose();
                                            }
                                        }}
                                        srStr={t("sr.closeModal")}
                                    />
                                </div>

                                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    {/* title */}
                                    <Dialog.Title
                                        as="h3"
                                        className={`text-base flex items-center font-semibold leading-6 h-[5dvh] ${
                                            isMajor
                                                ? "text-red-600 flex items-center justify-center"
                                                : "text-gray-900"
                                        }`}
                                    >
                                        {isMajor && (
                                            <ExclamationTriangleIcon
                                                className="h-5 w-5 inline"
                                                aria-hidden="true"
                                            />
                                        )}
                                        &nbsp;
                                        {title}
                                    </Dialog.Title>

                                    {/* main content */}
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ModalFrame;
