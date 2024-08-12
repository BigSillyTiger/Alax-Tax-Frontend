import type { FC } from "react";
import { TorderForm } from "@/configs/schema/orderSchema";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Fieldset from "@/components/Fieldset";
import { Input } from "@/components/ui/input";
import { dateMax, dateMin } from "@/configs/utils/date";
import { ORDER_STATUS } from "@/configs/utils/setting";

type Tprops = {
    register: UseFormReturn<TorderForm>["register"];
    calTotalGst?: number;
    calTotalNet?: number;
    calTotal: number;
    setQDate: (date: string) => void;
};

const QuoteDetailsContent: FC<Tprops> = ({
    register,
    //calTotalGst = 0,
    calTotalNet,
    calTotal,
    setQDate,
}) => {
    const { t } = useTranslation();

    return (
        <Fieldset
            title={t("label.orderQuoteDetail")}
            sFieldset="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6"
        >
            {/* order satus */}
            <div className="sm:col-span-3">
                <label
                    htmlFor="status"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.status")}
                </label>

                <select
                    {...register("status")}
                    id="status"
                    //autoComplete="status"
                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                >
                    <option value={ORDER_STATUS[0]}>
                        {t("status.pending")}
                    </option>
                    <option value={ORDER_STATUS[1]}>
                        {t("status.ongoing")}
                    </option>
                    <option value={ORDER_STATUS[3]}>
                        {t("status.completed")}
                    </option>
                    <option value={ORDER_STATUS[2]}>
                        {t("status.cancelled")}
                    </option>
                </select>
            </div>
            {/* order deposit fee */}
            <div className="sm:col-span-3">
                <label
                    htmlFor="deposit"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.deposit")}
                </label>
                <Input
                    {...register("q_deposit", {
                        valueAsNumber: true,
                    })}
                    type="number"
                    step="0.01"
                    min={0}
                    id="deposit"
                />
            </div>
            {/* order total Gst */}
            <div className="sm:col-span-3">
                <label
                    htmlFor="net"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.net")}
                </label>
                <Input
                    {...register("net", { valueAsNumber: true, min: 0 })}
                    readOnly
                    type="number"
                    step="0.01"
                    min={0}
                    id="net"
                    value={calTotalNet}
                />
            </div>
            {/* order total fee */}
            <div className="sm:col-span-3">
                <label
                    htmlFor="total"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.total")}
                </label>

                <Input
                    {...register("total", {
                        valueAsNumber: true,
                        min: 0,
                    })}
                    readOnly
                    type="number"
                    step="0.01"
                    min={0}
                    id="total"
                    value={calTotal}
                />
            </div>
            {/* order quote valid days */}
            <div className="sm:col-span-3">
                <label
                    htmlFor="validDays"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.quoteValid")}
                </label>

                <Input
                    {...register("q_valid", {
                        valueAsNumber: true,
                    })}
                    type="number"
                    step="1"
                    id="validDays"
                    min={0}
                />
            </div>
            {/* order quote issued date */}
            <div className="sm:col-span-3">
                <label
                    htmlFor="qDate"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.quoteDate")}
                </label>

                <Input
                    {...register("q_date", {
                        onChange: (e) => {
                            setQDate(e.target.value);
                        },
                    })}
                    type="date"
                    id="qDate"
                    min={dateMin}
                    max={dateMax}
                />
            </div>
        </Fieldset>
    );
};

export default QuoteDetailsContent;
