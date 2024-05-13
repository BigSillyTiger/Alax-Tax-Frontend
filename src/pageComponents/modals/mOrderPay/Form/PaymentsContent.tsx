import { XBtn } from "@/components/btns";
import Card from "@/components/Card";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { dateMax, dateMin } from "@/configs/utils/date";
import {
    FieldArrayWithId,
    UseFieldArrayRemove,
    UseFormReturn,
} from "react-hook-form";
import { Tpayment } from "@/configs/schema/orderSchema";
import { linearLargeBG } from "@/configs/utils/color";
import Fieldset from "@/components/Fieldset";

type Tprops = {
    fields: FieldArrayWithId<Tpayment>[];
    register: UseFormReturn<Tpayment>["register"];
    remove: UseFieldArrayRemove;
    title: string;
    sFieldset?: string;
    sLegend?: string;
};

const PaymentsContent: FC<Tprops> = ({
    fields,
    register,
    remove,
    title,
    sFieldset,
    sLegend,
}) => {
    const { t } = useTranslation();

    const content = fields?.length ? (
        <Fieldset
            title={title}
            sFieldset={`my-2 mx-1 text-sm lg:h-[45dvh] overflow-y-auto ${sFieldset}`}
            sLegend={`text-indigo-500 text-bold text-lg ${sLegend}`}
        >
            {fields.map((field, index) => {
                return (
                    <div key={field.id} className="flex flex-col gap-y-2">
                        <div className="flex flex-row gap-x-2 items-center ml-1 mr-3">
                            {/* x btn */}

                            <div className="">
                                <XBtn onClick={() => remove(index)} />
                            </div>
                            {/* content */}
                            <Card
                                className={`w-full mt-3 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-8 py-2 ${linearLargeBG}`}
                            >
                                {/* paid amount */}
                                <div className="col-span-4">
                                    <label
                                        htmlFor="paid"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        {t("label.service")}
                                    </label>
                                    <input
                                        {...register(`payments.${index}.paid`, {
                                            valueAsNumber: true,
                                            min: 0,
                                        })}
                                        id="paid"
                                        name="paid"
                                        type="number"
                                        min={0}
                                        step="0.01"
                                        className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                    />
                                </div>
                                <div className="col-span-4">
                                    <label
                                        htmlFor="paid_date"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        {t("label.service")}
                                    </label>
                                    <input
                                        {...register(
                                            `payments.${index}.paid_date`
                                        )}
                                        id="paid_date"
                                        name="paid_date"
                                        type="date"
                                        min={dateMin}
                                        max={dateMax}
                                        className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                    />
                                </div>
                            </Card>
                        </div>
                    </div>
                );
            })}
        </Fieldset>
    ) : (
        t("tips.noPayments")
    );

    return content;
};

export default PaymentsContent;
