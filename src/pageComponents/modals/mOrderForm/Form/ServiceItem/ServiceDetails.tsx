import DataList from "@/components/dataList";
import Label from "@/components/Label";
import { Input } from "@/components/ui/input";
import { TorderForm } from "@/configs/schema/orderSchema";
import { orderStatusList, serviceTypeList } from "@/configs/utils/setting";
import type { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Tprops = {
    index: number;
    register: UseFormReturn<TorderForm>["register"];
};

const ServiceDetails: FC<Tprops> = ({ index, register }) => {
    const { t } = useTranslation();

    const serviceName = {
        types: [{ name: "N1" }, { name: "N2" }, { name: "N3" }],
    };

    const sTypeList = (
        <DataList id={"serviceTypeList"} name={"name"} data={serviceTypeList} />
    );

    const productNameList = serviceName ? (
        <DataList
            id={"productNameList"}
            name={"name"}
            data={serviceName.types}
        />
    ) : null;

    const serviceStatusList = (
        <DataList
            id={"serviceStatusList"}
            name={"name"}
            data={orderStatusList}
        />
    );

    return (
        <div className="flex flex-row items-stretch gap-x-3">
            {/* service status */}
            <div className="w-[20%]">
                <Label
                    htmlFor="serviceStatus"
                    className="block text-sm font-normal"
                >
                    {t("label.status")}
                </Label>
                <Input
                    {...register(`order_services.${index}.status`)}
                    id="serviceStatus"
                    type="text"
                    list="serviceStatusList"
                />
                {serviceStatusList}
            </div>
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
                {sTypeList}
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

export default ServiceDetails;
