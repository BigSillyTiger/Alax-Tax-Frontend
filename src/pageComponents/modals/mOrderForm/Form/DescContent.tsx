import { XBtn } from "@/components/btns";
import Card from "@/components/Card";
import DataList from "@/components/dataList";
import Label from "@/components/Label";
import { atSUData } from "@/configs/atoms";
import { TorderForm, TorderService } from "@/configs/schema/orderSchema";
import { linearLargeBG } from "@/configs/utils/color";
import { calGst, calNetto } from "@/lib/calculations";
import {
    ChevronDoubleDownIcon,
    ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { useCallback, type FC } from "react";
import {
    FieldArrayWithId,
    UseFieldArrayRemove,
    UseFieldArraySwap,
    UseFormReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

type Tprops = {
    register: UseFormReturn<TorderForm>["register"];
    setValue: UseFormReturn<TorderForm>["setValue"];
    watch: UseFormReturn<TorderForm>["watch"];
    fields: FieldArrayWithId<TorderService>[];
    remove: UseFieldArrayRemove;
    swap: UseFieldArraySwap;
};

const DescContent: FC<Tprops> = ({
    register,
    watch,
    remove,
    fields,
    setValue,
    swap,
}) => {
    const { t } = useTranslation();
    const [uniData] = useAtom(atSUData);

    const serviceTitleList = uniData ? (
        <DataList
            id={"service_title"}
            name={"service"}
            data={uniData.services}
        />
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
            setValue(`order_services.${index}.netto`, total);
        },
        [watch, setValue]
    );

    const unitsList = uniData ? (
        <DataList id={"unit_name"} name={"unit_name"} data={uniData.units} />
    ) : null;

    return (
        <Card className="my-2 mx-1 lg:h-[65dvh] overflow-y-auto">
            {fields.length ? (
                fields.map((field, index) => {
                    return (
                        <div
                            key={field.id}
                            className="col-span-full grid grid-cols-10 gap-x-1"
                        >
                            {/* x btn */}
                            <div className="col-span-1 m-auto">
                                <XBtn onClick={() => remove(index)} />
                            </div>
                            {/* content */}
                            <Card
                                className={`col-span-9 mt-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-8 ${linearLargeBG}`}
                            >
                                <div
                                    className={`${
                                        fields.length === 1
                                            ? "col-span-8"
                                            : "col-span-7"
                                    } grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6`}
                                >
                                    {/* title - 6*/}
                                    <div className="col-span-8">
                                        <Label
                                            htmlFor="title"
                                            className="block text-sm font-normal"
                                        >
                                            {t("label.service")}
                                        </Label>
                                        <input
                                            {...register(
                                                `order_services.${index}.title`
                                            )}
                                            id="title"
                                            type="text"
                                            list="service_title"
                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                        />
                                        {serviceTitleList}
                                    </div>
                                    {/* qty - 1 */}
                                    <div className="col-span-6 sm:col-span-1">
                                        <Label
                                            htmlFor="qty"
                                            className="block text-sm font-normal"
                                        >
                                            {t("label.qty")}
                                        </Label>
                                        <input
                                            {...register(
                                                `order_services.${index}.qty`,
                                                {
                                                    valueAsNumber: true,
                                                    min: 0,
                                                }
                                            )}
                                            id="qty"
                                            min={0}
                                            type="number"
                                            step="0.01"
                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
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
                                    {/* unit - 2 */}
                                    <div className="col-span-6 sm:col-span-2">
                                        <Label
                                            htmlFor="unit"
                                            className="block text-sm font-normal"
                                        >
                                            {t("label.unit")}
                                        </Label>
                                        <input
                                            {...register(
                                                `order_services.${index}.unit`
                                            )}
                                            id="unit"
                                            type="text"
                                            list="unit_name"
                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                        />
                                        {unitsList}
                                    </div>
                                    {/* taxable - 1 */}
                                    <div className="col-span-6 sm:col-span-1">
                                        <Label
                                            htmlFor="taxable"
                                            className="block text-sm font-normal"
                                        >
                                            {t("label.taxable")}
                                        </Label>
                                        <input
                                            {...register(
                                                `order_services.${index}.taxable`
                                            )}
                                            id="taxable"
                                            type="checkbox"
                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 pl-2"
                                            onChange={(e) => {
                                                setValue(
                                                    `order_services.${index}.taxable`,
                                                    e.target.checked
                                                );
                                                calSNettoGst(index);
                                            }}
                                        />
                                    </div>
                                    {/* gst - 2 */}
                                    <div className="col-span-6 sm:col-span-2">
                                        <Label
                                            htmlFor="unit"
                                            className="block text-sm font-normal"
                                        >
                                            {t("label.gst")}
                                        </Label>
                                        <input
                                            {...register(
                                                `order_services.${index}.gst`
                                            )}
                                            id="gst"
                                            type="number"
                                            step="0.01"
                                            min={0}
                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                        />
                                    </div>

                                    {/* unit price - 2 */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <Label
                                            htmlFor="unit_price"
                                            className="block text-sm font-normal"
                                        >
                                            {t("label.uPrice")}
                                        </Label>
                                        <input
                                            {...register(
                                                `order_services.${index}.unit_price`,
                                                {
                                                    valueAsNumber: true,
                                                    min: 0,
                                                }
                                            )}
                                            id="unit_price"
                                            type="number"
                                            step="0.01"
                                            min={0}
                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                            onChange={(e) => {
                                                setValue(
                                                    `order_services.${index}.unit_price`,
                                                    Number(e.target.value)
                                                );
                                                return calSNettoGst(index);
                                            }}
                                        />
                                    </div>
                                    {/* netto - 2 */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <Label
                                            htmlFor="netto"
                                            className="block text-sm font-normal"
                                        >
                                            {t("label.netto")}
                                        </Label>
                                        <input
                                            {...register(
                                                `order_services.${index}.netto`,
                                                {
                                                    valueAsNumber: true,
                                                }
                                            )}
                                            id="netto"
                                            type="number"
                                            step="0.01"
                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                        />
                                    </div>

                                    {/* desc - 6 */}
                                    <div className="col-span-6 sm:col-span-7">
                                        <Label
                                            htmlFor="description"
                                            className="block text-sm font-normal"
                                        >
                                            {t("label.desc")}
                                        </Label>
                                        <textarea
                                            {...register(
                                                `order_services.${index}.description`
                                            )}
                                            id="description"
                                            name="description"
                                            rows={4}
                                            //type="textarea"
                                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                        />
                                    </div>
                                </div>
                                {/* adjust arrows btns */}
                                {fields.length > 1 && (
                                    <div className="col-span-1 flex flex-col justify-around">
                                        {index != 0 && (
                                            <button
                                                type="button"
                                                className="h-10 rounded-md bg-indigo-400 text-slate-200 hover:bg-indigo-600 hover:text-slate-50"
                                                onClick={() => {
                                                    swap(index, index - 1);
                                                }}
                                            >
                                                <ChevronDoubleUpIcon
                                                    className="h-6 w-6 m-auto"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        )}
                                        {index + 1 !== fields.length && (
                                            <button
                                                type="button"
                                                className="h-10 rounded-md bg-indigo-400 text-slate-200 hover:bg-indigo-600 hover:text-slate-50"
                                                onClick={() => {
                                                    swap(index, index + 1);
                                                }}
                                            >
                                                <ChevronDoubleDownIcon
                                                    className="h-6 w-6 m-auto"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </Card>
                        </div>
                    );
                })
            ) : (
                <span className="text-bold text-indigo-300">
                    {t("tips.noServices")}
                </span>
            )}
        </Card>
    );
};

export default DescContent;
