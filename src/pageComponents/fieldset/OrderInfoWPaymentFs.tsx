import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Torder } from "@/configs/schema/orderSchema";
import { minusAB } from "@/lib/calculations";
import Fieldset from "@/components/Fieldset";
import { Separator } from "@/components/ui/separator";
import { Btext } from "@/components/Btext";

type TorderInfo = {
    order: Torder;
    paid: number;
    sFieldset?: string;
};

const OrderInfoWPaymentFs: FC<TorderInfo> = ({ order, paid, sFieldset }) => {
    const { t } = useTranslation();
    return (
        <Fieldset
            title={t("label.orderInfo")}
            sFieldset={`grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 ${sFieldset}`}
        >
            {/* address */}
            <div className="col-span-full break-words">
                <p className="text-lg">
                    <Btext>{t("label.workAddr")}: </Btext> {order?.address},{" "}
                    {order?.suburb}, {order?.city}, {order?.state},{" "}
                    {order?.country}, {order?.postcode}
                </p>
            </div>
            {/*  */}
            <Separator
                orientation="horizontal"
                className="border-indigo-300 col-span-full"
                decorative={true}
            />
            {/* payment */}
            <div className="col-span-full grid grid-cols-2 text-lg">
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
                        {paid}
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        <Btext>{t("label.balance")}: </Btext>{" "}
                        {minusAB(order?.total, paid)}
                        {}
                    </p>
                </div>
            </div>
        </Fieldset>
    );
};

export default OrderInfoWPaymentFs;
