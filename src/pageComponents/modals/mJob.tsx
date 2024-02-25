import { FormEvent, useState } from "react";
import { MTemplate } from "@/components/modal";
import { atModalOpen, atOrder } from "@/configs/atoms";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { useForm, useFieldArray, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mOpenOps } from "@/configs/utils";
import { useAtom } from "jotai";
import { SubmitBtn } from "@/components/form";
import { useTranslation } from "react-i18next";
import { useRouterStore } from "@/configs/zustore";
import Fieldset from "@/components/form/fieldset";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
    TorderWithWorklogs,
    orderWithWorklogs,
} from "@/configs/schema/workSchema";
import "react-day-picker/dist/style.css";
import ClientInfoFs from "../fieldset/ClientInfoFs";
import OrderInfoFs from "../fieldset/OrderInfoFs";
import Card from "@/components/card";
import DatePicker from "@/components/DatePicker";

const MJobAssign = () => {
    const navigation = useNavigation();
    const submit = useSubmit();
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [clientOrder] = useAtom(atOrder);
    const currentRouter = useRouterStore((state) => state.currentRouter);
    const [selectedDay, setSelectedDay] = useState<Date>();
    const newClientOrder = {
        ...clientOrder,
        workUnion: { wu_date: new Date(2024, 2, 1) },
    };

    const {
        control,
        formState: { errors },
        getValues,
        register,
        reset,
        setValue,
        trigger,
        watch,
    } = useForm<TorderWithWorklogs>({
        resolver: zodResolver(orderWithWorklogs),
        defaultValues: clientOrder,
    });

    const { fields, append, remove } = useFieldArray({
        name: "work_logs",
        control,
    });

    const onClose = () => {
        setModalOpen(mOpenOps.default);
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log("===> test all values: ", getValues());
    };

    const datPicker = (
        <Controller
            control={control}
            name="workUnion.wu_date"
            render={({ field: { onChange, value } }) => (
                <>
                    <Card className="col-span-full flex justify-center">
                        <DatePicker value={value} onChange={onChange} />
                    </Card>
                    <div>
                        <div className="col-span-full">
                            {value?.toDateString()}
                        </div>
                    </div>
                </>
            )}
        />
    );

    const staffAssignContent = fields.length ? (
        fields.map((field, index) => {
            return (
                <section
                    key={field.id}
                    className="col-span-6 row-span-2 grid grid-cols-10 gap-x-2 gap-y-2"
                >
                    <div className="col-span-1 m-auto">
                        {/* x btn */}
                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-red-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                            onClick={() => remove(index)}
                        >
                            <span className="sr-only">{t("btn.close")}</span>
                            <XMarkIcon className="h-4 w-3" aria-hidden="true" />
                        </button>
                    </div>
                    {/* content */}
                    <Card className="col-span-9 mt-3 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-8 bg-indigo-50 py-2">
                        {/* staff uid */}
                        <div className="col-span-4">
                            <label
                                htmlFor="uid"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("label.service")}
                            </label>
                            <input
                                {...register(
                                    `workUnion.work_logs.${index}.fk_uid`,
                                    {
                                        valueAsNumber: true,
                                        min: 0,
                                    }
                                )}
                                readOnly
                                id="uid"
                                name="uid"
                                type="string"
                                className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                            />
                        </div>
                        <div className="col-span-4">
                            <label
                                htmlFor="paid_date"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("label.service")}
                            </label>
                            <input
                                {...register(`payments.${index}.paid_date`)}
                                id="paid_date"
                                name="paid_date"
                                type="date"
                                min={dateMin}
                                max={dateMax}
                                className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                            />
                        </div>
                    </Card>
                </section>
            );
        })
    ) : (
        <span className="text-bold text-indigo-300">
            {t("tips.noAssignedStaff")}
        </span>
    );

    const mainContent = (
        <Form onSubmit={onSubmit} className="grid grid-cols-1 gap-y-3 gap-x-4">
            <section className="grid grid-cols-1 lg:grid-cols-8 gap-y-3 gap-x-4 overflow-y-auto h-[74dvh] sm:h-[77dvh] lg:h-auto">
                {/* left area */}
                <section className="col-span-1 lg:col-span-3 grid grid-cols-1">
                    {/* client fieldset */}
                    <ClientInfoFs
                        client={clientOrder.client_info}
                        title={t("label.clientInfo")}
                    />

                    {/* address fieldset */}
                    <OrderInfoFs info={clientOrder} />

                    {/* date picker area */}
                    <Fieldset
                        title={t("label.date")}
                        sFieldset={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 my-2 mx-1 text-sm p-4`}
                        sLegend={`text-indigo-500 text-bold text-lg`}
                    >
                        {datPicker}
                    </Fieldset>
                </section>
                {/* right area */}
                <section className="col-span-1 lg:col-span-5 grid grid-cols-1">
                    {/* staff assign area */}
                    <Fieldset
                        title={t("label.assignStaff")}
                        sFieldset="col-span-full lg:col-span-5"
                        sLegend="text-indigo-500 text-bold"
                    >
                        {staffAssignContent}
                    </Fieldset>
                    {/* staff add btn */}

                    {/* submit btns */}
                    <section className="col-span-full row-span-2">
                        {/* btns */}
                        <SubmitBtn
                            onClick={() => trigger()}
                            onClose={onClose}
                            navState={navigation.state}
                        />
                    </section>
                </section>
            </section>
        </Form>
    );

    return (
        <MTemplate
            open={
                !!(
                    modalOpen === mOpenOps.workAdd ||
                    modalOpen === mOpenOps.workEdit
                )
            }
            onClose={onClose}
            title=""
            mode="full"
            mQuit={true}
        >
            {mainContent}
        </MTemplate>
    );
};

export default MJobAssign;
