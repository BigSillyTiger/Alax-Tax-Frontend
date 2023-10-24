import React, { useEffect } from "react";
import type { FC, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import type { Tclient } from "@/utils/schema/clientSchema";
import { clientNoIDSchema } from "@/utils/schema/clientSchema";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { RES_STATUS } from "@/utils/types";
import ModalFrame from "@/components/modal/modalFrame";
import { SubmitBtn } from "@/components/form";

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
    const { t } = useTranslation();

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

    const onClose = () => {
        setOpen(initClient);
    };

    const mainContent = (
        <Form onSubmit={onSubmit}>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label
                        htmlFor="first_name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        {t("label.firstName")}
                    </label>
                    <div className="mt-1">
                        <input
                            {...register("first_name")}
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
                        {t("label.lastName")}
                    </label>
                    <div className="mt-1">
                        <input
                            {...register("last_name")}
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
                        {t("label.email1")}
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <EnvelopeIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </div>
                        <input
                            {...register("email")}
                            type="email"
                            id="email"
                            required
                            className={clsx(
                                "outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-10",
                                (isConflict === RES_STATUS.FAILED_DUP_EMAIL ||
                                    isConflict === RES_STATUS.FAILED_DUP_P_E) &&
                                    "ring-2 ring-red-500 focus:ring-red-600",
                                (isConflict === RES_STATUS.SUCCESS ||
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
                        {t("label.phone1")}
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <PhoneIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </div>
                        <input
                            {...register("phone")}
                            type="text"
                            id="phone"
                            autoComplete="tel"
                            placeholder="0-xxx-xxx-xxx"
                            className={clsx(
                                "outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-10",
                                (isConflict === RES_STATUS.FAILED_DUP_PHONE ||
                                    isConflict === RES_STATUS.FAILED_DUP_P_E) &&
                                    "ring-2 ring-red-500 focus:ring-red-600",
                                (isConflict === RES_STATUS.SUCCESS ||
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
                        {t("label.address")}
                    </label>
                    <div className="mt-1">
                        <input
                            {...register("address")}
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
                        {t("label.suburb")}
                    </label>
                    <div className="mt-1">
                        <input
                            {...register("suburb")}
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
                        {t("label.city")}
                    </label>
                    <div className="mt-1">
                        <input
                            {...register("city")}
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
                        {t("label.state")}
                    </label>
                    <div className="mt-1">
                        <select
                            {...register("state")}
                            id="state"
                            autoComplete="state-name"
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        >
                            <option value="SA">SA</option>
                            <option value="NS">NS</option>
                            <option value="VIC">VIC</option>
                            <option value="TAS">TAS</option>
                            <option value="WA">WA</option>
                            <option value="QLD">QLD</option>
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        {t("label.Country")}
                    </label>
                    <div className="mt-1">
                        <input
                            {...register("country")}
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
                            {t("label.pc")}
                        </label>
                    </>
                    <div className="mt-1">
                        <input
                            {...register("postcode")}
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

            <SubmitBtn
                onClick={() => trigger()}
                onClose={onClose}
                navState={navigation.state}
            />
        </Form>
    );

    return (
        <ModalFrame
            open={!!client.client_id}
            onClose={onClose}
            title={t("modal.title.updateClient")}
        >
            {mainContent}
        </ModalFrame>
    );
};

export default MClientEdit;
