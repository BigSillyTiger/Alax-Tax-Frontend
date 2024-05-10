import type { FC } from "react";
import { useTranslation } from "react-i18next";
import DescContent from "./DescContent";
import {
    FieldArrayWithId,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    UseFieldArraySwap,
    UseFormReturn,
} from "react-hook-form";
import { TorderForm, TorderService } from "@/configs/schema/orderSchema";
import AppendNewService from "./AppendNewService";
import { SubmitBtn } from "@/components/form";
import { useNavigation } from "react-router-dom";

type Tprops = {
    register: UseFormReturn<TorderForm>["register"];
    setValue: UseFormReturn<TorderForm>["setValue"];
    watch: UseFormReturn<TorderForm>["watch"];
    fields: FieldArrayWithId<TorderService>[];
    trigger: UseFormReturn<TorderForm>["trigger"];
    append: UseFieldArrayAppend<TorderForm, "order_services">;
    remove: UseFieldArrayRemove;
    swap: UseFieldArraySwap;
    onClose: () => void;
};

const RightColumn: FC<Tprops> = ({
    register,
    setValue,
    append,
    watch,
    fields,
    remove,
    trigger,
    swap,
    onClose,
}) => {
    const { t } = useTranslation();
    const navigation = useNavigation();

    return (
        <div className="col-span-1 lg:col-span-5 grid grid-cols-1">
            <fieldset className="col-span-full">
                <legend className="text-indigo-500 text-bold">
                    {t("label.serviceList")}:
                </legend>
                <DescContent
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    fields={fields}
                    remove={remove}
                    swap={swap}
                />
                {/* append btn - adding a new service */}
                <AppendNewService append={append} />
                <div className="col-span-full row-span-2">
                    {/* btns */}
                    <SubmitBtn
                        onClick={() => trigger()}
                        onClose={onClose}
                        navState={navigation.state}
                    />
                </div>
            </fieldset>
        </div>
    );
};

export default RightColumn;
