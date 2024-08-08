import { XBtn } from "@/components/btns";
import Card from "@/components/Card";
import { TorderForm, TorderService } from "@/configs/schema/orderSchema";
import { linearLargeBG } from "@/configs/utils/color";
import type { FC } from "react";
import {
    FieldArrayWithId,
    UseFieldArrayRemove,
    UseFieldArraySwap,
    UseFormReturn,
} from "react-hook-form";
import AdjustArrows from "./AdjustArrows";
import Title from "./Title";
import Fee from "./Fee";
import Note from "./Note";
import { useTranslation } from "react-i18next";
import ServiceTypes from "./ServiceTypes";

type Tprops = {
    fields: FieldArrayWithId<TorderService>[];
    remove: UseFieldArrayRemove;
    swap: UseFieldArraySwap;
    register: UseFormReturn<TorderForm>["register"];
    setValue: UseFormReturn<TorderForm>["setValue"];
    watch: UseFormReturn<TorderForm>["watch"];
};

const ServiceItem: FC<Tprops> = ({
    fields,
    remove,
    swap,
    register,
    watch,
    setValue,
}) => {
    const { t } = useTranslation();

    const content = fields.length ? (
        fields.map((field, index) => {
            return (
                <div key={field.id} className="w-full flex flex-row gap-x-2">
                    {/* x btn */}
                    <div className="flex justify-center items-center">
                        <XBtn
                            className="py-2"
                            index={index + 1}
                            onClick={() => remove(index)}
                        />
                    </div>

                    {/* content */}
                    <Card
                        className={`flex flex-row mt-3 gap-x-6 gap-y-4 ${linearLargeBG}`}
                    >
                        {/* main content */}
                        <div className="grow flex flex-col gap-x-2 gap-y-2">
                            <Title index={index} register={register} />
                            <ServiceTypes index={index} register={register} />
                            <Fee
                                index={index}
                                register={register}
                                watch={watch}
                                setValue={setValue}
                            />
                            <Note
                                index={index}
                                register={register}
                                setValue={setValue}
                            />
                        </div>

                        {/* adjust arrows */}
                        {fields.length > 1 && (
                            <AdjustArrows
                                index={index}
                                length={fields.length}
                                swap={swap}
                            />
                        )}
                    </Card>
                </div>
            );
        })
    ) : (
        <span className="text-bold text-indigo-300">
            {t("tips.noServices")}
        </span>
    );

    return <>{content}</>;
};

export default ServiceItem;
