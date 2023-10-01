import React, { Fragment, useState } from "react";
import type { FC, FormEvent, MouseEvent, TouchEvent, ChangeEvent } from "react";
import type { TclientView } from "@/configs/schema/client";
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Card from "@/components/card";

type Tprops = {
    client: TclientView | null;
    setOpen: (open: TclientView | null) => void;
    deleteClientID: number;
    setDeleteDialogOpen: (value: number) => void;
};

// a modal based on headlessui to display client info
const MClientInfo: FC<Tprops> = ({
    client,
    setOpen,
    deleteClientID,
    setDeleteDialogOpen,
}) => {
    //const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const handleClose = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        setOpen(null);
    };

    return (
        <Transition.Root show={!!client} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={(_) => {
                    !deleteClientID && setOpen(null);
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

                {/* main content area */}
                <div className="fixed inset-0 z-10 border-2 top-[7vh] h-[93vh] w-screen lg:w-[95vw] lg:left-[5vw] ">
                    <div className="flex min-h-full text-center justify-end">
                        <Transition.Child
                            as={Fragment}
                            enter="transition transform duration-300 ease-out"
                            enterFrom="translate-x-full opacity-0"
                            enterTo="translate-x-0 opacity-100"
                            leave="transition transform duration-300 ease-in"
                            leaveFrom="translate-x-0 opacity-100"
                            leaveTo="translate-x-full opacity-0"
                        >
                            <Dialog.Panel className="relative overflow-hidden bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-full md:max-w-xl lg:max-w-2xl  h-[93vh]">
                                {/* right top close button */}
                                <div className="absolute right-0 top-0 pr-4 pt-4 block">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={handleClose}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                                <div className="flex flex-col p-2 w-full h-full text-left">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-base font-semibold leading-6 text-gray-900"
                                    >
                                        <b className="text-indigo-600">
                                            Client:
                                        </b>{" "}
                                        {client?.full_name}
                                    </Dialog.Title>
                                    <Card className="mt-4 w-full">
                                        <div className="m-3 grid grid-cols-6 gap-x-4 gap-y-4">
                                            <div className="col-span-3">
                                                <p>
                                                    <b className="text-indigo-600">
                                                        Phone:{" "}
                                                    </b>{" "}
                                                    {client?.phone}
                                                </p>
                                            </div>
                                            <div className="col-span-3">
                                                <p>
                                                    <b className="text-indigo-600">
                                                        Postal code:{" "}
                                                    </b>
                                                    {client?.postcode}
                                                </p>
                                            </div>
                                            <div className="col-span-6">
                                                <p>
                                                    <b className="text-indigo-600">
                                                        Email:{" "}
                                                    </b>{" "}
                                                    {client?.email}
                                                </p>
                                            </div>
                                            <div className="col-span-6">
                                                <p>
                                                    <b className="text-indigo-600">
                                                        Address:{" "}
                                                    </b>{" "}
                                                    {client?.address},{" "}
                                                    {client?.city},{" "}
                                                    {client?.state},{" "}
                                                    {client?.country}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-center col-span-6">
                                                <div className="w-full border-y border-gray-200" />
                                                <button
                                                    className="mt-2 mb-1 inset-1 border-0 ring-2 ring-indigo-600"
                                                    onClick={() => {
                                                        console.log(
                                                            "-> delete click: ",
                                                            client?.id
                                                        );
                                                        setDeleteDialogOpen(
                                                            (client!
                                                                .id as number) ||
                                                                0
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="mt-4 h-[20vh]">
                                        <div className="w-full h-screen"></div>
                                    </Card>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default MClientInfo;
