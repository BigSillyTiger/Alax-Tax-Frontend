import type { FC } from "react";
import Card from "@/components/card";
import { useTranslation } from "react-i18next";
import { TorderWithDetails } from "@/configs/schema/orderSchema";
import { minusAB } from "@/utils/calculations";

type TorderInfo = {
    order: TorderWithDetails;
    className: string;
};

const OrderDetailsCard: FC<TorderInfo> = ({ order, className }) => {
    const { t } = useTranslation();
    return (
        <Card
            className={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 ${className}`}
        >
            {/* address */}
            <section className="col-span-full pb-3 break-words border-b-2 border-dotted border-indigo-300">
                <p>
                    <b className="text-indigo-600">{t("label.workAddr")}: </b>{" "}
                    {order?.order_address}, {order?.order_suburb},{" "}
                    {order?.order_city}, {order?.order_state},{" "}
                    {order?.order_country}, {order?.order_pc}
                </p>
            </section>

            <section className="col-span-full grid grid-cols-2 gap-2">
                <div className="col-span-1">
                    <p>
                        <b className="text-indigo-600">{t("label.due")}: </b>{" "}
                        {order?.order_total}
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        <b className="text-indigo-600">{t("label.gst")}: </b>{" "}
                        {order?.order_gst}
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        <b className="text-indigo-600">{t("label.paid")}: </b>
                        {order.order_paid}
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        <b className="text-indigo-600">
                            {t("label.balance")}:{" "}
                        </b>{" "}
                        {minusAB(order?.order_total, order?.order_paid)}
                    </p>
                </div>
            </section>
        </Card>
    );
};

export default OrderDetailsCard;
