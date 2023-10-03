import React, { Fragment } from "react";
import type { FC } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { useSubmit } from "react-router-dom";
import type { TclientView } from "@/configs/schema/client";
import Card from "@/components/card";

type Tprops = {
    client: TclientView;
    setOpen: (value: TclientView) => void;
};

// this component is about building a modal with transition to delete a client
const MDelete: FC<Tprops> = ({ client, setOpen }) => {
    const submit = useSubmit();

    const handleDeleteClient = async (id: number) => {
        submit({ id }, { method: "DELETE", action: "/clients" });
    };

    const clientDisplay = (
        <Card className="mt-2">
            <div className="m-3 grid grid-cols-6 gap-x-4 gap-y-4 text-left">
                <div className="col-span-5">
                    <p>
                        <b className="text-indigo-600">Client: </b>{" "}
                        {client.full_name}
                    </p>
                </div>
                <div className="col-span-3">
                    <p>
                        <b className="text-indigo-600">Phone: </b>{" "}
                        {client?.phone}
                    </p>
                </div>
                <div className="col-span-3">
                    <p>
                        <b className="text-indigo-600">Postal code: </b>
                        {client?.postcode}
                    </p>
                </div>
                <div className="col-span-6">
                    <p>
                        <b className="text-indigo-600">Email: </b>{" "}
                        {client?.email}
                    </p>
                </div>
                <div className="col-span-6">
                    <p>
                        <b className="text-indigo-600">Address: </b>{" "}
                        {client?.address}, {client?.city}, {client?.state},{" "}
                        {client?.country}
                    </p>
                </div>
            </div>
        </Card>
    );

    return (
        <Transition.Root show={!!client.id} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-20 inset-0 overflow-y-auto"
                onClose={(_) => setOpen({ ...client, id: 0 })}
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
                                {/* content area */}
                                <div className="mt-1 text-center">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-base font-semibold leading-6 text-red-600 flex items-center justify-center"
                                    >
                                        <ExclamationTriangleIcon
                                            className="h-5 w-5 inline"
                                            aria-hidden="true"
                                        />
                                        DELETE WARNING
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-gray-700 text-lg">
                                            Are you sure you want to this client
                                            from database?
                                        </p>
                                        {clientDisplay}
                                    </div>
                                </div>
                                {/* button area */}
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={() => {
                                            handleDeleteClient(client.id);
                                            setOpen({ ...client, id: 0 });
                                        }}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setOpen({ ...client, id: 0 });
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
