import type { FC } from "react";
import Fieldset from "@/components/Fieldset";
import { TorderForm } from "@/configs/schema/orderSchema";
import {
    FieldArrayWithId,
    UseFieldArrayRemove,
    UseFieldArraySwap,
    UseFormReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import ServiceItem from "./ServiceItem";
import { TorderService } from "@/configs/schema/orderServiceSchema";

type Tprops = {
    register: UseFormReturn<TorderForm>["register"];
    setValue: UseFormReturn<TorderForm>["setValue"];
    watch: UseFormReturn<TorderForm>["watch"];
    fields: FieldArrayWithId<TorderService>[];
    remove: UseFieldArrayRemove;
    swap: UseFieldArraySwap;
    sFieldset?: string;
};

const ServiceContent: FC<Tprops> = ({
    register,
    watch,
    remove,
    fields,
    setValue,
    swap,
    sFieldset,
}) => {
    const { t } = useTranslation();

    const title =
        fields.length != 0
            ? t("label.serviceList") + "(" + fields.length + ")"
            : t("label.serviceList");

    return (
        <Fieldset title={title} sFieldset={`overflow-y-auto ${sFieldset}`}>
            <ServiceItem
                fields={fields}
                remove={remove}
                swap={swap}
                register={register}
                setValue={setValue}
                watch={watch}
            />
        </Fieldset>
    );
};

export default ServiceContent;
