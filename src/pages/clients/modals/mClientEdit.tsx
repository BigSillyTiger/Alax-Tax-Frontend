import React, { Fragment, useState, useEffect } from "react";
import type { FC, FormEvent, MouseEvent, TouchEvent, ChangeEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { set, useForm } from "react-hook-form";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import type { Tclient } from "@/utils/schema/clientSchema";
import { clientNoIDSchema } from "@/utils/schema/clientSchema";
import {
    XMarkIcon,
    EnvelopeIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import { RES_STATUS } from "@/utils/types";

type Tprops = {
    client: Tclient;
    setOpen: (open: Tclient) => void;
    isConflict: number;
};

const initClient = {
    client_id: 0,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    suburb: "",
    city: "",
    state: "",
    country: "",
    postcode: "",
};

// this component is about building a modal with transition to update a client
// the modal structure is similar to MAddNewClient
const MClientEdit: FC<Tprops> = ({ client, setOpen, isConflict }) => {
    const submit = useSubmit();
    const navigation = useNavigation();

    const {
        register,
        getValues,
        formState: { errors },
        trigger,
        reset,
    } = useForm<Tclient>({
        resolver: zodResolver(clientNoIDSchema),
        defaultValues: client,
    });

    useEffect(() => {
        reset(client);
    }, [client, reset]);

    const handleClose = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();

        setOpen(initClient);
    };

    const onSubmit = async (e: FormEvent) => {
        const isValid = await trigger();
        e.preventDefault();
        if (isValid) {
            const values = getValues();
            submit(
                { ...values, id: client.client_id },
                { method: "PUT", action: "/clients" }
            );
        }
    };

    return (
        <Transition.Root show={!!client.client_id} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-21"
                onClose={(_) => {
                    setOpen(initClient);
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

                {/*  */}
                <div className="fixed inset-0 z-20 overflow-y-auto border-2">
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
                            {/* removed transform */}
                            <Dialog.Panel className="relative overflow-hidden  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                {/* right top close button */}
                                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
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

                                <div className="sm:flex sm:items-start">
                                    {/* title */}
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            Update Client Info
                                        </Dialog.Title>
                                        {/* content */}
                                        <Form
                                            /* method="POST"
                                            action="/clients" */
                                            onSubmit={onSubmit}
                                        >
                                            {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                                                Use a permanent address where
                                                you can receive mail.
                                            </p> */}

                                            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label
                                                        htmlFor="first_name"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        First name
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            {...register(
                                                                "first_name"
                                                            )}
                                                            type="text"
                                                            id="first_name"
                                                            autoComplete="given-name"
                                                            required
                                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label
                                                        htmlFor="last_name"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Last name
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            {...register(
                                                                "last_name"
                                                            )}
                                                            id="last_name"
                                                            type="text"
                                                            autoComplete="family-name"
                                                            required
                                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-4">
                                                    <label
                                                        htmlFor="email"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Email address
                                                    </label>
                                                    <div className="relative mt-1 rounded-md shadow-sm">
                                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                            <EnvelopeIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </div>
                                                        <input
                                                            {...register(
                                                                "email"
                                                            )}
                                                            type="email"
                                                            id="email"
                                                            required
                                                            className={clsx(
                                                                "outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-10",
                                                                (isConflict ===
                                                                    RES_STATUS.FAILED_DUP_EMAIL ||
                                                                    isConflict ===
                                                                        RES_STATUS.FAILED_DUP_P_E) &&
                                                                    "ring-2 ring-red-500 focus:ring-red-600",
                                                                (isConflict ===
                                                                    RES_STATUS.SUCCESS ||
                                                                    isConflict ===
                                                                        RES_STATUS.FAILED_DUP_PHONE) &&
                                                                    "ring-1 ring-gray-300 focus:ring-indigo-600"
                                                            )}
                                                            placeholder="you@example.com"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-4">
                                                    <label
                                                        htmlFor="phone"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Phone
                                                    </label>
                                                    <div className="relative mt-1 rounded-md shadow-sm">
                                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                            <PhoneIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </div>
                                                        <input
                                                            {...register(
                                                                "phone"
                                                            )}
                                                            type="text"
                                                            id="phone"
                                                            autoComplete="tel"
                                                            placeholder="0-xxx-xxx-xxx"
                                                            className={clsx(
                                                                "outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-10",
                                                                (isConflict ===
                                                                    RES_STATUS.FAILED_DUP_PHONE ||
                                                                    isConflict ===
                                                                        RES_STATUS.FAILED_DUP_P_E) &&
                                                                    "ring-2 ring-red-500 focus:ring-red-600",
                                                                (isConflict ===
                                                                    RES_STATUS.SUCCESS ||
                                                                    isConflict ===
                                                                        RES_STATUS.FAILED_DUP_EMAIL) &&
                                                                    "ring-1 ring-gray-300 focus:ring-indigo-600"
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <label
                                                        htmlFor="address"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Street address
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            {...register(
                                                                "address"
                                                            )}
                                                            type="text"
                                                            id="address"
                                                            autoComplete="street-address"
                                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label
                                                        htmlFor="suburb"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Suburb
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            {...register(
                                                                "suburb"
                                                            )}
                                                            type="text"
                                                            id="suburb"
                                                            autoComplete="address-level1"
                                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label
                                                        htmlFor="city"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        City
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            {...register(
                                                                "city"
                                                            )}
                                                            type="text"
                                                            id="city"
                                                            autoComplete="address-level2"
                                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label
                                                        htmlFor="state"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        State
                                                    </label>
                                                    <div className="mt-1">
                                                        <select
                                                            {...register(
                                                                "state"
                                                            )}
                                                            id="state"
                                                            autoComplete="state-name"
                                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                                        >
                                                            <option value="SA">
                                                                SA
                                                            </option>
                                                            <option value="NS">
                                                                NS
                                                            </option>
                                                            <option value="VIC">
                                                                VIC
                                                            </option>
                                                            <option value="TAS">
                                                                TAS
                                                            </option>
                                                            <option value="WA">
                                                                WA
                                                            </option>
                                                            <option value="QLD">
                                                                QLD
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label
                                                        htmlFor="country"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Country
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            {...register(
                                                                "country"
                                                            )}
                                                            type="text"
                                                            disabled
                                                            id="country"
                                                            autoComplete="country-name"
                                                            className="outline-none pl-2 h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <>
                                                        <label
                                                            htmlFor="postcode"
                                                            className="block text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            Postcode
                                                        </label>
                                                    </>
                                                    <div className="mt-1">
                                                        <input
                                                            {...register(
                                                                "postcode"
                                                            )}
                                                            type="text"
                                                            id="postcode"
                                                            autoComplete="postal-code"
                                                            className={clsx(
                                                                "outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 pl-2",
                                                                errors.postcode
                                                                    ? "ring-2 ring-red-600 focus:ring-red-400"
                                                                    : "ring-1 ring-gray-300 focus:ring-indigo-600"
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse border-t border-gray-900/10 pt-4">
                                                <button
                                                    type="submit"
                                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                    disabled={
                                                        navigation.state ===
                                                            "submitting" ||
                                                        navigation.state ===
                                                            "loading"
                                                    }
                                                    onClick={() => trigger()}
                                                >
                                                    {navigation.state ===
                                                    "submitting"
                                                        ? "Submitting..."
                                                        : "Submit"}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={handleClose}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </Form>
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

export default MClientEdit;