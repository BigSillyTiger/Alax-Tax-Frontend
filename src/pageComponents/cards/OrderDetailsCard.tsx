import type { FC } from "react";
import Card from "@/components/Card";
import { useTranslation } from "react-i18next";
import { TorderWithClient } from "@/configs/schema/orderSchema";
import { minusAB } from "@/lib/calculations";
import { Btext } from "@/components/Btext";

type TorderInfo = {
    order: TorderWithClient;
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
                    <Btext>{t("label.workAddr")}: </Btext>{" "}
                    {order?.client_info.address}, {order?.client_info.suburb},{" "}
                    {order?.client_info.city}, {order?.client_info.state},{" "}
                    {order?.client_info.country}, {order?.client_info.postcode}
                </p>
            </div>

            <div className="col-span-full grid grid-cols-2 gap-2">
                <div className="col-span-1">
                    <p>
                        <Btext>{t("label.due")}: </Btext> {order?.total}
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        <Btext>{t("label.gst")}: </Btext> {order?.gst}
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        <Btext>{t("label.paid")}: </Btext>
                        {order.paid}
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        <Btext>{t("label.balance")}: </Btext>{" "}
                        {minusAB(order?.total, order?.paid)}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default OrderDetailsCard;
