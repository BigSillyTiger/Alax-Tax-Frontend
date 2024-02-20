import { MTemplate } from "@/components/modal";
import { atModalOpen, atOrder } from "@/configs/atoms";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mOpenOps } from "@/configs/utils";
import { useAtom } from "jotai";
import { SubmitBtn } from "@/components/form";
import { useTranslation } from "react-i18next";
import { useRouterStore } from "@/configs/zustore";
import Fieldset from "@/components/form/fieldset";
import { ClientInfoCard } from "../cards";
import { FormEvent } from "react";
import {
    TworkAssignment,
    workAssignmentSchema,
} from "@/configs/schema/workSchema";
import Card from "@/components/card";
import ClientInfoFs from "../fieldset/clientInfoFs";

const MJobAssign = () => {
    const navigation = useNavigation();
    const submit = useSubmit();
    const { t } = useTranslation();
    const [modalOpen] = useAtom(atModalOpen);
    const [clientOrder] = useAtom(atOrder);
    const currentRouter = useRouterStore((state) => state.currentRouter);

    const {
        control,
        formState: { errors },
        getValues,
        register,
        reset,
        setValue,
        trigger,
        watch,
    } = useForm<TworkAssignment>({
        resolver: zodResolver(workAssignmentSchema),
        defaultValues: clientOrder,
    });

    const { fields, append, remove } = useFieldArray({
        name: "work_logs",
        control,
    });

    const onClose = () => {};

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
    };

    const staffAssignContent = (
        <Card className="my-2 mx-1 lg:h-[65vh] overflow-y-auto">
            {fields.length ? (
                <></>
            ) : (
                <span className="text-bold text-indigo-300">
                    {t("tips.noAssignedStaff")}
                </span>
            )}
        </Card>
    );

    const mainContent = (
        <Form onSubmit={onSubmit} className="grid grid-cols-1 gap-y-3 gap-x-4">
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-y-3 gap-x-4 overflow-y-auto h-[74dvh] sm:h-[77dvh] lg:h-auto">
                {/* order info area */}
                <section className="col-span-1 lg:col-span-3 grid grid-cols-1">
                    {/* client fieldset */}
                    <ClientInfoFs
                        client={clientOrder.client_info}
                        title={t("label.clientInfo")}
                        sFieldset={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 my-2 mx-1 text-sm`}
                        sLegend="text-indigo-500 text-bold"
                    />

                    {/* address fieldset */}
                    <Fieldset
                        title={t("label.workAddr")}
                        sFieldset="col-span-full"
                    >
                        <p>
                            <b className="text-indigo-600">
                                {t("label.address")}:&nbsp;
                            </b>
                            {clientOrder.address},&nbsp;
                            {clientOrder.suburb}
                            ,&nbsp;
                            {clientOrder.city},&nbsp;
                            {clientOrder.state},&nbsp;
                            {clientOrder.country},&nbsp;
                            {clientOrder.postcode}
                        </p>
                    </Fieldset>
                </section>
                {/* staff assign area */}
                <Fieldset
                    title={t("label.assignStaff")}
                    sFieldset="col-span-full lg:col-span-5"
                    sLegend="text-indigo-500 text-bold"
                >
                    {staffAssignContent}
                </Fieldset>
            </div>
            <section className="col-span-full row-span-2">
                {/* btns */}
                <SubmitBtn
                    onClick={() => trigger()}
                    onClose={onClose}
                    navState={navigation.state}
                />
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
