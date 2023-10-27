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
import {
    TorderWithDesc,
    OrderFormSchema,
    TnewOrderDesc,
} from "@/utils/schema/orderSchema";
import Card from "@/components/card";
import ModalFrame from "@/components/modal";
import { SubmitBtn } from "@/components/form";
import { plusAB, timesAB, toastError } from "@/utils/utils";
import { Tunivers } from "@/utils/types";
import Big from "big.js";

type Tprops = {
    cid: number;
    order: TorderWithDesc;
    setOpen: (order: TorderWithDesc) => void;
    uniData: Tunivers | null;
};

const MOrderForm: FC<Tprops> = ({ cid, order, setOpen, uniData }) => {
    const navigation = useNavigation();
    const submit = useSubmit();
    const [total, setTotal] = useState<number>(0);
    const { t } = useTranslation();
    const [desc] = useState({
        des_id: 0,
        fk_order_id: order.order_id,
        title: uniData?.services[0].service as string,
        taxable: true,
        ranking: 0,
        description: "",
        qty: 1,
        unit: uniData?.services[0].unit as string,
        unit_price: uniData?.services[0].unit_price as number,
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
    } = useForm<TorderWithDesc>({
        resolver: zodResolver(OrderFormSchema),
        defaultValues: order,
    });

    const { fields, append, remove } = useFieldArray({
        name: "order_desc",
        control,
    });

    const values = useWatch({ control, name: "order_desc" });

    const calTotal = useMemo(() => {
        let total = 0;
        for (const item of values) {
            const netto = timesAB(item.unit_price, item.qty);
            total = plusAB(total, netto);
        }
        //console.log("-> total fee: ", total);
        return total;
    }, [values]);

    const calNetto = useCallback(
        (index: number) => {
            const total = timesAB(
                watch(`order_desc.${index}.qty`, 0),
                watch(`order_desc.${index}.unit_price`, 0)
            );
            setValue(`order_desc.${index}.netto`, total);
        },
        [values]
    );

    useEffect(() => {
        // Calculate totals initially and whenever qty or unitPrice changes
        fields.forEach((_, index) => {
            calNetto(index);
        });
    }, [fields, watch]);

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
            });
        }
    }, [order, reset]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!fields.length) {
            toastError("Please add one order description at least.");
            return;
        }
        console.log("-> click submit err: ", errors);
        const isValid = await trigger();
        if (isValid) {
            const values = JSON.stringify({
                ...getValues(),
                client_id: cid,
                req: "orderUpdate",
            });
            const method = order.order_id === 0 ? "POST" : "PUT";
            submit(
                { values },
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

    const serviceTitleList = uniData ? (
        <datalist id="service_title">
            {uniData.services.map((item) => (
                <option key={item.service}>{item.service}</option>
            ))}
        </datalist>
    ) : null;

    const unitsList = uniData ? (
        <datalist id="unit_name">
            {uniData.units.map((item) => (
                <option key={item.id}>{item.unit_name}</option>
            ))}
        </datalist>
    ) : null;

    const addressContent = (
        <Card className="mt-1 mb-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
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
            <div className="sm:col-span-1">
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
        <Card className="mt-1 mb-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            {/* order satus */}
            <div className="sm:col-span-2">
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
            <div className="sm:col-span-2">
                <label
                    htmlFor="order_deposit"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.deposit")}
                </label>
                <div className="mt-1">
                    <input
                        {...register("order_deposit")}
                        type="number"
                        id="order_deposit"
                        className="outline-none pl-2 h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            {/* order total fee */}
            <div className="sm:col-span-2">
                <label
                    htmlFor="order_total"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.total")}
                </label>
                <div className="mt-1">
                    <input
                        {...register("order_total")}
                        type="number"
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
                            <div className="col-span-8">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {t("label.desc")}
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
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                    onChange={(e) => {
                                        setValue(
                                            `order_desc.${index}.qty`,
                                            Number(e.target.value)
                                        );
                                        return calNetto(index);
                                    }}
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-1">
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
                            <div className="col-span-6 sm:col-span-2">
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
                                    min={0}
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                    onChange={(e) => {
                                        setValue(
                                            `order_desc.${index}.unit_price`,
                                            Number(e.target.value)
                                        );
                                        return calNetto(index);
                                    }}
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-2">
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
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>

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
                                />
                            </div>
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
                        {fields.length > 1 && (
                            <section className="col-span-1 flex flex-col justify-around">
                                {index != 0 && (
                                    <button
                                        type="button"
                                        className="h-10 rounded-md bg-indigo-400 text-slate-200 hover:bg-indigo-600 hover:text-slate-50"
                                        onClick={() =>
                                            console.log(
                                                "-> click btn up: ",
                                                index
                                            )
                                        }
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
                                        onClick={() =>
                                            console.log(
                                                "-> click btn down: ",
                                                index
                                            )
                                        }
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
        <Form onSubmit={onSubmit}>
            {/* addres */}
            <span className="text-indigo-500 text-bold">
                <b>{t("label.workAddr")}:</b>
            </span>
            {addressContent}

            <span className="text-indigo-500 text-bold">
                {t("label.orderDetail")}:
            </span>
            {detailsContent}

            {/* order description */}
            <span className="text-indigo-500 text-bold">
                {t("label.orderDesc")}:
            </span>
            <Card className="mt-1 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <section className="col-span-full">{descContent}</section>
                {/*  */}
                <section className="col-span-full grid grid-cols-6 mt-4 pt-2 pb-1 gap-x-3 border-t-2 border-indigo-300 border-dashed">
                    <div className="col-span-4">
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
                        />
                        {serviceTitleList}
                    </div>
                    <div className="col-span-2 my-auto">
                        <button
                            type="button"
                            className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                            onClick={() => append(desc)}
                        >
                            {t("btn.append")}
                        </button>
                    </div>
                </section>
            </Card>

            <SubmitBtn
                onClick={() => trigger()}
                onClose={onClose}
                navState={navigation.state}
            />
        </Form>
    );

    return (
        <ModalFrame
            open={order.order_id !== -1}
            onClose={onClose}
            title={
                order.order_id === 0
                    ? t("modal.title.addOrder")
                    : t("modal.title.editOrder")
            }
            size={3}
        >
            {mainContent}
        </ModalFrame>
    );
};

export default MOrderForm;
