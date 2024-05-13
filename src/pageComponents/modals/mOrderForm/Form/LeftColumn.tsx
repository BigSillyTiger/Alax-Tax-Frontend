import type { FC } from "react";
import AddressContent from "./AddressContent";
import DetailsContent from "./DetailsContent";
import { useTranslation } from "react-i18next";
import { atOrder } from "@/configs/atoms";
import { useAtom } from "jotai";
import { TorderForm } from "@/configs/schema/orderSchema";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { ClientInfoFs } from "@/pageComponents/fieldset";

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
            <ClientInfoFs
                title={t("label.clientInfo")}
                client={clientOrder.client_info}
                sFieldset={`col-span-full my-2 mx-1`}
            />
            {/* addres */}
            <AddressContent
                register={register}
                errors={errors}
                sFieldset={`col-span-full my-2 mx-1`}
            />

            {/* details */}
            <DetailsContent
                register={register}
                calTotalGst={calTotalGst}
                calTotal={calTotal}
            />
        </div>
    );
};

export default LeftColumn;
