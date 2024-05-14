import type { FC } from "react";
import { TstaffForm } from "@/configs/schema/staffSchema";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { atModalOpen } from "@/configs/atoms";
import { useAtom } from "jotai";
import { mOpenOps } from "@/configs/utils/modal";
import PWSection from "./PWSection";
import RoleSelection from "./RoleSelection";
import PWResetBtn from "./PWResetBtn";
import LoginAccessContent from "./LoginAccessContent";

type Tprops = {
    register: UseFormReturn<TstaffForm>["register"];
    watch: UseFormReturn<TstaffForm>["watch"];
    control: UseFormReturn<TstaffForm>["control"];
    errors: FieldErrors<TstaffForm>;
    onClose: () => void;
};

const RightColumn: FC<Tprops> = ({
    register,
    watch,
    errors,
    control,
    onClose,
}) => {
    const [modalOpen] = useAtom(atModalOpen);

    return (
        <div className="sm:col-span-3 col-span-1 flex flex-col justify-between">
            {modalOpen === mOpenOps.add && (
                <PWSection register={register} watch={watch} errors={errors} />
            )}
            {modalOpen === mOpenOps.edit && <PWResetBtn onClose={onClose} />}

            <LoginAccessContent control={control} />

            <RoleSelection
                register={register}
                watch={watch}
                control={control}
                sFieldset="grow"
            />
        </div>
    );
};

export default RightColumn;
