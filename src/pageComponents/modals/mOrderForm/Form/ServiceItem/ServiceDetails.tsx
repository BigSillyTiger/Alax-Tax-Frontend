import { Controller } from "react-hook-form";
import Label from "@/components/Label";
import { TorderForm } from "@/configs/schema/orderSchema";
import {
    ORDER_STATUS,
    PRODUCT_NAME,
    SERVICE_TYPE,
    //serviceTypeList,
} from "@/configs/utils/setting";
import type { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { capFirstLetter } from "@/lib/literals";
import { statusColor } from "@/configs/utils/color";
import { TorderStatus } from "@/configs/types";

type Tprops = {
    index: number;
    control: UseFormReturn<TorderForm>["control"];
};

const ServiceDetails: FC<Tprops> = ({ index, control }) => {
    const { t } = useTranslation();

    // order service status List
    const ossList = ORDER_STATUS.map((item) => (
        <SelectItem
            value={item}
            className={`${statusColor[item].text} ${statusColor[item].fbg} ${statusColor[item].ftext}`}
        >
            {capFirstLetter(item)}
        </SelectItem>
    ));

    // controlled order service status
    const CorderServiceStatus = () => (
        <Controller
            name={`order_services.${index}.status`}
            control={control}
            render={({ field: { onChange, value } }) => {
                return (
                    <div className="w-[20%]">
                        <Label className="block text-sm font-normal">
                            {t("label.status")}

                            <Select
                                onValueChange={onChange}
                                defaultValue={value}
                            >
                                <SelectTrigger
                                    className={`${statusColor[value as TorderStatus].text} ${statusColor[value as TorderStatus].fbg} ${statusColor[value as TorderStatus].ftext}`}
                                >
                                    <SelectValue
                                        placeholder={t("label.status")}
                                    />
                                </SelectTrigger>
                                <SelectContent>{ossList}</SelectContent>
                            </Select>
                        </Label>
                    </div>
                );
            }}
        />
    );

    // service type list
    const pnList = PRODUCT_NAME.map((item) => (
        <SelectItem value={item}>{item}</SelectItem>
    ));

    // product name content
    const CProductName = () => (
        <Controller
            name={`order_services.${index}.product_name`}
            control={control}
            render={({ field: { onChange, value } }) => {
                return (
                    <div className="grow">
                        <Label className="block text-sm font-normal">
                            {t("label.productName")}
                            <Select
                                onValueChange={onChange}
                                defaultValue={value}
                            >
                                <SelectTrigger className="">
                                    <SelectValue
                                        placeholder={t("label.productName")}
                                    />
                                </SelectTrigger>
                                <SelectContent>{pnList}</SelectContent>
                            </Select>
                        </Label>
                    </div>
                );
            }}
        />
    );

    // service type list
    const stList = SERVICE_TYPE.map((item) => (
        <SelectItem value={item}>{item}</SelectItem>
    ));

    // controlled service type
    const CServiceType = () => (
        <Controller
            name={`order_services.${index}.service_type`}
            control={control}
            render={({ field: { onChange, value } }) => {
                return (
                    <div className="w-[20%]">
                        <Label className="block text-sm font-normal">
                            {t("label.serviceType")}

                            <Select
                                onValueChange={onChange}
                                defaultValue={value}
                            >
                                <SelectTrigger className="">
                                    <SelectValue
                                        placeholder={t("label.serviceType")}
                                    />
                                </SelectTrigger>
                                <SelectContent>{stList}</SelectContent>
                            </Select>
                        </Label>
                    </div>
                );
            }}
        />
    );

    return (
        <div className="flex flex-row items-stretch gap-x-3">
            {/* service status */}
            <CorderServiceStatus />

            {/* product name */}
            <CProductName />
            {/* service type */}
            <CServiceType />
        </div>
    );
};

export default ServiceDetails;
