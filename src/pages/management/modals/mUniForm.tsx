import React, { useState, useEffect, useDeferredValue, memo } from "react";
import type { FC, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Tservice, Tunit } from "@/configs/schema/manageSchema";
import { newServiceSchema, newUnitSchema } from "@/configs/schema/manageSchema";
import { isServiceType } from "@/utils/utils";
import { ModalFrame } from "@/components/modal";
import { SubmitBtn } from "@/components/form";
import { TclientOrderModal } from "@/utils/types";

type Tprops = {
    uni: Tservice | Tunit;
    serviceList: Tservice[] | null; // duplication check
    unitList: Tunit[] | null; // duplication check
    open: TclientOrderModal;
    setOpen: (open: TclientOrderModal) => void;
};

const MUniForm: FC<Tprops> = ({
    uni,
    serviceList,
    unitList,
    open,
    setOpen,
}) => {
    const [isConflict, setIsConflict] = useState(false);
    // service
    const [service, setService] = useState("");
    const [unit, setUnit] = useState("");
    const [unitPrice, setUnitPrice] = useState(0);
    // unit
    const [unitName, setUnitName] = useState("");

    const defService = useDeferredValue(service);
    const defUnitName = useDeferredValue(unitName);
    const { t } = useTranslation();
    const submit = useSubmit();
    const navigation = useNavigation();
    const schema = isServiceType(uni) ? newServiceSchema : newUnitSchema;
    const {
        formState: { errors },
        getValues,
        register,
        reset,
        trigger,
    } = useForm<Tservice | Tunit>({ resolver: zodResolver(schema) });

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

    const onClose = () => {
        setOpen("");
        reset();
    };

    const mainContent = (
        <Form onSubmit={onSubmit}>
            {/* conditional form */}
            {isServiceType(uni) ? (
                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                        <label
                            htmlFor="service"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            {t("label.service")}
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                {...register("service")}
                                type="service"
                                name="service"
                                id="service"
                                required
                                className={`
                                    outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-2
                                    ${
                                        isConflict
                                            ? "ring-2 ring-red-500 focus:ring-red-600"
                                            : "ring-1 ring-gray-300 focus:ring-indigo-600"
                                    }
                                `}
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="unit"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            {t("label.unit")}
                        </label>
                        <div className="mt-1">
                            <input
                                {...register("unit")}
                                type="text"
                                name="unit"
                                id="unit"
                                required
                                className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                value={unit}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setUnit(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="unit_price"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            {t("label.uPrice")}
                        </label>
                        <div className="mt-1">
                            <input
                                {...register("unit_price", {
                                    // use this to convert value into number
                                    valueAsNumber: true,
                                })}
                                type="text"
                                name="unit_price"
                                id="unit_price"
                                required
                                className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                value={unitPrice}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setUnitPrice(Number(e.target.value));
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
                            {t("label.unit")}
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                {...register("unit_name")}
                                type="unit_name"
                                name="unit_name"
                                id="unit_name"
                                required
                                className={`
                                    outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-2
                                    ${
                                        isConflict
                                            ? " ring-2 ring-red-500 focus:ring-red-600 "
                                            : " ring-1 ring-gray-300 focus:ring-indigo-600 "
                                    }
                                `}
                                value={unitName}
                                onChange={(e) => setUnitName(e.target.value)}
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
            open={!!(open === "Add" || open === "Edit")}
            onClose={onClose}
            title={
                isServiceType(uni)
                    ? open === "Add"
                        ? t("modal.title.addService")
                        : t("modal.title.editService")
                    : open === "Add"
                    ? t("modal.title.addUnit")
                    : t("modal.title.editUnit")
            }
        >
            {mainContent}
        </ModalFrame>
    );
};

export default memo(MUniForm);
