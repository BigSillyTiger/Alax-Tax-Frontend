import { memo } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { MTemplate } from "@/components/modal";
import { useSubmit } from "react-router-dom";
import Card from "@/components/card";
import { DelBtn } from "@/components/form";
import { TorderWithDetails } from "@/configs/schema/orderSchema";
import { TclientOrderModal } from "@/utils/types";
import { Tclient } from "@/configs/schema/clientSchema";

type Tprops = {
    client: Tclient;
    order: TorderWithDetails;
    open: TclientOrderModal;
    setOpen: (value: TclientOrderModal) => void;
};

// this component is about building a modal with transition to delete a client
const MOrderDel: FC<Tprops> = ({ client, order, open, setOpen }) => {
    const submit = useSubmit();
    const { t } = useTranslation();

    const handleDeleteClient = async (order_id: number) => {
        submit(
            { order_id },
            { method: "DELETE", action: `/clients/${client.client_id}` }
        );
    };

    const clientDisplay = (
        <Card className="mt-2">
            <div className="m-3 grid grid-cols-6 gap-x-4 gap-y-4 text-left">
                <div className="col-span-3">
                    <p>
                        <b className="text-indigo-600">
                            {t("label.orderId")}:{" "}
                        </b>{" "}
                        {order?.order_id}
                    </p>
                </div>
                <div className="col-span-3">
                    <p>
                        <b className="text-indigo-600">{t("label.pc")}: </b>{" "}
                        {order?.order_pc}
                    </p>
                </div>

                <div className="col-span-full">
                    <p>
                        <b className="text-indigo-600">
                            {t("label.address")}:{" "}
                        </b>{" "}
                        {order?.order_address}, {order?.order_suburb},{" "}
                        {order?.order_city}, {order?.order_state},{" "}
                        {order?.order_country}
                    </p>
                </div>
            </div>
        </Card>
    );

    const onClose = () => {
        setOpen("");
    };

    const mainContent = (
        <>
            <div className="mt-2">
                <p className="text-gray-700 text-lg">
                    {t("modal.tips.delOrder")}
                </p>
                {clientDisplay}
            </div>

            <DelBtn
                onClick={() => {
                    handleDeleteClient(order.order_id);
                    onClose();
                }}
                onClose={onClose}
            />
        </>
    );

    return (
        <MTemplate
            open={!!(open === "Del")}
            onClose={onClose}
            title={t("modal.title.delete")}
            isMajor={true}
            mode={"md"}
            mQuit={false}
        >
            {mainContent}
        </MTemplate>
    );
};

export default memo(MOrderDel);
