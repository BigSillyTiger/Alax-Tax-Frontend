import React, { Fragment, useState, useEffect } from "react";
import type { FC, FormEvent, MouseEvent, TouchEvent, ChangeEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { set, useForm } from "react-hook-form";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import type { Tclient, TclientView } from "@/utils/schema/client";
import { clientNoIDSchema } from "@/utils/schema/client";
import {
    XMarkIcon,
    EnvelopeIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import { RES_STATUS } from "@/utils/types";

type Tprops = {
    client: TclientView;
    setOpen: (open: TclientView) => void;
    isConflict: number;
};
// this component is about building a modal with transition to update a client
// the modal structure is similar to MAddNewClient
const MClientEdit: FC<Tprops> = ({ client, setOpen, isConflict }) => {
    // set default value based on client for id first_name, last_name, phone, email, address, city, state, country, postcode
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [postcode, setPostcode] = useState("");

    const submit = useSubmit();
    const navigation = useNavigation();

    useEffect(() => {
        setFirstName(client?.full_name.split(" ")[0]);
        setLastName(client?.full_name.split(" ")[1]);
        setPhone(client.phone);
        setEmail(client.email);
        setAddress(client.address || "");
        setCity(client.city || "");
        setState(client.state || "");
        setCountry(client.country || "");
        setPostcode(client.postcode || "");
        reset();
    }, [client.phone]);

    const {
        register,
        reset,
        getValues,
        formState: { errors },
        trigger,
    } = useForm<Tclient>({ resolver: zodResolver(clientNoIDSchema) });

    const handleClose = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();

        setOpen({
            ...client,
            id: 0,
        });
    };

    const onSubmit = async (e: FormEvent) => {
        const isValid = await trigger();
        e.preventDefault();
        if (isValid) {
            const values = getValues();
            submit(
                { ...values, id: client.id },
                { method: "PUT", action: "/clients" }
            );
        }
    };

    return (
        <Transition.Root show={!!client.id} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-21"
                onClose={(_) => {
                    console.log("-> called onclose");
                    setOpen({
                        ...client,
                        id: 0,
                    });
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
                                                            name="first_name"
                                                            id="first_name"
                                                            autoComplete="given-name"
                                                            required
                                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                                            value={firstName}
                                                            onChange={(e) => {
                                                                e.preventDefault();
                                                                setFirstName(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
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
                                                            type="text"
                                                            name="last_name"
                                                            id="last_name"
                                                            autoComplete="family-name"
                                                            required
                                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                                            value={lastName}
                                                            onChange={(e) => {
                                                                e.preventDefault();
                                                                setLastName(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
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
                                                            name="email"
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
                                                            value={email}
                                                            onChange={(e) => {
                                                                e.preventDefault();
                                                                setEmail(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
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
                                                            name="phone"
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
                                                            value={phone}
                                                            onChange={(e) => {
                                                                e.preventDefault();
                                                                setPhone(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
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
                                                            //disabled
                                                            id="country"
                                                            name="country"
                                                            autoComplete="country-name"
                                                            className="outline-none pl-2 h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            value={
                                                                country as string
                                                            }
                                                            onChange={(e) => {
                                                                e.preventDefault();
                                                                setCountry(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
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
                                                            name="address"
                                                            id="address"
                                                            autoComplete="street-address"
                                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                                            value={address}
                                                            onChange={(e) => {
                                                                e.preventDefault();
                                                                setAddress(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2 sm:col-start-1">
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
                                                            name="city"
                                                            id="city"
                                                            autoComplete="address-level2"
                                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                                            value={city}
                                                            onChange={(e) => {
                                                                e.preventDefault();
                                                                setCity(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label
                                                        htmlFor="region"
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
                                                            name="state"
                                                            autoComplete="state-name"
                                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                                            value={state}
                                                            onChange={(e) => {
                                                                e.preventDefault();
                                                                setState(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
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
                                                            name="postcode"
                                                            id="postcode"
                                                            autoComplete="postal-code"
                                                            className={clsx(
                                                                "outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 pl-2",
                                                                errors.postcode
                                                                    ? "ring-2 ring-red-600 focus:ring-red-400"
                                                                    : "ring-1 ring-gray-300 focus:ring-indigo-600"
                                                            )}
                                                            value={postcode}
                                                            onChange={(e) => {
                                                                e.preventDefault();
                                                                setPostcode(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
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
