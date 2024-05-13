import type { FC } from "react";
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
    const navigation = useNavigation();

    return (
        <div className="col-span-1 lg:col-span-5 grid grid-cols-1">
            <DescContent
                register={register}
                watch={watch}
                setValue={setValue}
                fields={fields}
                remove={remove}
                swap={swap}
                sFieldset="col-span-full"
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
        </div>
    );
};

export default RightColumn;
