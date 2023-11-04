import React from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import ModalFrame from "@/components/modal";
import { useSubmit } from "react-router-dom";
import type { Tclient } from "@/configs/schema/clientSchema";
import Card from "@/components/card";
import { DelBtn } from "@/components/form";
import { TclientOrderModal } from "@/utils/types";

type Tprops = {
    client: Tclient;
    open: TclientOrderModal;
    setOpen: (value: TclientOrderModal) => void;
};

// this component is about building a modal with transition to delete a client
const MClientDel: FC<Tprops> = ({ client, open, setOpen }) => {
    const submit = useSubmit();
    const { t } = useTranslation();

    const handleDeleteClient = async (id: number) => {
        submit({ id }, { method: "DELETE", action: "/clients" });
    };

    const clientDisplay = (
        <Card className="mt-2">
            <div className="m-3 grid grid-cols-6 gap-x-4 gap-y-4 text-left">
                <div className="col-span-5">
                    <p>
                        <b className="text-indigo-600">{t("label.client")}: </b>{" "}
                        {client.first_name}&nbsp;{client.last_name}
                    </p>
                </div>
                <div className="col-span-3">
                    <p>
                        <b className="text-indigo-600">{t("label.phone1")}: </b>{" "}
                        {client?.phone}
                    </p>
                </div>
                <div className="col-span-3">
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
                        <b className="text-indigo-600">
                            {t("label.address")}:{" "}
                        </b>{" "}
                        {client?.address}, {client?.city}, {client?.state},{" "}
                        {client?.country}
                    </p>
                </div>
            </div>
        </Card>
    );

    // !!client.client_id  t("modal.title.delete")
    const onClose = () => {
        setOpen("");
    };

    const mainContent = (
        <>
            <div className="mt-2">
                <p className="text-gray-700 text-lg">
                    {t("modal.tips.delete")}
                </p>
                {clientDisplay}
            </div>

            <DelBtn
                onClick={() => {
                    handleDeleteClient(client.client_id);
                    onClose();
                }}
                onClose={onClose}
            />
        </>
    );

    return (
        <ModalFrame
            open={!!(open === "Del")}
            onClose={onClose}
            title={t("modal.title.delete")}
            isMajor={true}
            mode={"md"}
        >
            {mainContent}
        </ModalFrame>
    );
};

export default MClientDel;
