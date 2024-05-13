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
import { Tpayment } from "@/configs/schema/orderSchema";
import OrderInfoWPaymentFs from "@/pageComponents/fieldset/OrderInfoWPaymentFs";
import { ClientInfoFs } from "@/pageComponents/fieldset";

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
            <ClientInfoFs
                client={clientOrder.client_info}
                title={t("label.clientInfo")}
                sFieldset="my-2 mx-1 text-sm"
            />
            {/* order info */}
            <OrderInfoWPaymentFs
                order={clientOrder}
                paid={totalPaid}
                sFieldset="my-2 mx-1 text-sm"
            />

            <PaymentsContent
                fields={fields}
                register={register}
                remove={remove}
                title={t("label.payments")}
                sFieldset="col-span-full"
            />
        </div>
    );
};

export default LeftColumn;
