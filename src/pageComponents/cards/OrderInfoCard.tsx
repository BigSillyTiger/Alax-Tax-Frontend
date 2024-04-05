import type { FC } from "react";
import Card from "@/components/card";
import { useTranslation } from "react-i18next";
import { Torder } from "@/configs/schema/orderSchema";
import { minusAB } from "@/lib/calculations";

type TorderInfo = {
    order: Torder;
    paid: number;
    className: string;
};

const OrderInfoCard: FC<TorderInfo> = ({ order, paid, className }) => {
    const { t } = useTranslation();
    return (
        <Card
            className={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 ${className}`}
        >
            <div className="col-span-full break-words">
                <p>
                    <b className="text-indigo-600">{t("label.workAddr")}: </b>{" "}
                    {order?.address}, {order?.suburb}, {order?.city},{" "}
                    {order?.state}, {order?.country}, {order?.postcode}
                </p>
            </div>
            <div className="col-span-3">
                <p>
                    <b className="text-indigo-600">{t("label.due")}: </b>{" "}
                    {order?.total}
                </p>
            </div>
            <div className="col-span-3">
                <p>
                    <b className="text-indigo-600">{t("label.gst")}: </b>{" "}
                    {order?.gst}
                </p>
            </div>
            <div className="col-span-3">
                <p>
                    <b className="text-indigo-600">{t("label.paid")}: </b>
                    {paid}
                </p>
            </div>
            <div className="col-span-3">
                <p>
                    <b className="text-indigo-600">{t("label.balance")}: </b>{" "}
                    {minusAB(order?.total, paid)}
                    {}
                </p>
            </div>
        </Card>
    );
};

export default OrderInfoCard;
