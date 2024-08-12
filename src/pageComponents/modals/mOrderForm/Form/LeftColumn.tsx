import type { FC } from "react";
import QuoteDetailsContent from "./QuoteDetailsContent";
import { useTranslation } from "react-i18next";
import { atOrderWithClient } from "@/configs/atoms";
import { useAtom } from "jotai";
import { TorderForm } from "@/configs/schema/orderSchema";
import { UseFormReturn } from "react-hook-form";
import { ClientInfoFs } from "@/pageComponents/fieldset";
import OrderNote from "./OrderNote";
import ModalTitle from "../../ModalTitle";

type Tprops = {
    register: UseFormReturn<TorderForm>["register"];
    calTotalGst: number;
    calTotalNet: number;
    calTotal: number;
    setQDate: (date: string) => void;
};

const LeftColumn: FC<Tprops> = ({
    register,
    calTotalGst,
    calTotalNet,
    calTotal,
    setQDate,
}) => {
    const { t } = useTranslation();
    const [clientOrder] = useAtom(atOrderWithClient);

    return (
        <div className="col-span-1 lg:col-span-3 flex flex-col">
            {/* title */}
            <ModalTitle title={t("modal.title.addOrder")} />
            {/* client info */}
            <ClientInfoFs
                title={t("label.clientInfo")}
                client={clientOrder.client_info}
                sFieldset={`col-span-full my-2 mx-1`}
            />

            {/* details */}
            <QuoteDetailsContent
                register={register}
                calTotalGst={calTotalGst}
                calTotalNet={calTotalNet}
                calTotal={calTotal}
                setQDate={setQDate}
            />
            {/* note */}
            <OrderNote register={register} />
        </div>
    );
};

export default LeftColumn;
