import Label from "@/components/Label";
import { Input } from "@/components/ui/input";
import DataList from "@/components/dataList";
import { TorderForm } from "@/configs/schema/orderSchema";
import { useCallback, type FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { calGst, calNetto } from "@/lib/calculations";
import { atSUData } from "@/configs/atoms";
import { useAtom } from "jotai";

type Tprops = {
    index: number;
    register: UseFormReturn<TorderForm>["register"];
    setValue: UseFormReturn<TorderForm>["setValue"];
    watch: UseFormReturn<TorderForm>["watch"];
};

const Fee: FC<Tprops> = ({ index, register, setValue, watch }) => {
    const { t } = useTranslation();

    const [uniData] = useAtom(atSUData);

    const unitsList = uniData ? (
        <DataList id={"unit_name"} name={"unit_name"} data={uniData.units} />
    ) : null;

    const calSNettoGst = useCallback(
        (index: number) => {
            const total = calNetto(
                watch(`order_services.${index}.qty`, 0),
                watch(`order_services.${index}.unit_price`, 0)
            );
            if (watch(`order_services.${index}.taxable`, true)) {
                const gst = calGst(total);
                setValue(`order_services.${index}.gst`, gst);
            } else {
                setValue(`order_services.${index}.gst`, 0);
            }
            setValue(`order_services.${index}.net`, total);
        },
        [watch, setValue]
    );

    return (
        <div className="flex flex-row gap-x-3">
            {/* qty */}
            <div className="">
                <Label htmlFor="qty" className="block text-sm font-normal">
                    {t("label.qty")}
                </Label>
                <Input
                    {...register(`order_services.${index}.qty`, {
                        valueAsNumber: true,
                        min: 0,
                    })}
                    id="qty"
                    min={0}
                    type="number"
                    step="0.01"
                    onChange={(e) => {
                        setValue(
                            `order_services.${index}.qty`,
                            Number(e.target.value)
                        );
                        calSNettoGst(index);
                        //return Number(e.target.value);
                    }}
                />
            </div>
            {/* unit */}
            <div className="">
                <Label htmlFor="unit" className="block text-sm font-normal">
                    {t("label.unit")}
                </Label>
                <Input
                    {...register(`order_services.${index}.unit`)}
                    id="unit"
                    type="text"
                    list="unit_name"
                />
                {unitsList}
            </div>
            {/* unit price */}
            <div className="">
                <Label
                    htmlFor="unit_price"
                    className="block text-sm font-normal"
                >
                    {t("label.uPrice")}
                </Label>
                <Input
                    {...register(`order_services.${index}.unit_price`, {
                        valueAsNumber: true,
                        min: 0,
                    })}
                    id="unit_price"
                    type="number"
                    step="0.01"
                    min={0}
                    onChange={(e) => {
                        setValue(
                            `order_services.${index}.unit_price`,
                            Number(e.target.value)
                        );
                        return calSNettoGst(index);
                    }}
                />
            </div>
            {/* net */}
            <div className="">
                <Label htmlFor="net" className="block text-sm font-normal">
                    {t("label.net")}
                </Label>
                <Input
                    {...register(`order_services.${index}.net`, {
                        valueAsNumber: true,
                    })}
                    id="net"
                    type="number"
                    step="0.01"
                />
            </div>
            {/* taxable */}
            <div className="flex flex-col justify-center items-center">
                <Label htmlFor="taxable" className="block text-sm font-normal">
                    {t("label.taxable")}
                </Label>
                <Input
                    {...register(`order_services.${index}.taxable`)}
                    className="shadow-none"
                    id="taxable"
                    type="checkbox"
                    onChange={(e) => {
                        setValue(
                            `order_services.${index}.taxable`,
                            e.target.checked
                        );
                        calSNettoGst(index);
                    }}
                />
            </div>
            {/* gst */}
            <div className="">
                <Label htmlFor="unit" className="block text-sm font-normal">
                    {t("label.gst")}
                </Label>
                <Input
                    {...register(`order_services.${index}.gst`)}
                    id="gst"
                    type="number"
                    step="0.01"
                    min={0}
                />
            </div>
        </div>
    );
};

export default Fee;
