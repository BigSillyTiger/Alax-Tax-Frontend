import React, { useEffect, useState } from "react";
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
    TorderPayment,
    TorderWithDetails,
    orderPaymentSchema,
} from "@/configs/schema/orderSchema";
import Card from "@/components/card";
import ModalFrame from "@/components/modal";
import { SubmitBtn } from "@/components/form";
import { calGst, plusAB, calNetto } from "@/utils/calculations";
import { toastError } from "@/utils/toaster";
import { TclientOrderModal, Tunivers } from "@/utils/types";
import DataList from "@/components/dataList";
import { Tclient } from "@/configs/schema/clientSchema";
import { ClientInfoCard, OrderInfoCard } from "@/components/customized";
import StatesOptions from "@/components/stateOptions";
import MQuit from "./mQuit";
import OrderDescCard from "@/components/customized/OrderDescCard";

type Tprops = {
    client: Tclient;
    open: TclientOrderModal;
    order: TorderWithDetails;
    setOpen: (order: TclientOrderModal) => void;
};

type Tpayment = {
    payments: TorderPayment[];
};

const MOrderPay: FC<Tprops> = ({ client, order, open, setOpen }) => {
    console.log("-> received order: ", order);
    const navigation = useNavigation();
    const [payment, setPayment] = useState<TorderPayment>({
        fk_order_id: order.order_id,
        pay_id: 0,
        paid: 0,
        paid_date: "",
    });
    const { t } = useTranslation();
    const submit = useSubmit();
    const [openQuit, setOpenQuit] = useState(false);

    const {
        control,
        formState: { errors },
        getValues,
        register,
        reset,
        setValue,
        trigger,
        watch,
    } = useForm<Tpayment>({
        resolver: zodResolver(orderPaymentSchema),
        defaultValues: { payments: order.payments },
    });

    const { fields, prepend, remove } = useFieldArray({
        name: "payments",
        control,
    });
    console.log("-> test fields: ", fields);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (fields.length) {
            toastError("Please add one payment at least.");
            return;
        }
        //console.log("-> click submit err: ", errors);
        const isValid = await trigger();
        if (isValid) {
            const req = order.order_id === 0 ? "orderCreate" : "orderUpdate";
            const values = JSON.stringify({
                ...getValues(),
                client_id: client.client_id,
                // the value has be manually calculated or registered
                // therefore, they are not in the form
                // we need to manually add them to the values
                order_id: order.order_id,
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

    const onOpenQuit = () => {
        setOpenQuit(true);
    };

    const onClose = () => {
        setOpen("");
        reset();
    };

    const paymentsContent = fields.length ? (
        <Card className=" my-2 mx-1 text-sm lg:h-[45vh] overflow-y-auto">
            {fields.map((field, index) => {
                return (
                    <section
                        key={field.id}
                        className="col-span-6 row-span-2 grid grid-cols-10 gap-x-2 gap-y-2"
                    >
                        <div className="col-span-1 m-auto">
                            {/* x btn */}
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-red-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                                onClick={() => remove(index)}
                            >
                                <span className="sr-only">
                                    {t("btn.close")}
                                </span>
                                <XMarkIcon
                                    className="h-4 w-3"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                        {/* content */}
                        <Card className="col-span-9 mt-3 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-8 bg-indigo-50 py-2">
                            {/* paid amount */}
                            <div className="col-span-4">
                                <label
                                    htmlFor="paid"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {t("label.service")}
                                </label>
                                <input
                                    {...register(`payments.${index}.paid`, {
                                        valueAsNumber: true,
                                        min: 0,
                                    })}
                                    id="paid"
                                    name="paid"
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                            <div className="col-span-4">
                                <label
                                    htmlFor="paid_date"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {t("label.service")}
                                </label>
                                <input
                                    {...register(`payments.${index}.paid_date`)}
                                    id="paid_date"
                                    name="paid_date"
                                    type="date"
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                        </Card>
                    </section>
                );
            })}
        </Card>
    ) : (
        <Card className="my-2 mx-1 text-indigo-300 text-bold lg:h-[45vh]">
            {t("tips.noPayments")}
        </Card>
    );

    const payOperation = (
        <fieldset className="col-span-full mt-4 pt-3 border-t-2 border-indigo-300 border-dashed">
            <div className="grid grid-cols-6 gap-x-3">
                <div className="col-span-2">
                    <label
                        htmlFor="payAmount"
                        className="text-indigo-500 text-bold"
                    >
                        {t("label.payAmount")}
                    </label>
                    <input
                        id="payAmount"
                        name="payAmount"
                        type="number"
                        required
                        min={0}
                        step="0.01"
                        onChange={(e) => {
                            setPayment({
                                ...payment,
                                paid: e.target.valueAsNumber,
                            });
                        }}
                        className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    />
                </div>
                <div className="col-span-3">
                    <label
                        htmlFor="payDate"
                        className="text-indigo-500 text-bold"
                    >
                        {t("label.payDate")}
                    </label>
                    <input
                        id="payDate"
                        name="payDate"
                        type="date"
                        required
                        onChange={(e) => {
                            setPayment({
                                ...payment,
                                paid_date: e.target.value,
                            });
                        }}
                        className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    />
                </div>
                <div className="col-span-1 mt-6">
                    <button
                        type="button"
                        className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        onClick={() => {
                            console.log("-> new payment: ", payment);
                            prepend(payment);
                        }}
                    >
                        {t("btn.pay")}
                    </button>
                </div>
            </div>
        </fieldset>
    );

    const mainContent = (
        <Form onSubmit={onSubmit}>
            <section className="grid grid-cols-1 lg:grid-cols-8 gap-y-3 gap-x-4 overflow-y-auto h-[74vh] sm:h-[77vh] lg:h-auto">
                <section className="col-span-1 lg:col-span-3 grid grid-cols-1">
                    {/* client info */}
                    <fieldset className="col-span-full">
                        <legend className="text-indigo-500 text-bold">
                            <b>{t("label.clientInfo")}:</b>
                        </legend>
                        <ClientInfoCard
                            client={client}
                            className="my-2 mx-1 text-sm"
                        />
                    </fieldset>
                    {/* order info */}
                    <fieldset className="col-span-full">
                        <legend className="text-indigo-500 text-bold">
                            <b>{t("label.orderInfo")}:</b>
                        </legend>
                        <OrderInfoCard
                            order={order}
                            className="my-2 mx-1 text-sm"
                        />
                    </fieldset>
                    <fieldset className="col-span-full">
                        <legend className="text-indigo-500 text-bold">
                            <b>{t("label.payments")}</b>
                        </legend>
                        {paymentsContent}
                    </fieldset>
                </section>
                <section className="col-span-1 lg:col-span-5 grid grid-cols-1">
                    <fieldset className="col-span-full">
                        <legend className="text-indigo-500 text-bold">
                            <b>{t("label.serviceList")}:</b>
                        </legend>
                        <Card className="my-2 mx-1 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 lg:h-[60vh] overflow-y-auto">
                            <section className="col-span-full">
                                <OrderDescCard data={order.order_desc} />
                            </section>
                        </Card>
                    </fieldset>
                    {/* payment section */}
                    {payOperation}
                    {/* submit btns */}
                    <section className="col-span-full row-span-2">
                        {/* btns */}
                        <SubmitBtn
                            onClick={() => trigger()}
                            onClose={onOpenQuit}
                            navState={navigation.state}
                        />
                    </section>
                </section>
            </section>
        </Form>
    );

    return (
        <>
            <ModalFrame
                open={!!(open === "Pay")}
                onClose={onOpenQuit}
                title={t("modal.title.payments") + ` #${order.order_id}`}
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

export default MOrderPay;
