import { Amail, Atel } from "@/components/aLinks";
import Fieldset from "@/components/Fieldset";
import { Tclient } from "@/configs/schema/clientSchema";
import type { FC } from "react";
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
    const { t } = useTranslation();
    return (
        <Fieldset
            title={title}
            sFieldset={`grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 my-2 mx-1 text-sm p-4 ${sFieldset}`}
            sLegend={`text-indigo-500 text-bold text-lg ${sLegend}`}
        >
            <div className="col-span-3">
                <p>
                    <b className="text-indigo-600">{t("label.client")}: </b>{" "}
                    {client.first_name}&nbsp;{client.last_name}
                </p>
            </div>
            <div className="col-span-3">
                <p>
                    <b className="text-indigo-600">{t("label.clientID")}: </b>{" "}
                    {client.cid}
                </p>
            </div>
            <div className="col-span-6 sm:col-span-3">
                <p>
                    <b className="text-indigo-600">{t("label.phone1")}: </b>{" "}
                    <Atel href={client?.phone} />
                </p>
            </div>

            <div className="col-span-6 sm:col-span-3">
                <p>
                    <b className="text-indigo-600">{t("label.email1")}: </b>{" "}
                    <Amail href={client?.email} />
                </p>
            </div>
            <div className="col-span-6">
                <p>
                    <b className="text-indigo-600">{t("label.address")}: </b>{" "}
                    {client?.address +
                        ", " +
                        client?.suburb +
                        ", " +
                        client?.city +
                        ", " +
                        client?.state +
                        ", " +
                        client?.country +
                        ", " +
                        client?.postcode}
                </p>
            </div>
        </Fieldset>
    );
};

export default ClientInfoFs;
