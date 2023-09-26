import React, { FC, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Form } from "react-router-dom";
import { EnvelopeIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface prop {
    open: boolean;
    setOpen: (value: boolean) => void;
}

type t_state = "SA" | "VIC" | "QLD" | "NS" | "WA" | "TAS";

const AddNew: FC<prop> = ({ open, setOpen }) => {
    const [state, setState] = useState<t_state>("SA");
    const [city, setCity] = useState<string>("Adelaide");
    const handleState = (e: any) => {
        setState(e.target.value as t_state);
    };
    const handleCity = (e: any) => {
        setCity(e.target.value as string);
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                <div className="fixed inset-0 z-10 overflow-y-auto border-2">
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
                            <Dialog.Panel className="relative transform overflow-hidden  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                {/* right top close button */}
                                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>

                                <div className="sm:flex sm:items-start">
                                    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationTriangleIcon
                                            className="h-6 w-6 text-red-600"
                                            aria-hidden="true"
                                        />
                                    </div> */}
                                    {/* title */}
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            Add New Client
                                        </Dialog.Title>
                                        {/* content */}
                                        <Form method="POST" action="/clients">
                                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                                Personal Information
                                            </h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                                Use a permanent address where
                                                you can receive mail.
                                            </p>

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
                                                            type="text"
                                                            name="first_name"
                                                            id="first_name"
                                                            autoComplete="given-name"
                                                            required
                                                            className="p-9 pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                            type="text"
                                                            name="last_name"
                                                            id="last_name"
                                                            autoComplete="family-name"
                                                            required
                                                            className="p-9 pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                    <div className="relative mt-2 rounded-md shadow-sm">
                                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                            <EnvelopeIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </div>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            id="email"
                                                            required
                                                            className="h-9 block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            placeholder="you@example.com"
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
                                                    <div className="mt-1">
                                                        <input
                                                            type="text"
                                                            id="phone"
                                                            name="phone"
                                                            autoComplete="tel"
                                                            className="h-9 pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                                                        <select
                                                            id="country"
                                                            name="country"
                                                            autoComplete="country-name"
                                                            value="Australia"
                                                            onChange={(e) => {}}
                                                            className="h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                        >
                                                            <option>
                                                                Australia
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <label
                                                        htmlFor="street-address"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Street address
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="text"
                                                            name="street-address"
                                                            id="street-address"
                                                            autoComplete="street-address"
                                                            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                            type="text"
                                                            name="city"
                                                            id="city"
                                                            value={city}
                                                            onChange={
                                                                handleCity
                                                            }
                                                            autoComplete="address-level2"
                                                            className="h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label
                                                        htmlFor="region"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        State / Province
                                                    </label>
                                                    <div className="mt-1">
                                                        <select
                                                            id="state"
                                                            name="state"
                                                            autoComplete="state-name"
                                                            value={state}
                                                            onChange={
                                                                handleState
                                                            }
                                                            className="h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
                                                        >
                                                            <option>SA</option>
                                                            <option>NS</option>
                                                            <option>VIC</option>
                                                            <option>TAS</option>
                                                            <option>WA</option>
                                                            <option>QLD</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label
                                                        htmlFor="postal-code"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        ZIP / Postal code
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="text"
                                                            name="postal-code"
                                                            id="postal-code"
                                                            autoComplete="postal-code"
                                                            className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse border-t border-gray-900/10 pt-4">
                                                <button
                                                    type="submit"
                                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                    /* onClick={() =>
                                                        setOpen(false)
                                                    } */
                                                >
                                                    Create
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }
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

export default AddNew;
