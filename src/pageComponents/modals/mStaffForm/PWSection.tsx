import type { FC } from "react";
import Fieldset from "@/components/Fieldset";
import { useTranslation, Trans } from "react-i18next";
import { atModalOpen } from "@/configs/atoms";
import { useAtom } from "jotai";
import { mOpenOps } from "@/configs/utils/modal";
import { UseFormReturn, FieldErrors } from "react-hook-form";
import { TstaffForm } from "@/configs/schema/staffSchema";

type Tprops = {
    register: UseFormReturn<TstaffForm>["register"];
    watch: UseFormReturn<TstaffForm>["watch"];
    errors: FieldErrors<TstaffForm>;
};

const PWSection: FC<Tprops> = ({ register, errors, watch }) => {
    const { t } = useTranslation();
    const [modalOpen] = useAtom(atModalOpen);

    return (
        <Fieldset
            title={t("label.password")}
            sFieldset="flex justify-evenly flex-col grow"
        >
            <div className="mx-3">
                <label htmlFor="inputPW" className="text-sm pl-2">
                    {t("label.pwInput")}
                </label>
                <input
                    {...register("password", {
                        required: modalOpen === mOpenOps.add,
                    })}
                    id="inputPW"
                    type="password"
                    autoComplete="new-password"
                    required={modalOpen === mOpenOps.add}
                    className={`outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.pwConfirm && "ring-2 ring-red-600 focus:ring-red-400"}`}
                />
            </div>
            <div className="mx-3 my-1 ">
                <label htmlFor="pwConfirm" className="text-sm pl-2">
                    {errors.pwConfirm ? (
                        <Trans
                            defaults={t("modal.tips.noMatch")}
                            components={{
                                b: <strong className="text-red-400" />,
                            }}
                        />
                    ) : (
                        t("label.pwConfirm")
                    )}
                </label>
                <input
                    {...register("pwConfirm", {
                        validate: (value: string) =>
                            watch("password") === value ||
                            t("modal.tips.noMatch"),
                        required: modalOpen === mOpenOps.add,
                    })}
                    id="pwConfirm"
                    type="password"
                    autoComplete="new-password"
                    required={modalOpen === mOpenOps.add}
                    className={`outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.pwConfirm && "ring-2 ring-red-600 focus:ring-red-400"}`}
                />
            </div>
        </Fieldset>
    );
};

export default PWSection;
