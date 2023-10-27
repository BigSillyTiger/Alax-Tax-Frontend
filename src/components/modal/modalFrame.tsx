import React, { Fragment } from "react";
import type { FC, ReactNode } from "react";
import {
    XMarkIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";

type Tprops = {
    open: boolean;
    onClose: () => void;
    isDelM?: boolean;
    title: string;
    children: ReactNode[] | ReactNode;
    size?: 0 | 1 | 2 | 3 | 4;
};

const ModalFrame: FC<Tprops> = ({
    open,
    onClose,
    isDelM = false,
    title,
    children,
    size = 1,
}) => {
    const { t } = useTranslation();

    const widthSize = (size: 0 | 1 | 2 | 3 | 4) => {
        switch (size) {
            case 0:
                return "max-w-sm";
            case 1:
                return "max-w-xl";
            case 2:
                return "max-w-2xl";
            case 3:
                return "max-w-3xl";
            case 4:
                return "max-w-4xl";
        }
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={(value) => {
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
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                                className={`relative overflow-hidden  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:p-6 ${widthSize(
                                    size
                                )}`}
                            >
                                {/* right top close button */}
                                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onClose();
                                        }}
                                    >
                                        <span className="sr-only">
                                            {t("btn.close")}
                                        </span>
                                        <XMarkIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                        {/* title */}
                                        <Dialog.Title
                                            as="h3"
                                            className={`text-base font-semibold leading-6 mb-2 ${
                                                isDelM
                                                    ? "text-red-600 flex items-center justify-center"
                                                    : "text-gray-900"
                                            }`}
                                        >
                                            {isDelM && (
                                                <ExclamationTriangleIcon
                                                    className="h-5 w-5 inline"
                                                    aria-hidden="true"
                                                />
                                            )}
                                            {title}
                                        </Dialog.Title>

                                        {/* main content */}
                                        {children}
                                    </div>
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