import { memo } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { MTemplate } from "@/components/modal";
import { useSubmit } from "react-router-dom";
import Card from "@/components/card";
import { DelBtn } from "@/components/form";
import { atOrderWithPayments, atClient, atModalOpen } from "@/configs/atoms";
import { mOpenOps } from "@/configs/utils";

// this component is about building a modal with transition to delete a client
const MOrderDel: FC = memo(() => {
    const submit = useSubmit();
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [client] = useAtom(atClient);
    const [clientOrder] = useAtom(atOrderWithPayments);

    const handleDeleteClient = async (order_id: string) => {
        await submit(
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
                        {clientOrder?.order_id}
                    </p>
                </div>
                <div className="col-span-3">
                    <p>
                        <b className="text-indigo-600">{t("label.pc")}: </b>{" "}
                        {clientOrder?.order_pc}
                    </p>
                </div>

                <div className="col-span-full">
                    <p>
                        <b className="text-indigo-600">
                            {t("label.address")}:{" "}
                        </b>{" "}
                        {clientOrder?.order_address},{" "}
                        {clientOrder?.order_suburb}, {clientOrder?.order_city},{" "}
                        {clientOrder?.order_state}, {clientOrder?.order_country}
                    </p>
                </div>
            </div>
        </Card>
    );

    const onClose = () => {
        setModalOpen("");
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
                    handleDeleteClient(clientOrder.order_id);
                    onClose();
                }}
                onClose={onClose}
            />
        </>
    );

    return (
        <MTemplate
            open={!!(modalOpen === mOpenOps.del)}
            onClose={onClose}
            title={t("modal.title.delete")}
            isMajor={true}
            mode={"md"}
            mQuit={false}
        >
            {mainContent}
        </MTemplate>
    );
});

export default MOrderDel;
