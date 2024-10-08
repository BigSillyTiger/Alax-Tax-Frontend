import type { FC } from "react";
import ServiceContent from "./ServiceContent";
import {
    FieldArrayWithId,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    UseFieldArraySwap,
    UseFormReturn,
} from "react-hook-form";
import { TorderForm } from "@/configs/schema/orderSchema";
import AppendNewService from "./AppendNewService";
import { SubmitBtn } from "@/components/form";
import { useNavigation } from "react-router-dom";
import { TorderService } from "@/configs/schema/orderServiceSchema";

type Tprops = {
    register: UseFormReturn<TorderForm>["register"];
    setValue: UseFormReturn<TorderForm>["setValue"];
    watch: UseFormReturn<TorderForm>["watch"];
    fields: FieldArrayWithId<TorderService>[];
    trigger: UseFormReturn<TorderForm>["trigger"];
    append: UseFieldArrayAppend<TorderForm, "order_services">;
    remove: UseFieldArrayRemove;
    swap: UseFieldArraySwap;
    control: UseFormReturn<TorderForm>["control"];
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
    control,
    onClose,
}) => {
    const navigation = useNavigation();

    return (
        <div className="col-span-1 lg:col-span-5 flex flex-col">
            <ServiceContent
                register={register}
                watch={watch}
                setValue={setValue}
                fields={fields}
                remove={remove}
                swap={swap}
                control={control}
                sFieldset="h-[74dvh] col-span-full"
            />
            {/* append btn - adding a new service */}
            <div className="h-[17dvh]">
                <AppendNewService append={append} />
                <div className="col-span-full row-span-2">
                    {/* btns */}
                    <SubmitBtn
                        onClick={() => trigger()}
                        onClose={onClose}
                        navState={navigation.state}
                    />
                </div>
            </div>
        </div>
    );
};

export default RightColumn;
