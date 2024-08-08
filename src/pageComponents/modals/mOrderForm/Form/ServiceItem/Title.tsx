import type { FC } from "react";
import Label from "@/components/Label";
import DataList from "@/components/dataList";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { TorderForm } from "@/configs/schema/orderSchema";
import { atSUData } from "@/configs/atoms";
import { useAtom } from "jotai";

type Tprops = {
    index: number;
    register: UseFormReturn<TorderForm>["register"];
};

const Title: FC<Tprops> = ({ index, register }) => {
    const { t } = useTranslation();

    const [uniData] = useAtom(atSUData);

    const serviceTitleList = uniData ? (
        <DataList
            id={"service_title"}
            name={"service"}
            data={uniData.services}
        />
    ) : null;

    return (
        <div className="col-span-full">
            <Label htmlFor="title" className="block text-sm font-normal">
                {t("label.service") + " " + (index + 1)}
            </Label>
            <Input
                {...register(`order_services.${index}.title`)}
                id="title"
                type="text"
                list="service_title"
            />
            {serviceTitleList}
        </div>
    );
};

export default Title;
