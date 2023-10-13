import React, { Fragment, useState, useEffect, useDeferredValue } from "react";
import type { FC, FormEvent, MouseEvent, TouchEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import type { Tservice, Tunit } from "@/utils/schema/manageSchema";
import { newServiceSchema, newUnitSchema } from "@/utils/schema/manageSchema";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { isServiceType } from "@/utils/utils";

type Tprops = {
    uni: Tservice | Tunit;
    setOpen: (open: Tservice | Tunit) => void;
    serviceList: Tservice[] | null;
    unitList: Tunit[] | null;
};

// this component is about building a modal with transition to update a client
// the modal structure is similar to MAddNewClient
const MUniEdit: FC<Tprops> = ({ uni, setOpen, serviceList, unitList }) => {
    const [isConflict, setIsConflict] = useState(false);
    // service
    const [service, setService] = useState("");
    const [unit, setUnit] = useState("");
    const [unitPrice, setUnitPrice] = useState(0);
    // unit
    const [unitName, setUnitName] = useState("");

    const defService = useDeferredValue(service);
    const defUnit = useDeferredValue(unit);
    const defUnitPrice = useDeferredValue(unitPrice);
    const defUnitName = useDeferredValue(unitName);

    const submit = useSubmit();
    const navigation = useNavigation();

    const schema = isServiceType(uni) ? newServiceSchema : newUnitSchema;

    useEffect(() => {
        if (isServiceType(uni)) {
            setService(uni.service);
            setUnit(uni.unit);
            setUnitPrice(uni.unit_price);
        } else {
            setUnitName(uni.unit_name);
        }
        reset();
    }, [isServiceType(uni) ? uni.service : uni.unit_name]);

    useEffect(() => {
        if (isServiceType(uni) && defService) {
            const isDup = serviceList?.some(
                (item) => item.service === defService && item.id !== uni.id
            );
            setIsConflict(isDup ? true : false);
        } else if (defUnitName) {
            const isDup = unitList?.some(
                (item) => item.unit_name === defUnitName && item.id !== uni.id
            );
            setIsConflict(isDup ? true : false);
        }
    }, [isServiceType(uni) ? defService : defUnitName]);

    const {
        register,
        reset,
        getValues,
        formState: { errors },
        trigger,
    } = useForm<Tservice | Tunit>({ resolver: zodResolver(schema) });

    const handleClose = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();

        setOpen({
            ...uni,
            id: 0,
        });
    };

    const onSubmit = async (e: FormEvent) => {
        const isValid = await trigger();
        e.preventDefault();
        if (isValid) {
            const values = getValues();
            submit(
                { ...values, id: uni.id },
                { method: "PUT", action: "/management" }
            );
        }
    };

    return (
        <Transition.Root show={!!uni.id} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-21"
                onClose={(_) => {
                    console.log("-> called onclose");
                    setOpen({
                        ...uni,
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
                <div className="fixed inset-0 z-20 overflow-y-auto">
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
                            <Dialog.Panel
                                className={clsx(
                                    "relative overflow-hidden  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full  sm:p-6",
                                    isServiceType(uni)
                                        ? "sm:max-w-lg"
                                        : "sm:max-w-xs"
                                )}
                            >
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
                                    <div className="mt-3 text-center sm:mx-auto sm:mt-0 sm:text-left w-full ">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            Edit{" "}
                                            {isServiceType(uni)
                                                ? "Service"
                                                : "Unit"}
                                        </Dialog.Title>
                                        {/* content */}
                                        <Form onSubmit={onSubmit}>
                                            {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                                                Use a permanent address where
                                                you can receive mail.
                                            </p> */}
                                            {/* conditional form */}
                                            {isServiceType(uni) ? (
                                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                                    <div className="sm:col-span-6">
                                                        <label
                                                            htmlFor="service"
                                                            className="block text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            Service
                                                        </label>
                                                        <div className="relative mt-1 rounded-md shadow-sm">
                                                            <input
                                                                {...register(
                                                                    "service"
                                                                )}
                                                                type="service"
                                                                name="service"
                                                                id="service"
                                                                required
                                                                className={clsx(
                                                                    "outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-2",
                                                                    isConflict
                                                                        ? "ring-2 ring-red-500 focus:ring-red-600"
                                                                        : "ring-1 ring-gray-300 focus:ring-indigo-600"
                                                                )}
                                                                value={service}
                                                                onChange={(e) =>
                                                                    setService(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-3">
                                                        <label
                                                            htmlFor="unit"
                                                            className="block text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            Unit
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                {...register(
                                                                    "unit"
                                                                )}
                                                                type="text"
                                                                name="unit"
                                                                id="unit"
                                                                required
                                                                className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                                                value={unit}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    setUnit(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-3">
                                                        <label
                                                            htmlFor="unit_price"
                                                            className="block text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            Unit Price
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                {...register(
                                                                    "unit_price",
                                                                    {
                                                                        // use this to convert value into number
                                                                        valueAsNumber:
                                                                            true,
                                                                    }
                                                                )}
                                                                type="text"
                                                                name="unit_price"
                                                                id="unit_price"
                                                                required
                                                                className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                                                value={
                                                                    unitPrice
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    setUnitPrice(
                                                                        Number(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                                    <div className="sm:col-span-6">
                                                        <label
                                                            htmlFor="unit_name"
                                                            className="block text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            Unit
                                                        </label>
                                                        <div className="relative mt-1 rounded-md shadow-sm">
                                                            <input
                                                                {...register(
                                                                    "unit_name"
                                                                )}
                                                                type="unit_name"
                                                                name="unit_name"
                                                                id="unit_name"
                                                                required
                                                                className={clsx(
                                                                    "outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-2",
                                                                    isConflict
                                                                        ? "ring-2 ring-red-500 focus:ring-red-600"
                                                                        : "ring-1 ring-gray-300 focus:ring-indigo-600"
                                                                )}
                                                                value={unitName}
                                                                onChange={(e) =>
                                                                    setUnitName(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse border-t border-gray-900/10 pt-4 justify-evenly">
                                                <button
                                                    type="submit"
                                                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
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

export default MUniEdit;
