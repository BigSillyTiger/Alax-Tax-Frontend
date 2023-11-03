import React from "react";
import type { FC } from "react";
import Card from "@/components/card";
import { Tclient } from "@/utils/schema/clientSchema";
import { useTranslation } from "react-i18next";
import { Torder } from "@/utils/schema/orderSchema";
import { minusAB } from "@/utils/calculations";

type Tinfo = {
    client: Tclient;
    className: string;
};

const ClientInfoCard: FC<Tinfo> = ({ client, className }) => {
    const { t } = useTranslation();
    return (
        <Card
            className={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 ${className}`}
        >
            <div className="col-span-4">
                <p>
                    <b className="text-indigo-600">{t("label.client")}: </b>{" "}
                    {client.first_name}&nbsp;{client.last_name}
                </p>
            </div>
            <div className="col-span-2">
                <p>
                    <b className="text-indigo-600">{t("label.clientID")}: </b>{" "}
                    {client.client_id}
                </p>
            </div>
            <div className="col-span-6 sm:col-span-4">
                <p>
                    <b className="text-indigo-600">{t("label.phone1")}: </b>{" "}
                    {client?.phone}
                </p>
            </div>
            <div className="col-span-6 sm:col-span-2">
                <p>
                    <b className="text-indigo-600">{t("label.pc")}: </b>
                    {client?.postcode}
                </p>
            </div>
            <div className="col-span-6">
                <p>
                    <b className="text-indigo-600">{t("label.email1")}: </b>{" "}
                    {client?.email}
                </p>
            </div>
            <div className="col-span-6">
                <p>
                    <b className="text-indigo-600">{t("label.address")}: </b>{" "}
                    {client?.address}, {client?.suburb}, {client?.city},{" "}
                    {client?.state}, {client?.country}
                </p>
            </div>
        </Card>
    );
};

type TorderInfo = {
    order: Torder;
    className: string;
};

const OrderInfoCard: FC<TorderInfo> = ({ order, className }) => {
    const { t } = useTranslation();
    return (
        <Card
            className={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 ${className}`}
        >
            <div className="col-span-full break-words">
                <p>
                    <b className="text-indigo-600">{t("label.workAddr")}: </b>{" "}
                    {order?.order_address}, {order?.order_suburb},{" "}
                    {order?.order_city}, {order?.order_state},{" "}
                    {order?.order_country}, {order?.order_pc}
                </p>
            </div>
            <div className="col-span-3">
                <p>
                    <b className="text-indigo-600">{t("label.total")}: </b>{" "}
                    {order?.order_total}
                </p>
            </div>
            <div className="col-span-3">
                <p>
                    <b className="text-indigo-600">{t("label.gst")}: </b>{" "}
                    {order?.order_gst}
                </p>
            </div>
            <div className="col-span-3">
                <p>
                    <b className="text-indigo-600">{t("label.paid")}: </b>
                    {order?.order_paid}
                </p>
            </div>
            <div className="col-span-3">
                <p>
                    <b className="text-indigo-600">{t("label.balance")}: </b>{" "}
                    {minusAB(order?.order_total, order?.order_paid)}
                </p>
            </div>
        </Card>
    );
};

export { ClientInfoCard, OrderInfoCard };
