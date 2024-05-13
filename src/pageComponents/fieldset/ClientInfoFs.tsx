import { Amail, Atel } from "@/components/aLinks";
import Fieldset from "@/components/Fieldset";
import { Tclient } from "@/configs/schema/clientSchema";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Btext } from "@/components/Btext";

type Tprops = {
    client: Tclient;
    title: string;
    sFieldset?: string;
};

const ClientInfoFs: FC<Tprops> = ({ client, title, sFieldset = "" }) => {
    const { t } = useTranslation();
    return (
        <Fieldset
            title={title}
            sFieldset={`grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 my-2 mx-1 text-sm p-4 ${sFieldset}`}
        >
            <div className="col-span-3 text-lg">
                <p>
                    <Btext>{t("label.client")}: </Btext> {client.first_name}
                    &nbsp;{client.last_name}
                </p>
            </div>
            <div className="col-span-3 text-lg">
                <p>
                    <Btext>{t("label.clientID")}: </Btext> {client.cid}
                </p>
            </div>
            <div className="col-span-6 sm:col-span-3 text-lg">
                <p>
                    <Btext>{t("label.phone1")}: </Btext>{" "}
                    <Atel href={client?.phone} />
                </p>
            </div>

            <div className="col-span-6 sm:col-span-3 text-lg">
                <p>
                    <Btext>{t("label.email1")}: </Btext>{" "}
                    <Amail href={client?.email} />
                </p>
            </div>
            <div className="col-span-6 text-lg">
                <p>
                    <Btext>{t("label.address")}: </Btext>{" "}
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
