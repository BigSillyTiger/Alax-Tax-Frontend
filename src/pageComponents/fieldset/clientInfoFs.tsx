import Fieldset from "@/components/form/fieldset";
import { Tclient } from "@/configs/schema/clientSchema";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

type Tprops = {
    client: Tclient;
    title: string;
    sFieldset?: string;
    sLegend?: string;
};

const ClientInfoFs: FC<Tprops> = ({
    client,
    title,
    sFieldset = "",
    sLegend = "",
}) => {
    const [t] = useTranslation();
    return (
        <Fieldset
            title={title}
            sFieldset={`${sFieldset}`}
            sLegend={`${sLegend}`}
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
        </Fieldset>
    );
};

export default ClientInfoFs;
