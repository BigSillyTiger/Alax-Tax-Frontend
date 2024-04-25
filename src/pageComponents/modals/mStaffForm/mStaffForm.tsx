import { useEffect, memo, useMemo } from "react";
import type { FC, FormEvent } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmit } from "react-router-dom";
import { useAtom } from "jotai";
import { MTemplate } from "@/components/modal";
import {
    initStaff,
    atStaff,
    atModalOpen,
    atInfoConflict,
} from "@/configs/atoms";
import { mOpenOps } from "@/configs/utils/modal";
import { roleOptions } from "@/configs/utils/staff";
import {
    staffFormSchema,
    staffUpdate,
    TstaffForm,
} from "@/configs/schema/staffSchema";
import { RES_STATUS } from "@/configs/types";
import FormContent from "./Form";

const MStaffForm: FC = memo(() => {
    const submit = useSubmit();
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [, setInfoConflict] = useAtom(atInfoConflict);
    const [staff] = useAtom(atStaff);

    const {
        control,
        formState: { errors },
        getValues,
        register,
        reset,
        setValue,
        trigger,
        watch,
    } = useForm<TstaffForm>({
        resolver: zodResolver(
            modalOpen === mOpenOps.add ? staffFormSchema : staffUpdate
        ),
        defaultValues: staff,
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const selectedRole = useMemo(() => {
        return watch("role") as keyof typeof roleOptions;
    }, [watch("role"), watch]);

    const roleData = useMemo(() => roleOptions[selectedRole], [selectedRole]);

    useEffect(() => {
        modalOpen && reset(staff);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [staff, modalOpen]);

    useEffect(() => {
        if (roleData) {
            Object.keys(roleData).forEach((field) => {
                setValue(
                    field as keyof TstaffForm,
                    Number(roleData[field as keyof typeof roleData]) as
                        | 0
                        | 1
                        | 2
                );
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roleData]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        //const isValid = await trigger();
        //console.log("--> staff modal isvalid: ", isValid);
        errors && console.log("-> staff add err: ", errors);
        if (errors) {
            const values = getValues();
            const method = !staff.uid ? "POST" : "PUT";
            const req = !staff.uid ? "addStaff" : "updateStaff";
            submit(
                { ...values, id: staff.uid, req },
                { method, action: "/staff" }
            );
        }
    };

    const onClose = () => {
        setInfoConflict(RES_STATUS.SUCCESS);
        setModalOpen("");
        reset(initStaff);
    };

    const mainContent = (
        <>
            <p className="mt-1 text-sm leading-6 text-gray-600">
                <Trans
                    defaults={t("modal.tips.noDupAddr")}
                    components={{
                        b: <strong className="text-red-400" />,
                    }}
                />
            </p>
            <FormContent
                onSubmit={onSubmit}
                onClose={onClose}
                errors={errors}
                trigger={trigger}
                register={register}
                watch={watch}
                control={control}
            />
        </>
    );

    return (
        <MTemplate
            open={!!(modalOpen === mOpenOps.add || modalOpen === mOpenOps.edit)}
            onClose={onClose}
            title={
                modalOpen === mOpenOps.add
                    ? t("modal.title.addStaff")
                    : t("modal.title.updateStaff")
            }
            mQuit={true}
            mode="xl"
        >
            {mainContent}
        </MTemplate>
    );
});

export default MStaffForm;
