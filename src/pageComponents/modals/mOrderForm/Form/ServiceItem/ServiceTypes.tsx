import DataList from "@/components/dataList";
import Label from "@/components/Label";
import { Input } from "@/components/ui/input";
import { TorderForm } from "@/configs/schema/orderSchema";
import type { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Tprops = {
    index: number;
    register: UseFormReturn<TorderForm>["register"];
};

const ServiceTypes: FC<Tprops> = ({ index, register }) => {
    const { t } = useTranslation();

    const serviceType = {
        types: [{ name: "t1" }, { name: "t2" }, { name: "t3" }],
    };

    const serviceTypeList = serviceType ? (
        <DataList
            id={"serviceTypeList"}
            name={"name"}
            data={serviceType.types}
        />
    ) : null;

    const productNameList = serviceType ? (
        <DataList
            id={"productNameList"}
            name={"name"}
            data={serviceType.types}
        />
    ) : null;

    return (
        <div className="flex flex-row items-stretch gap-x-3">
            {/* service type */}
            <div className="w-[20%]">
                <Label
                    htmlFor="serviceType"
                    className="block text-sm font-normal"
                >
                    {t("label.serviceType")}
                </Label>
                <Input
                    {...register(`order_services.${index}.service_type`)}
                    id="serviceType"
                    type="text"
                    list="serviceTypeList"
                />
                {serviceTypeList}
            </div>
            {/* product name */}
            <div className="grow">
                <Label
                    htmlFor="productName"
                    className="block text-sm font-normal"
                >
                    {t("label.productName")}
                </Label>
                <Input
                    {...register(`order_services.${index}.product_name`)}
                    id="productName"
                    type="text"
                    list="productNameList"
                />
                {productNameList}
            </div>
        </div>
    );
};

export default ServiceTypes;
