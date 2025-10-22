import type { FC } from "react";
import Card from "@/components/Card";
import { Tclient } from "@/configs/schema/clientSchema";
import { useTranslation } from "react-i18next";
import { Btext } from "@/components/Btext";

type Tinfo = {
    client: Tclient;
    className?: string;
};

const ClientInfoCard: FC<Tinfo> = ({ client, className = "" }) => {
    const { t } = useTranslation();
    return (
        <Card
            className={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 ${className}`}
        >
            <div className="col-span-4">
                <p>
                    <Btext>{t("label.client")}: </Btext> {client.first_name}
                    &nbsp;{client.last_name}
                </p>
            </div>
            <div className="col-span-2">
                <p>
                    <Btext>{t("label.clientID")}: </Btext> {client.cid}
                </p>
            </div>
            <div className="col-span-6 sm:col-span-4">
                <p>
                    <Btext>{t("label.phone1")}: </Btext> {client?.phone}
                </p>
            </div>
            <div className="col-span-6 sm:col-span-4">
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
                        client?.country}
                </p>
            </div>
            <div className="col-span-6 sm:col-span-2">
                <p>
                    <Btext>{t("label.pc")}: </Btext>
                    {client?.postcode}
                </p>
            </div>
            <div className="col-span-6">
                <p>
                    <Btext>{t("label.email1")}: </Btext> {client?.email}
                </p>
            </div>
            <div className="col-span-6">
                <p>
                    <Btext>{t("label.address")}: </Btext> {client?.address},{" "}
                    {client?.suburb}, {client?.city}, {client?.state},{" "}
                    {client?.country}
                </p>
            </div>
        </Card>
    );
};

export default ClientInfoCard;
