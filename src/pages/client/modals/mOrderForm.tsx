import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { FC, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    XMarkIcon,
    ChevronDoubleDownIcon,
    ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import { TorderWithDetails, orderFormSchema } from "@/utils/schema/orderSchema";
import Card from "@/components/card";
import ModalFrame from "@/components/modal";
import { SubmitBtn } from "@/components/form";
import { calGst, plusAB, calNetto } from "@/utils/calculations";
import { toastError } from "@/utils/toaster";
import { Tunivers } from "@/utils/types";
import DataList from "@/components/dataList";
import { Tclient } from "@/utils/schema/clientSchema";
import ClientInfoCard from "../components";
import StatesOptions from "@/components/stateOptions";
import MQuit from "./mQuit";

type Tprops = {
    client: Tclient;
    order: TorderWithDetails;
    setOpen: (order: TorderWithDetails) => void;
    uniData: Tunivers | null;
};

const MOrderForm: FC<Tprops> = ({ client, order, setOpen, uniData }) => {
    const navigation = useNavigation();
    const submit = useSubmit();
    const { t } = useTranslation();
    const [openQuit, setOpenQuit] = useState(false);
    //console.log("-> init order: ", order);
    const [desc, setDesc] = useState({
        des_id: 0,
        fk_order_id: order.order_id,
        title: uniData?.services[0].service as string,
        taxable: true,
        description: "",
        qty: 1,
        unit: uniData?.services[0].unit as string,
        unit_price: uniData?.services[0].unit_price as number,
        gst: calGst(Number(uniData?.services[0].unit_price)),
        netto: uniData?.services[0].unit_price as number,
    });

    const {
        control,
        formState: { errors },
        getValues,
        register,
        reset,
        setValue,
        trigger,
        watch,
    } = useForm<TorderWithDetails>({
        resolver: zodResolver(orderFormSchema),
        defaultValues: order,
    });

    const { fields, append, remove, swap } = useFieldArray({
        name: "order_desc",
        control,
    });

    const values = useWatch({ control, name: "order_desc" });

    const calTotal = useMemo(() => {
        let total = 0;
        for (const item of values) {
            //const netto = timesAB(item.unit_price, item.qty);
            total = plusAB(total, item.netto);
        }
        return total;
    }, [values]);

    const calTotalGst = useMemo(() => {
        let gst = 0;
        for (const item of values) {
            //const netto = timesAB(item.unit_price, item.qty);
            gst = plusAB(gst, item.gst);
        }
        return gst;
    }, [values]);

    const calSNettoGst = useCallback(
        (index: number) => {
            const total = calNetto(
                watch(`order_desc.${index}.qty`, 0),
                watch(`order_desc.${index}.unit_price`, 0)
            );
            if (watch(`order_desc.${index}.taxable`, true)) {
                const gst = calGst(total);
                setValue(`order_desc.${index}.gst`, gst);
            } else {
                setValue(`order_desc.${index}.gst`, 0);
            }
            setValue(`order_desc.${index}.netto`, total);
        },
        [values]
    );

    /* useEffect(() => {
        // Calculate totals initially and whenever qty or unitPrice changes
        fields.forEach((_, index) => {
            
        });
        console.log("-> fields changed");
    }, [fields, watch]); */

    useEffect(() => {
        if (order && uniData?.services) {
            reset({
                order_address: order.order_address ?? undefined,
                order_suburb: order.order_suburb ?? undefined,
                order_city: order.order_city ?? undefined,
                order_state: order.order_state ?? undefined,
                order_country: order.order_country ?? undefined,
                order_pc: order.order_pc ?? undefined,
                order_desc: order.order_desc ?? undefined,
                order_status: order.order_status ?? t("label.pending"),
                order_deposit: order.order_deposit ?? 0,
            });
        }
    }, [order, reset]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!fields.length) {
            toastError("Please add one order description at least.");
            return;
        }
        errors ?? console.log("-> click submit err: ", errors);
        const isValid = await trigger();
        if (isValid) {
            const req = order.order_id === 0 ? "orderCreate" : "orderUpdate";
            const values = JSON.stringify({
                ...getValues(),
                client_id: client.client_id,
                // these 3 the value has be manually calculated or registered
                // therefore, they are not in the form
                // we need to manually add them to the values
                order_id: order.order_id,
                order_gst: calTotalGst,
                order_total: calTotal,
            });
            const method = order.order_id === 0 ? "POST" : "PUT";
            submit(
                { values, req },
                {
                    // this action need to be modified
                    method,
                    action: `/clients/${order.fk_client_id}`,
                }
            );
        }
    };

    const onClose = () => {
        setOpen({ ...order, order_id: -1 });
        reset();
    };

    const onOpenQuit = () => {
        setOpenQuit(true);
    };

    const serviceTitleList = uniData ? (
        <DataList
            id={"service_title"}
            name={"service"}
            data={uniData.services}
        />
    ) : null;

    const unitsList = uniData ? (
        <DataList id={"unit_name"} name={"unit_name"} data={uniData.units} />
    ) : null;

    const setDefaultService = (value: string) => {
        const service = uniData?.services.find(
            (item) => item.service === value
        );
        if (service) {
            setDesc({
                des_id: 0,
                fk_order_id: order.order_id,
                title: service.service as string,
                taxable: true,
                description: "",
                qty: 1,
                unit: service.unit as string,
                unit_price: service.unit_price as number,
                gst: calGst(Number(service.unit_price)),
                netto: service.unit_price as number,
            });
        }
    };

    const addressContent = (
        <Card className="my-2 mx-1 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            {/* street */}
            <div className="col-span-full">
                <label
                    htmlFor="order_address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.address")}
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
                    {t("label.suburb")}
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
                    {t("label.city")}
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
                    {t("label.state")}
                </label>
                <div className="mt-1">
                    <select
                        {...register("order_state")}
                        id="order_state"
                        autoComplete="state-name"
                        className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    >
                        <StatesOptions />
                    </select>
                </div>
            </div>

            {/* country */}
            <div className="sm:col-span-2">
                <label
                    htmlFor="order_country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.country")}
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
            <div className="sm:col-span-2">
                <label
                    htmlFor="order_pc"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.pc")}
                </label>

                <div className="mt-1">
                    <input
                        {...register("order_pc")}
                        type="text"
                        id="order_pc"
                        autoComplete="postal-code"
                        className={`
                            outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 pl-2 
                            ${
                                errors.order_pc
                                    ? " ring-2 ring-red-600 focus:ring-red-400 "
                                    : " ring-1 ring-gray-300 focus:ring-indigo-600 "
                            }
                    `}
                    />
                </div>
            </div>
        </Card>
    );

    const detailsContent = (
        <Card className="my-2 mx-1 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            {/* order satus */}
            <div className="sm:col-span-3">
                <label
                    htmlFor="order_status"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.status")}
                </label>
                <div className="mt-1">
                    <select
                        {...register("order_status")}
                        id="order_status"
                        //autoComplete="order_status"
                        className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    >
                        <option value={t("label.pending")}>
                            {t("label.pending")}
                        </option>
                        <option value={t("label.processing")}>
                            {t("label.processing")}
                        </option>
                        <option value={t("label.completed")}>
                            {t("label.completed")}
                        </option>
                        <option value={t("label.closed")}>
                            {t("label.closed")}
                        </option>
                    </select>
                </div>
            </div>
            {/* order deposit fee */}
            <div className="sm:col-span-3">
                <label
                    htmlFor="order_deposit"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.deposit")}
                </label>
                <div className="mt-1">
                    <input
                        {...register("order_deposit", { valueAsNumber: true })}
                        type="number"
                        step="0.01"
                        min={0}
                        id="order_deposit"
                        name="order_deposit"
                        className="outline-none pl-2 h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            {/* order total Gst */}
            <div className="sm:col-span-3">
                <label
                    htmlFor="order_gst"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.totalGst")}
                </label>
                <div className="mt-1">
                    <input
                        {...register("order_gst", { valueAsNumber: true })}
                        type="number"
                        step="0.01"
                        min={0}
                        id="order_gst"
                        name="order_gst"
                        value={calTotalGst}
                        className="outline-none pl-2 h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            {/* order total fee */}
            <div className="sm:col-span-3">
                <label
                    htmlFor="order_total"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.total")}
                </label>
                <div className="mt-1">
                    <input
                        {...register("order_total", { valueAsNumber: true })}
                        type="number"
                        step="0.01"
                        min={0}
                        id="order_total"
                        value={calTotal}
                        className="outline-none pl-2 h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
        </Card>
    );

    const descContent =
        fields.length != 0 &&
        fields.map((field, index) => {
            return (
                <section key={field.id} className="grid grid-cols-10 gap-x-1">
                    <div className="col-span-1 m-auto">
                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-red-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                            onClick={() => remove(index)}
                        >
                            <span className="sr-only">{t("btn.close")}</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <Card className="col-span-9 mt-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-8 bg-indigo-50">
                        <section
                            className={`${
                                fields.length === 1
                                    ? "col-span-8"
                                    : "col-span-7"
                            } grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6`}
                        >
                            {/* title - 6*/}
                            <div className="col-span-8">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {t("label.service")}
                                </label>
                                <input
                                    {...register(`order_desc.${index}.title`)}
                                    id="title"
                                    type="text"
                                    list="service_title"
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                                {serviceTitleList}
                            </div>
                            {/* qty - 1 */}
                            <div className="col-span-6 sm:col-span-1">
                                <label
                                    htmlFor="qty"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {t("label.qty")}
                                </label>
                                <input
                                    {...register(`order_desc.${index}.qty`, {
                                        valueAsNumber: true,
                                        min: 0,
                                    })}
                                    id="qty"
                                    min={0}
                                    type="number"
                                    step="0.01"
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                    onChange={(e) => {
                                        setValue(
                                            `order_desc.${index}.qty`,
                                            Number(e.target.value)
                                        );
                                        return calSNettoGst(index);
                                    }}
                                />
                            </div>
                            {/* unit - 2 */}
                            <div className="col-span-6 sm:col-span-2">
                                <label
                                    htmlFor="unit"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {t("label.unit")}
                                </label>
                                <input
                                    {...register(`order_desc.${index}.unit`)}
                                    id="unit"
                                    type="text"
                                    list="unit_name"
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                                {unitsList}
                            </div>
                            {/* taxable - 1 */}
                            <div className="col-span-6 sm:col-span-1">
                                <label
                                    htmlFor="taxable"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {t("label.taxable")}
                                </label>
                                <input
                                    {...register(`order_desc.${index}.taxable`)}
                                    id="taxable"
                                    type="checkbox"
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 pl-2"
                                    onChange={(e) => {
                                        setValue(
                                            `order_desc.${index}.taxable`,
                                            Boolean(e.target.checked)
                                        );
                                        return calSNettoGst(index);
                                    }}
                                />
                            </div>
                            {/* gst - 2 */}
                            <div className="col-span-6 sm:col-span-2">
                                <label
                                    htmlFor="unit"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {t("label.gst")}
                                </label>
                                <input
                                    {...register(`order_desc.${index}.gst`)}
                                    id="gst"
                                    type="number"
                                    step="0.01"
                                    min={0}
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>

                            {/* unit price - 2 */}
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="unit_price"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {t("label.uPrice")}
                                </label>
                                <input
                                    {...register(
                                        `order_desc.${index}.unit_price`,
                                        {
                                            valueAsNumber: true,
                                            min: 0,
                                        }
                                    )}
                                    id="unit_price"
                                    type="number"
                                    step="0.01"
                                    min={0}
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                    onChange={(e) => {
                                        setValue(
                                            `order_desc.${index}.unit_price`,
                                            Number(e.target.value)
                                        );
                                        return calSNettoGst(index);
                                    }}
                                />
                            </div>
                            {/* netto - 2 */}
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="netto"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {t("label.netto")}
                                </label>
                                <input
                                    {...register(`order_desc.${index}.netto`, {
                                        valueAsNumber: true,
                                    })}
                                    id="netto"
                                    type="number"
                                    step="0.01"
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>

                            {/* desc - 6 */}
                            <div className="col-span-6 sm:col-span-7">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {t("label.desc")}
                                </label>
                                <textarea
                                    {...register(
                                        `order_desc.${index}.description`
                                    )}
                                    id="description"
                                    name="description"
                                    rows={4}
                                    //type="textarea"
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                        </section>
                        {/* adjust arrows btns */}
                        {fields.length > 1 && (
                            <section className="col-span-1 flex flex-col justify-around">
                                {index != 0 && (
                                    <button
                                        type="button"
                                        className="h-10 rounded-md bg-indigo-400 text-slate-200 hover:bg-indigo-600 hover:text-slate-50"
                                        onClick={() => {
                                            swap(index, index - 1);
                                        }}
                                    >
                                        <ChevronDoubleUpIcon
                                            className="h-6 w-6 m-auto"
                                            aria-hidden="true"
                                        />
                                    </button>
                                )}
                                {index + 1 !== fields.length && (
                                    <button
                                        type="button"
                                        className="h-10 rounded-md bg-indigo-400 text-slate-200 hover:bg-indigo-600 hover:text-slate-50"
                                        onClick={() => {
                                            swap(index, index + 1);
                                        }}
                                    >
                                        <ChevronDoubleDownIcon
                                            className="h-6 w-6 m-auto"
                                            aria-hidden="true"
                                        />
                                    </button>
                                )}
                            </section>
                        )}
                    </Card>
                </section>
            );
        });

    const mainContent = (
        <div>
            <Form
                onSubmit={onSubmit}
                className="grid grid-cols-1  gap-y-3 gap-x-4"
            >
                <div className="grid grid-cols-1 lg:grid-cols-8 gap-y-3 gap-x-4 overflow-y-auto h-[74vh] sm:h-[77vh] lg:h-auto">
                    <section className="col-span-1 lg:col-span-3 grid grid-cols-1">
                        {/* client info */}
                        <section className="">
                            <span className="text-indigo-500 text-bold">
                                <b>{t("label.clientInfo")}:</b>
                            </span>
                            <ClientInfoCard
                                client={client}
                                className="my-2 mx-1 text-sm"
                            />
                        </section>
                        {/* addres */}
                        <section className="">
                            <span className="text-indigo-500 text-bold">
                                <b>{t("label.workAddr")}:</b>
                            </span>
                            {addressContent}
                        </section>
                        {/* details */}
                        <section className="">
                            <span className="text-indigo-500 text-bold">
                                {t("label.orderDetail")}:
                            </span>
                            {detailsContent}
                        </section>
                    </section>
                    {/* order services list */}
                    <section className="col-span-full lg:col-span-5">
                        <span className="text-indigo-500 text-bold">
                            {t("label.orderDesc")}:
                        </span>
                        <Card className="my-2 mx-1 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 lg:h-[65vh] overflow-y-auto">
                            <section className="col-span-full">
                                {descContent}
                            </section>
                            {/*  */}
                        </Card>
                        {/* append btn - adding a new service */}
                        <section className="col-span-full grid grid-cols-6 mt-4 pt-2 gap-x-3 border-t-2 border-indigo-300 border-dashed">
                            <div className="col-span-4 ">
                                <label
                                    htmlFor="sTitle"
                                    className="text-indigo-500 text-bold"
                                >
                                    {t("modal.tips.pickService")}:
                                </label>
                                <input
                                    id="sTitle"
                                    type="text"
                                    list="service_title"
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                    onChange={(e) => {
                                        setDefaultService(e.target.value);
                                    }}
                                />
                                {serviceTitleList}
                            </div>
                            <div className="col-span-2 mt-6">
                                <button
                                    type="button"
                                    className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                    onClick={() => append(desc)}
                                >
                                    {t("btn.append")}
                                </button>
                            </div>
                        </section>
                    </section>
                </div>
                <section className="col-span-full row-span-2">
                    {/* btns */}
                    <SubmitBtn
                        onClick={() => trigger()}
                        onClose={onClose}
                        navState={navigation.state}
                    />
                </section>
            </Form>
        </div>
    );

    return (
        <>
            <ModalFrame
                open={order.order_id !== -1}
                onClose={onOpenQuit}
                title={
                    order.order_id === 0
                        ? t("modal.title.addOrder")
                        : t("modal.title.editOrder") + ` #${order.order_id}`
                }
                mode={"full"}
            >
                {mainContent}
            </ModalFrame>
            <MQuit
                open={openQuit}
                setOpen={() => {
                    setOpenQuit(false);
                }}
                closeMainModal={onClose}
            />
        </>
    );
};

export default MOrderForm;
