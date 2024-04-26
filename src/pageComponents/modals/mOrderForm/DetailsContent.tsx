import type { FC } from "react";
import Card from "@/components/card";
import { TorderForm } from "@/configs/schema/orderSchema";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Tprops = {
    register: UseFormReturn<TorderForm>["register"];
    calTotalGst: number;
    calTotal: number;
};

const DetailsContent: FC<Tprops> = ({ register, calTotalGst, calTotal }) => {
    const { t } = useTranslation();

    return (
        <Card className="my-2 mx-1 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            {/* order satus */}
            <div className="sm:col-span-3">
                <label
                    htmlFor="status"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.status")}
                </label>
                <div className="mt-1">
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
            </div>
            {/* order deposit fee */}
            <div className="sm:col-span-3">
                <label
                    htmlFor="deposit"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.deposit")}
                </label>
                <div className="mt-1">
                    <input
                        {...register("deposit", {
                            valueAsNumber: true,
                        })}
                        type="number"
                        step="0.01"
                        min={0}
                        id="deposit"
                        name="deposit"
                        className="outline-none pl-2 h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            {/* order total Gst */}
            <div className="sm:col-span-3">
                <label
                    htmlFor="gst"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.totalGst")}
                </label>
                <div className="mt-1">
                    <input
                        {...register("gst", { valueAsNumber: true })}
                        type="number"
                        step="0.01"
                        min={0}
                        id="gst"
                        name="gst"
                        value={calTotalGst}
                        className="outline-none pl-2 h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            {/* order total fee */}
            <div className="sm:col-span-3">
                <label
                    htmlFor="total"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.total")}
                </label>
                <div className="mt-1">
                    <input
                        {...register("total", {
                            valueAsNumber: true,
                        })}
                        type="number"
                        step="0.01"
                        min={0}
                        id="total"
                        value={calTotal}
                        className="outline-none pl-2 h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
        </Card>
    );
};

export default DetailsContent;
