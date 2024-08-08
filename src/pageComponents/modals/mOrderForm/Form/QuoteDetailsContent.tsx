import type { FC } from "react";
import { TorderForm } from "@/configs/schema/orderSchema";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Fieldset from "@/components/Fieldset";
import { Input } from "@/components/ui/input";

type Tprops = {
    register: UseFormReturn<TorderForm>["register"];
    calTotalGst?: number;
    calTotalNet?: number;
    calTotal: number;
};

const QuoteDetailsContent: FC<Tprops> = ({
    register,
    //calTotalGst = 0,
    calTotalNet,
    calTotal,
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
                    <option value={t("status.pending")}>
                        {t("status.pending")}
                    </option>
                    <option value={t("status.ongoing")}>
                        {t("status.ongoing")}
                    </option>
                    <option value={t("status.completed")}>
                        {t("status.completed")}
                    </option>
                    <option value={t("status.cancelled")}>
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
                    readOnly
                    type="number"
                    step="0.01"
                    min={0}
                    id="deposit"
                    name="deposit"
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
                    {...register("net", { valueAsNumber: true })}
                    readOnly
                    type="number"
                    step="0.01"
                    min={0}
                    id="net"
                    name="net"
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
                    htmlFor="valid"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.quoteValid")}
                </label>

                <Input
                    {...register("q_valid", {
                        valueAsNumber: true,
                    })}
                    readOnly
                    type="number"
                    step="1"
                    min={0}
                    id="valid"
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
                        valueAsDate: true,
                    })}
                    readOnly
                    type="date"
                    id="qDate"
                />
            </div>
        </Fieldset>
    );
};

export default QuoteDetailsContent;
