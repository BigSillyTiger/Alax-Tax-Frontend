import type { FC } from "react";
import { TstaffForm } from "@/configs/schema/staffSchema";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { at2ndModalOpen, atModalOpen } from "@/configs/atoms";
import { useAtom } from "jotai";
import { mOpenOps } from "@/configs/utils/modal";
import PWSection from "./PWSection";
import { Nbtn } from "@/components/btns";
import RoleSelection from "./RoleSelection";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    const [modalOpen] = useAtom(atModalOpen);
    const [, setSecModalOpen] = useAtom(at2ndModalOpen);

    const handleClickPWReset = () => {
        setSecModalOpen("ResetPW");
        onClose();
    };

    return (
        <div className="sm:col-span-3 col-span-1 flex flex-col justify-between">
            {modalOpen === mOpenOps.add && (
                <PWSection register={register} watch={watch} errors={errors} />
            )}
            {modalOpen === mOpenOps.edit && (
                <Nbtn
                    onClick={handleClickPWReset}
                    className="w-full mt-4 grow-0 py-4 text-xl"
                >
                    {t("btn.resetPW")}
                </Nbtn>
            )}

            <RoleSelection
                register={register}
                watch={watch}
                control={control}
            />
        </div>
    );
};

export default RightColumn;
