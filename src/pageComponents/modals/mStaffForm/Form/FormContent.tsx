import type { FC, FormEvent } from "react";
import { useNavigation, Form } from "react-router-dom";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import { SubmitBtn } from "@/components/form";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { TstaffForm } from "@/configs/schema/staffSchema";
import { useAdminStore } from "@/configs/zustore";
import { ROLES } from "@/configs/utils/staff";

type Tprops = {
    onSubmit: (e: FormEvent) => void;
    onClose: () => void;
    errors: FieldErrors<TstaffForm>;
    trigger: UseFormReturn<TstaffForm>["trigger"];
    register: UseFormReturn<TstaffForm>["register"];
    watch: UseFormReturn<TstaffForm>["watch"];
    control: UseFormReturn<TstaffForm>["control"];
};

const FormContent: FC<Tprops> = ({
    onSubmit,
    trigger,
    register,
    control,
    onClose,
    errors,
    watch,
}) => {
    const navigation = useNavigation();
    const currentAdmin = useAdminStore((state) => state.currentAdmin);
    const isEmployee = currentAdmin.role === ROLES.employee;

    return (
        <Form onSubmit={onSubmit} className={`mt-4 h-screen sm:h-auto`}>
            <div
                className={`flex gap-x-4 ${isEmployee ? "flex-col" : "flex-col sm:flex-row"}`}
            >
                <LeftColumn register={register} errors={errors} />
                {isEmployee ? null : (
                    <RightColumn
                        register={register}
                        control={control}
                        errors={errors}
                        watch={watch}
                        onClose={onClose}
                    />
                )}
            </div>
            <SubmitBtn
                onClick={() => trigger()}
                onClose={onClose}
                navState={navigation.state}
            />
        </Form>
    );
};

export default FormContent;
