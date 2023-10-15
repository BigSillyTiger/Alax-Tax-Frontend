import React, { Fragment, useEffect } from "react";
import type {
    FC,
    FormEvent,
    MouseEvent,
    TouchEvent,
    ChangeEvent,
    ReactNode,
} from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import clsx from "clsx";
import {
    TnewOrder,
    TnewOrderDesc,
    newOrderSchema,
    newOrderDescSchema,
} from "@/utils/schema/orderSchema";
import { Tclient } from "@/utils/schema/clientSchema";
import Card from "@/components/card";

type Tprops = {
    client: Tclient; // for client id
    setOpen: (client: Tclient) => void;
};

const initOrderDesc: TnewOrderDesc = {
    description: "service",
    qty: 1,
    unit: "m",
    unit_price: 10,
    netto: 10,
};

const MOrderAdd: FC<Tprops> = ({ client, setOpen }) => {
    const navigation = useNavigation();
    const submit = useSubmit();

    const {
        register,
        trigger,
        reset,
        getValues,
        formState: { errors },
        control,
        handleSubmit,
    } = useForm<TnewOrder>({
        resolver: zodResolver(newOrderSchema),
        defaultValues: { order_desc: [initOrderDesc] },
    });

    const { fields, append, remove } = useFieldArray({
        name: "order_desc",
        control,
    });

    useEffect(() => {
        if (client) {
            reset({
                order_address: client.address ?? undefined,
                order_suburb: client.suburb ?? undefined,
                order_city: client.city ?? undefined,
                order_state: client.state ?? undefined,
                order_country: client.country ?? undefined,
                order_pc: client.postcode ?? undefined,
                order_desc: [{ ...initOrderDesc }],
            });
        }
    }, [client, reset]);

    const handleClose = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        setOpen({ ...client, client_id: 0 });
        reset();
    };

    const onSubmit = async (e: FormEvent) => {
        //const onSubmit = async (data: TnewOrder) => {
        e.preventDefault();
        const isValid = await trigger();
        //console.log("-> submit isValid: ", errors);
        if (isValid) {
            const values = JSON.stringify({
                ...getValues(),
                client_id: client.client_id,
            });
            //console.log("-> submit values: ", values);
            submit(
                { values },
                {
                    action: `/clients/${client.client_id}`,
                    method: "POST",
                }
            );
        }
    };

    const addressContent = (
        <Card className="mt-1 mb-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            {/* street */}
            <div className="col-span-full">
                <label
                    htmlFor="order_address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Street address
                </label>
                <div className="mt-1">
                    <input
                        {...register("order_address")}
                        type="text"
                        id="order_address"
                        autoComplete="street-address"
                        className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    />
                </div>
            </div>

            <div className="sm:col-span-2">
                <label
                    htmlFor="order_suburb"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Suburb
                </label>
                <div className="mt-1">
                    <input
                        {...register("order_suburb")}
                        type="text"
                        id="order_suburb"
                        autoComplete="address-level2"
                        className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    />
                </div>
            </div>

            {/* city */}
            <div className="sm:col-span-2">
                <label
                    htmlFor="order_city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    City
                </label>
                <div className="mt-1">
                    <input
                        {...register("order_city")}
                        type="text"
                        id="order_city"
                        autoComplete="address-level2"
                        className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    />
                </div>
            </div>

            {/* state */}
            <div className="sm:col-span-2">
                <label
                    htmlFor="order_state"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    State
                </label>
                <div className="mt-1">
                    <select
                        {...register("order_state")}
                        id="order_state"
                        autoComplete="state-name"
                        className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    >
                        <option value="NSW">NSW</option>
                        <option value="QLD">QLD</option>
                        <option value="SA">SA</option>
                        <option value="TAS">TAS</option>
                        <option value="VIC">VIC</option>
                        <option value="WA">WA</option>
                    </select>
                </div>
            </div>

            {/* country */}
            <div className="sm:col-span-2">
                <label
                    htmlFor="order_country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Country
                </label>
                <div className="mt-1">
                    <input
                        {...register("order_country")}
                        type="text"
                        disabled
                        id="order_country"
                        autoComplete="country-name"
                        className="outline-none pl-2 h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            {/* postcode */}
            <div className="sm:col-span-1">
                <label
                    htmlFor="order_pc"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Postcode
                </label>

                <div className="mt-1">
                    <input
                        {...register("order_pc")}
                        type="text"
                        id="order_pc"
                        autoComplete="postal-code"
                        className={clsx(
                            "outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 pl-2",
                            errors.order_pc
                                ? "ring-2 ring-red-600 focus:ring-red-400"
                                : "ring-1 ring-gray-300 focus:ring-indigo-600"
                        )}
                    />
                </div>
            </div>
        </Card>
    );

    const descContent =
        fields.length != 0 &&
        fields.map((field, index) => {
            return (
                <section
                    key={field.id}
                    className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6"
                >
                    <div className="col-span-full">
                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                            onClick={() => remove(index)}
                        >
                            Delete
                        </button>
                    </div>
                    <div className="col-span-full">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Description
                        </label>
                        <input
                            {...register(`order_desc.${index}.description`)}
                            id="description"
                            type="text"
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-1">
                        <label
                            htmlFor="qty"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Qty
                        </label>
                        <input
                            {...register(`order_desc.${index}.qty`, {
                                valueAsNumber: true,
                            })}
                            id="qty"
                            type="number"
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-1">
                        <label
                            htmlFor="unit"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Unit
                        </label>
                        <input
                            {...register(`order_desc.${index}.unit`)}
                            id="unit"
                            type="text"
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                        <label
                            htmlFor="unit_price"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Unit Price
                        </label>
                        <input
                            {...register(`order_desc.${index}.unit_price`, {
                                valueAsNumber: true,
                            })}
                            id="unit_price"
                            type="number"
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                        <label
                            htmlFor="netto"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Netto
                        </label>
                        <input
                            {...register(`order_desc.${index}.netto`, {
                                valueAsNumber: true,
                            })}
                            id="netto"
                            type="number"
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                </section>
            );
        });

    return (
        <Transition.Root show={!!client.client_id} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={(value) => {
                    setOpen({ ...client, client_id: 0 });
                    reset();
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
                <div className="fixed inset-0 z-10 overflow-y-auto">
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
                            <Dialog.Panel className="relative overflow-hidden  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-xl sm:p-6">
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
                                {/* title */}
                                <Dialog.Title
                                    as="h3"
                                    className="text-base font-semibold leading-6 text-gray-900 mb-2"
                                >
                                    Add New Order
                                </Dialog.Title>

                                <div className="sm:flex sm:items-start mt-3 text-center px-3 mx-auto sm:text-left">
                                    {/* Form */}
                                    {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
                                    <Form onSubmit={onSubmit}>
                                        {/* addres */}
                                        <span className="text-indigo-500">
                                            <b>Work Address:</b>
                                        </span>
                                        {addressContent}

                                        {/* order description */}
                                        <span className="text-indigo-500">
                                            <b>Order Descriptions:</b>
                                        </span>
                                        <Card className="mt-1 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                            <div className="col-span-full">
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:w-auto"
                                                    onClick={() =>
                                                        append(initOrderDesc)
                                                    }
                                                >
                                                    Append service description
                                                </button>
                                            </div>
                                            <Card className="col-span-full">
                                                {descContent}
                                            </Card>
                                        </Card>

                                        {/* buttons */}
                                        <div className="mt-4 sm:flex sm:flex-row-reverse justify-evenly mx-auto pt-4">
                                            <button
                                                name="intent"
                                                value="add"
                                                type="submit"
                                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:w-auto"
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
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default MOrderAdd;
