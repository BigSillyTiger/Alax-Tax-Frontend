import { memo, useEffect } from "react";
import type { FC, FormEvent } from "react";
import { Trans, useTranslation } from "react-i18next";
import { MTemplate } from "@/components/modal";
import { useForm } from "react-hook-form";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { useAtom } from "jotai";
import { SubmitBtn } from "@/components/form";
import { atStaff, at2ndModalOpen } from "@/configs/atoms";
import Fieldset from "@/components/Fieldset";

// this component is about building a modal with transition to delete a staff
const MStaffResetPW: FC = memo(() => {
    const navigation = useNavigation();
    const submit = useSubmit();
    const { t } = useTranslation();

    const [staff] = useAtom(atStaff);
    const [secModalOpen, setSecModalOpen] = useAtom(at2ndModalOpen);

    const {
        formState: { errors },
        getValues,
        register,
        trigger,
        watch,
        reset,
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        defaultValues: { password: "", pwConfirm: "" },
    });

    useEffect(() => {
        if (secModalOpen === "ResetPW") {
            reset({ password: "", pwConfirm: "" });
        }
    }, [secModalOpen, reset]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const isValid = await trigger();
        console.log("-> reset pw all values: ", getValues());
        if (isValid) {
            const values = getValues();
            const method = "PUT";
            submit(
                { ...values, uid: staff.uid, req: "resetPW" },
                { method, action: "/staff" }
            );
        }
    };

    const onClose = () => {
        console.log("-----> reset modal close, reset pw");
        reset({ password: "", pwConfirm: "" });
        setSecModalOpen("");
    };

    const PWsection = () => (
        <Fieldset sFieldset="flex-col justify-evenly">
            <div className="mx-3">
                <label htmlFor="inputPW" className="text-sm pl-2">
                    {t("label.pwInput")}
                </label>
                <input
                    {...register("password")}
                    id="inputPW"
                    type="password"
                    autoComplete="new-password"
                    required
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
                        validate: (value) =>
                            watch("password") === value ||
                            t("modal.tips.noMatch"),
                    })}
                    id="pwConfirm"
                    type="password"
                    autoComplete="new-password"
                    required
                    className={`outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.pwConfirm && "ring-2 ring-red-600 focus:ring-red-400"}`}
                />
            </div>
        </Fieldset>
    );

    const mainContent = (
        <div className="mt-2">
            <p className="text-gray-700 text-lg">{t("modal.tips.resetPW")}</p>
            <Form onSubmit={onSubmit} className="mt-4">
                <PWsection />
                <SubmitBtn
                    onClick={() => trigger()}
                    onClose={onClose}
                    navState={navigation.state}
                />
            </Form>
        </div>
    );

    return (
        <MTemplate
            open={!!(secModalOpen === "ResetPW")}
            onClose={onClose}
            title={t("modal.title.resetPW")}
            isMajor={true}
            mode={"md"}
            mQuit={true}
        >
            {mainContent}
        </MTemplate>
    );
});

export default MStaffResetPW;
