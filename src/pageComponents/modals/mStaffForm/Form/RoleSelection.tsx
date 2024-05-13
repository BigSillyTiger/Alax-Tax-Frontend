import Fieldset from "@/components/Fieldset";
import type { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import AccessTable from "../AccessTable";
import { TstaffForm } from "@/configs/schema/staffSchema";
import { Controller, UseFormReturn } from "react-hook-form";
import { RadioGroup } from "@headlessui/react";
import { roleOptions } from "@/configs/utils/staff";
import { capFirstLetter } from "@/lib/literals";

type Tprops = {
    register: UseFormReturn<TstaffForm>["register"];
    watch: UseFormReturn<TstaffForm>["watch"];
    control: UseFormReturn<TstaffForm>["control"];
    sFieldset?: string;
};

const RoleSelection: FC<Tprops> = ({ register, watch, control, sFieldset }) => {
    const { t } = useTranslation();

    return (
        <Fieldset
            sFieldset={`flex flex-col justify-around ${sFieldset}`}
            title={
                <p className="mb-1">
                    <Trans
                        defaults={t("modal.title.roleAdmin")}
                        components={{
                            s: <strong className="text-sm font-light" />,
                        }}
                    />
                </p>
            }
        >
            <Controller
                control={control}
                name="role"
                render={({ field: { onChange, value } }) => (
                    <RadioGroup value={value} onChange={onChange}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 sm:gap-x-2 mx-2">
                            {Object.keys(roleOptions).map((item) => (
                                <RadioGroup.Option
                                    key={item}
                                    value={item}
                                    className={({ checked, active }) =>
                                        `${active ? "border-indigo-600 ring-2 ring-indigo-600" : "border-gray-300"} ${checked ? "border-indigo-600 border bg-indigo-500 text-slate-100" : "border-gray-200 border text-indigo-500"} relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none`
                                    }
                                >
                                    <RadioGroup.Label
                                        as="span"
                                        className={`flex flex-1 justify-center font-bold w-full`}
                                    >
                                        {capFirstLetter(item)}
                                    </RadioGroup.Label>
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup>
                )}
            />

            <AccessTable register={register} watch={watch} />
        </Fieldset>
    );
};

export default RoleSelection;
