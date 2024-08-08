import Fieldset from "@/components/Fieldset";
import { Textarea } from "@/components/ui/textarea";
import { TorderForm } from "@/configs/schema/orderSchema";
import type { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Tprops = {
    register: UseFormReturn<TorderForm>["register"];
};

const OrderNote: FC<Tprops> = ({ register }) => {
    const { t } = useTranslation();
    return (
        <Fieldset title={t("label.note")} sFieldset="grow">
            <Textarea {...register("note")} className="h-full" />
        </Fieldset>
    );
};

export default OrderNote;
