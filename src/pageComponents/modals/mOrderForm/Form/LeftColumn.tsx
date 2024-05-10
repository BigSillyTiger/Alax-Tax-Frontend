import { ClientInfoCard } from "@/pageComponents/cards";
import type { FC } from "react";
import AddressContent from "./AddressContent";
import DetailsContent from "./DetailsContent";
import { useTranslation } from "react-i18next";
import { atOrder } from "@/configs/atoms";
import { useAtom } from "jotai";
import { TorderForm } from "@/configs/schema/orderSchema";
import { FieldErrors, UseFormReturn } from "react-hook-form";

type Tprops = {
    register: UseFormReturn<TorderForm>["register"];
    errors: FieldErrors<TorderForm>;
    calTotalGst: number;
    calTotal: number;
};

const LeftColumn: FC<Tprops> = ({
    register,
    errors,
    calTotalGst,
    calTotal,
}) => {
    const { t } = useTranslation();
    const [clientOrder] = useAtom(atOrder);

    return (
        <div className="col-span-1 lg:col-span-3 grid grid-cols-1">
            {/* client info */}
            <fieldset className="">
                <legend className="text-indigo-500 text-bold">
                    <b>{t("label.clientInfo")}:</b>
                </legend>
                <ClientInfoCard
                    client={clientOrder.client_info}
                    className="my-2 mx-1 text-sm"
                />
            </fieldset>
            {/* addres */}
            <fieldset className="">
                <legend className="text-indigo-500 text-bold">
                    <b>{t("label.workAddr")}:</b>
                </legend>
                <AddressContent register={register} errors={errors} />
            </fieldset>
            {/* details */}
            <fieldset className="">
                <legend className="text-indigo-500 text-bold">
                    {t("label.orderDetail")}:
                </legend>
                <DetailsContent
                    register={register}
                    calTotalGst={calTotalGst}
                    calTotal={calTotal}
                />
            </fieldset>
        </div>
    );
};

export default LeftColumn;
