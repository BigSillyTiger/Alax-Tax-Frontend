import React, { Fragment, useEffect, useState, useDeferredValue } from "react";
import type { FC, FormEvent, MouseEvent, TouchEvent } from "react";
import { useForm } from "react-hook-form";
import { useTranslation, Trans } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Transition, Dialog } from "@headlessui/react";
import {
    TnewService,
    TnewUnit,
    Tservice,
    Tunit,
} from "@/utils/schema/manageSchema";
import { newServiceSchema, newUnitSchema } from "@/utils/schema/manageSchema";
import clsx from "clsx";
import { toastError } from "@/utils/utils";

type Tprops = {
    open: "S" | "U" | false;
    setOpen: (open: "S" | "U" | false) => void;
    serviceList: Tservice[] | null;
    unitList: Tunit[] | null;
};

const MUniAdd: FC<Tprops> = ({ open, setOpen, serviceList, unitList }) => {
    const [value, setValue] = useState("");
    const [isConflict, setIsConflict] = useState(false);
    const defferedValue = useDeferredValue(value);
    const navigation = useNavigation();
    const { t } = useTranslation();
    const submit = useSubmit();
    const schema = open === "S" ? newServiceSchema : newUnitSchema;

    const {
        register,
        trigger,
        reset,
        getValues,
        formState: { errors },
    } = useForm<TnewService | TnewUnit>({ resolver: zodResolver(schema) });

    useEffect(() => {
        if (defferedValue) {
            if (open === "S") {
                const isDup = serviceList?.some(
                    (item) => item.service === defferedValue
                );
                setIsConflict(isDup ? true : false);
            } else {
                const isDup = unitList?.some(
                    (item) => item.unit_name === defferedValue
                );
                setIsConflict(isDup ? true : false);
            }
        }
    }, [defferedValue]);

    const handleClose = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        setOpen(false);
        reset();
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const isValid = await trigger();
        if (isConflict) {
            toastError("Input Date is duplicated.");
        }

        if (isValid && !isConflict) {
            const values = getValues();
            submit(values, { action: "/management", method: "POST" });
            //reset();
        }
    };

    const unitOptionList = unitList ? (
        <datalist id="unit_option">
            {unitList.map((item) => (
                <option key={item.unit_name}>{item.unit_name}</option>
            ))}
        </datalist>
    ) : null;

    return (
        <Transition.Root show={!!open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={(value) => {
                    reset();
                    setOpen(false);
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
                            {/* removed transform */}
                            <Dialog.Panel
                                className={clsx(
                                    "relative overflow-hidden  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full  sm:p-6",
                                    open === "S" ? "sm:max-w-lg" : "sm:max-w-xs"
                                )}
                            >
                                {/* right top close button */}
                                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={handleClose}
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
                                    {/* title */}
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            {open === "S"
                                                ? "Add New Service"
                                                : "Add New Unit"}
                                        </Dialog.Title>
                                        {/* content */}
                                        <Form onSubmit={onSubmit}>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                                <Trans
                                                    defaults={t(
                                                        "modal.tips.addUni"
                                                    )}
                                                    values={{
                                                        name:
                                                            open === "S"
                                                                ? "service"
                                                                : "unit",
                                                    }}
                                                    components={{
                                                        b: (
                                                            <strong className="text-red-400" />
                                                        ),
                                                    }}
                                                />
                                            </p>
                                            {open === "S" ? (
                                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                                    <div className="col-span-6">
                                                        <label
                                                            htmlFor="service"
                                                            className="block text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            {t(
                                                                "form.serviceDesc"
                                                            )}
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                {...register(
                                                                    "service"
                                                                )}
                                                                type="text"
                                                                name="service"
                                                                id="service"
                                                                required
                                                                value={value}
                                                                onChange={(e) =>
                                                                    setValue(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className={clsx(
                                                                    "outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-2",
                                                                    isConflict
                                                                        ? "ring-2 ring-red-500 focus:ring-red-600"
                                                                        : "ring-1 ring-gray-300 focus:ring-indigo-600"
                                                                )}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label
                                                            htmlFor="unit"
                                                            className="block text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            {t(
                                                                "form.defaultUnit"
                                                            )}
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                {...register(
                                                                    "unit"
                                                                )}
                                                                type="text"
                                                                name="unit"
                                                                id="unit"
                                                                list="unit_option"
                                                                required
                                                                className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                                            />
                                                            {unitOptionList}
                                                        </div>
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label
                                                            htmlFor="unit_price"
                                                            className="block text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            {t(
                                                                "form.defaultPrice"
                                                            )}
                                                        </label>
                                                        <div className="relative mt-1 rounded-md shadow-sm">
                                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                                                            <input
                                                                {...register(
                                                                    "unit_price",
                                                                    {
                                                                        valueAsNumber:
                                                                            true,
                                                                    }
                                                                )}
                                                                type="number"
                                                                name="unit_price"
                                                                id="unit_price"
                                                                required
                                                                defaultValue={0}
                                                                className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                                    <div className="col-span-6">
                                                        <label
                                                            htmlFor="unit_name"
                                                            className="block text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            {t("form.unit")}
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                {...register(
                                                                    "unit_name"
                                                                )}
                                                                type="text"
                                                                name="unit_name"
                                                                id="unit_name"
                                                                required
                                                                value={value}
                                                                onChange={(e) =>
                                                                    setValue(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className={clsx(
                                                                    "outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-2",
                                                                    isConflict
                                                                        ? "ring-2 ring-red-500 focus:ring-red-600"
                                                                        : "ring-1 ring-gray-300 focus:ring-indigo-600"
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* button */}
                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse border-t border-gray-900/10 pt-4 justify-evenly">
                                                <button
                                                    name="intent"
                                                    value="add"
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
                                                        ? t("btn.submitting")
                                                        : t("btn.submit")}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={handleClose}
                                                >
                                                    {t("btn.cancel")}
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

export default MUniAdd;
