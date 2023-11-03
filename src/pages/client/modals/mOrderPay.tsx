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
} from "@/utils/schema/orderSchema";
import Card from "@/components/card";
import ModalFrame from "@/components/modal";
import { SubmitBtn } from "@/components/form";
import { calGst, plusAB, calNetto } from "@/utils/calculations";
import { toastError } from "@/utils/toaster";
import { TclientOrderModal, Tunivers } from "@/utils/types";
import DataList from "@/components/dataList";
import { Tclient } from "@/utils/schema/clientSchema";
import { ClientInfoCard, OrderInfoCard } from "../components";
import StatesOptions from "@/components/stateOptions";
import MQuit from "./mQuit";

type Tprops = {
    client: Tclient;
    open: TclientOrderModal;
    order: TorderWithDetails;
    setOpen: (order: TclientOrderModal) => void;
};

const MOrderPay: FC<Tprops> = ({ client, order, open, setOpen }) => {
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
    } = useForm<TorderWithDetails>({
        resolver: zodResolver(orderPaymentSchema),
        defaultValues: order,
    });

    const { fields, append, remove } = useFieldArray({
        name: "payments",
        control,
    });

    useEffect(() => {
        if (order) {
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
                order_date: order.order_date ?? "",
                order_gst: order.order_gst ?? 0,
                order_total: order.order_total ?? 0,
                order_paid: order.order_paid ?? 0,
            });
        }
    }, [order, reset]);

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

    //const clientInfo

    const mainContent = (
        <Form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-y-3 gap-x-4 overflow-y-auto h-[74vh] sm:h-[77vh] lg:h-auto">
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
                </section>
            </div>
        </Form>
    );

    const onClose = () => {
        setOpen("");
        reset();
    };

    return (
        <>
            <ModalFrame
                open={!!(open === "Pay")}
                onClose={onClose}
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

export default MOrderPay;
