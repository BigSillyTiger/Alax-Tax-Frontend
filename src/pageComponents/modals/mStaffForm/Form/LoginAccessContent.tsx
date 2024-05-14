import Fieldset from "@/components/Fieldset";
import { Switch } from "@/components/ui/switch";
import { TstaffForm } from "@/configs/schema/staffSchema";
import { FC } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Tprops = {
    control: UseFormReturn<TstaffForm>["control"];
    sFieldset?: string;
};

const LoginAccessContent: FC<Tprops> = ({ control, sFieldset }) => {
    const { t } = useTranslation();
    return (
        <Fieldset
            title={t("modal.title.accessControl")}
            sFieldset={`flex flex-row justify-center items-center gap-x-4 ${sFieldset}`}
        >
            {/* <Switch
                checked={value}
                onChange={onChange}
            /> */}
            <Controller
                control={control}
                name="access"
                render={({ field: { onChange, value } }) => {
                    return (
                        <>
                            <span className="text-lg font-bold text-red-600">
                                Off
                            </span>
                            <Switch
                                checked={value}
                                onCheckedChange={onChange}
                            />
                            <span className="text-lg font-bold text-green-600">
                                On
                            </span>
                        </>
                    );
                }}
            />
        </Fieldset>
    );
};

export default LoginAccessContent;
