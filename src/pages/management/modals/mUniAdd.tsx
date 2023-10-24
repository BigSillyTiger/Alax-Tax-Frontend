import React, { useEffect, useState, useDeferredValue } from "react";
import type { FC, FormEvent, MouseEvent, TouchEvent } from "react";
import { useForm } from "react-hook-form";
import { useTranslation, Trans } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import {
    TnewService,
    TnewUnit,
    Tservice,
    Tunit,
} from "@/utils/schema/manageSchema";
import { newServiceSchema, newUnitSchema } from "@/utils/schema/manageSchema";
import clsx from "clsx";
import { toastError } from "@/utils/utils";
import ModalFrame from "@/components/modal";
import { SubmitBtn } from "@/components/form";

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

    const onClose = () => {
        reset();
        setOpen(false);
    };

    const mainContent = (
        <Form onSubmit={onSubmit}>
            <p className="mt-1 text-sm leading-6 text-gray-600">
                <Trans
                    defaults={t("modal.tips.addUni")}
                    values={{
                        name: open === "S" ? "service" : "unit",
                    }}
                    components={{
                        b: <strong className="text-red-400" />,
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
                            {t("form.serviceDesc")}
                        </label>
                        <div className="mt-1">
                            <input
                                {...register("service")}
                                type="text"
                                name="service"
                                id="service"
                                required
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
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
                            {t("form.defaultUnit")}
                        </label>
                        <div className="mt-1">
                            <input
                                {...register("unit")}
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
                            {t("form.defaultPrice")}
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                            <input
                                {...register("unit_price", {
                                    valueAsNumber: true,
                                })}
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
                                {...register("unit_name")}
                                type="text"
                                name="unit_name"
                                id="unit_name"
                                required
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
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

            <SubmitBtn
                onClick={() => trigger()}
                onClose={onClose}
                navState={navigation.state}
            />
        </Form>
    );

    return (
        <ModalFrame
            open={!!open}
            onClose={onClose}
            title={
                open === "S"
                    ? t("modal.title.addService")
                    : t("modal.title.addUnit")
            }
        >
            {mainContent}
        </ModalFrame>
    );
};

export default MUniAdd;
