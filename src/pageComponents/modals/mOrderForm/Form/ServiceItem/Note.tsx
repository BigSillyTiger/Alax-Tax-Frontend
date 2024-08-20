import type { FC } from "react";
import Label from "@/components/Label";
import { Textarea } from "@/components/ui/textarea";
import { TorderForm } from "@/configs/schema/orderSchema";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Tprops = {
    index: number;
    register: UseFormReturn<TorderForm>["register"];
    setValue: UseFormReturn<TorderForm>["setValue"];
};

const Note: FC<Tprops> = ({ index, register, setValue }) => {
    const { t } = useTranslation();

    return (
        <div className="col-span-6 sm:col-span-7">
            <Label htmlFor="note" className="block text-sm font-normal">
                {t("label.note")}
            </Label>
            <Textarea
                {...register(`order_services.${index}.note`)}
                id="note"
                name="note"
                rows={4}
                onChange={(e) => {
                    setValue(`order_services.${index}.note`, e.target.value);
                }}
            />
        </div>
    );
};

export default Note;
