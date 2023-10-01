import React, { Fragment } from "react";
import type { FC } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { useSubmit } from "react-router-dom";
import { API_CLIENT } from "@/apis";
import { toastSuccess } from "@/configs/utils";
import { TclientView } from "@/configs/schema/client";

type Tprops = {
    id: number;
    setOpen: (value: number) => void;
    setClientInfo: (value: TclientView | null) => void;
};

// this component is about building a modal with transition to delete a client
const MDelete: FC<Tprops> = ({ id, setOpen, setClientInfo }) => {
    console.log("-> modal delete: ", id);
    const submit = useSubmit();

    const handleDeleteClient = async (id: number) => {
        submit({ id }, { method: "DELETE", action: "/clients" });
        //const result = await API_CLIENT.delSingleClient(id);
        //result && toastSuccess("Delete a client");
    };

    return (
        <Transition.Root show={!!id} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-20 inset-0 overflow-y-auto"
                onClose={(_) => setOpen(0)}
            >
                {/* background */}
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/80" />
                </Transition.Child>

                {/* main content area */}
                <div className="fixed inset-0 z-10 overflow-y-auto border-2">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-out duration-300 transform"
                            enterFrom="translate-y-4 opacity-0"
                            enterTo="translate-y-0 opacity-100"
                            leave="transition ease-in duration-200 transform"
                            leaveFrom="translate-y-0 opacity-100"
                            leaveTo="translate-y-4 opacity-0"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationTriangleIcon
                                            className="h-6 w-6 text-red-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            DELETE WARNING
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-gray-500 text-lg">
                                                Are you sure you want to this
                                                client from database?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={() => {
                                            handleDeleteClient(id);
                                            setOpen(0);
                                            setClientInfo(null);
                                        }}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setOpen(0);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default MDelete;
