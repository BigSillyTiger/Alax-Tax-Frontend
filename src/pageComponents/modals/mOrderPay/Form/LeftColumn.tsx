import { ClientInfoCard, OrderInfoCard } from "@/pageComponents/cards";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import PaymentsContent from "./PaymentsContent";
import { atOrder } from "@/configs/atoms";
import { useAtom } from "jotai";
import {
    FieldArrayWithId,
    UseFieldArrayRemove,
    UseFormReturn,
} from "react-hook-form";
import { TorderPayment } from "@/configs/schema/orderSchema";

type Tpayment = {
    payments: TorderPayment[];
};

type Tprops = {
    totalPaid: number;
    fields: FieldArrayWithId<Tpayment>[];
    register: UseFormReturn<Tpayment>["register"];
    remove: UseFieldArrayRemove;
};

const LeftColumn: FC<Tprops> = ({ totalPaid, fields, register, remove }) => {
    const { t } = useTranslation();
    const [clientOrder] = useAtom(atOrder);

    return (
        <div className="col-span-1 lg:col-span-3 grid grid-cols-1">
            {/* client info */}
            <fieldset className="col-span-full">
                <legend className="text-indigo-500 text-bold">
                    <b>{t("label.clientInfo")}:</b>
                </legend>
                <ClientInfoCard
                    client={clientOrder.client_info}
                    className="my-2 mx-1 text-sm"
                />
            </fieldset>
            {/* order info */}
            <fieldset className="col-span-full">
                <legend className="text-indigo-500 text-bold">
                    <b>{t("label.orderInfo")}:</b>
                </legend>
                <OrderInfoCard
                    order={clientOrder}
                    paid={totalPaid}
                    className="my-2 mx-1 text-sm"
                />
            </fieldset>
            <fieldset className="col-span-full">
                <legend className="text-indigo-500 text-bold">
                    <b>{t("label.payments")}</b>
                </legend>
                <PaymentsContent
                    fields={fields}
                    register={register}
                    remove={remove}
                />
            </fieldset>
        </div>
    );
};

export default LeftColumn;
