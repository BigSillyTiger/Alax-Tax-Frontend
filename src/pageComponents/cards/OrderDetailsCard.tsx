import type { FC } from "react";
import Card from "@/components/card";
import { useTranslation } from "react-i18next";
import { Torder } from "@/configs/schema/orderSchema";
import { minusAB } from "@/lib/calculations";

type TorderInfo = {
    order: Torder;
    className: string;
};

const OrderDetailsCard: FC<TorderInfo> = ({ order, className }) => {
    const { t } = useTranslation();
    return (
        <Card
            className={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 ${className}`}
        >
            {/* address */}
            <div className="col-span-full pb-3 break-words border-b-2 border-dotted border-indigo-300">
                <p>
                    <b className="text-indigo-600">{t("label.workAddr")}: </b>{" "}
                    {order?.address}, {order?.suburb}, {order?.city},{" "}
                    {order?.state}, {order?.country}, {order?.postcode}
                </p>
            </div>

            <div className="col-span-full grid grid-cols-2 gap-2">
                <div className="col-span-1">
                    <p>
                        <b className="text-indigo-600">{t("label.due")}: </b>{" "}
                        {order?.total}
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        <b className="text-indigo-600">{t("label.gst")}: </b>{" "}
                        {order?.gst}
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        <b className="text-indigo-600">{t("label.paid")}: </b>
                        {order.paid}
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        <b className="text-indigo-600">
                            {t("label.balance")}:{" "}
                        </b>{" "}
                        {minusAB(order?.total, order?.paid)}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default OrderDetailsCard;
