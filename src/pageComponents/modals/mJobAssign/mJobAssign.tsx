import { FormEvent, useEffect, useState } from "react";
import { MTemplate } from "@/components/modal";
import {
    atAllStaff,
    atAssignedWorks,
    atModalOpen,
    atOrder,
    atWorkLogs,
} from "@/configs/atoms";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mOpenOps } from "@/configs/utils";
import { useAtom } from "jotai";
import { SubmitBtn } from "@/components/form";
import { useTranslation } from "react-i18next";
import ClientInfoFs from "../../fieldset/ClientInfoFs";
import OrderInfoFs from "../../fieldset/OrderInfoFs";
import { Tstaff } from "@/configs/schema/staffSchema";
import { TformWorkLogs, formWorkLogs } from "@/configs/schema/workSchema";
import AssignedStaff from "./AssignedStaff";
import SelectStaff from "./SelectAtaff";
import { atSelectedDate } from "@/configs/atoms/atScheduleDate";
import DateSchedule from "./DateSchedule";
import useWorkLogs from "./hooks/useWorkLogs";

const MJobAssign = () => {
    const navigation = useNavigation();
    const submit = useSubmit();
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [clientOrder] = useAtom(atOrder);
    const [allStaff] = useAtom(atAllStaff);
    const [selectedDate] = useAtom(atSelectedDate);
    const [selectedStaff, setSelectedStaff] = useState<Tstaff>();
    const [assignedWork, setAssignedWork] = useAtom(atAssignedWorks);
    const { workLogs, setWorkLogs } = useWorkLogs(clientOrder.work_logs);
    console.log("-> test clientOrder: ", clientOrder);
    console.log("-> test preset work_logs: ", workLogs);

    const {
        control,
        formState: { errors },
        getValues,
        setValue,
        trigger,
        watch,
        reset,
    } = useForm<TformWorkLogs>({
        resolver: zodResolver(formWorkLogs),
        defaultValues: {
            work_logs: clientOrder.work_logs,
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: "work_logs",
        control,
    });

    const setDefaultStaff = (value: string) => {
        const staff = allStaff?.find(
            (item: Tstaff) => item.first_name === value
        );
        if (staff) {
            setSelectedStaff({
                wlid: "",
                fk_oid: clientOrder.oid,
                fk_uid: staff.uid,
                first_name: staff.first_name,
                last_name: staff.last_name,
                phone: staff.phone,
                email: staff.email,
                role: staff.role,
                wl_date: selectedDate?.toISOString() || "",
                s_time: "",
                e_time: "",
                b_time: "",
                wl_status: "ongoing",
                wl_note: "",
            });
        }
    };

    const onClose = () => {
        setModalOpen(mOpenOps.default);
        reset();
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log("===> test all values: ", getValues());
        submit({}, { method: "POST", action: "/test" });
    };

    const handleAppendWork = () => {
        append();
    };

    const mainContent = (
        <Form onSubmit={onSubmit} className="grid grid-cols-1 gap-y-3 gap-x-4">
            <section className="grid grid-cols-1 lg:grid-cols-8 gap-y-3 gap-x-4 overflow-y-auto h-[74dvh] sm:h-[77dvh] lg:h-auto">
                {/* left area */}
                <section className="col-span-1 lg:col-span-4 grid grid-cols-1">
                    {/* client fieldset */}
                    <ClientInfoFs
                        client={clientOrder.client_info}
                        title={t("label.clientInfo")}
                    />

                    {/* address fieldset */}
                    <OrderInfoFs info={clientOrder} />

                    {/* date picker area */}
                    <DateSchedule
                        fields={fields}
                        appendWorkLog={handleAppendWork}
                        remove={remove}
                    />
                </section>
                {/* right area */}
                <section className="col-span-1 lg:col-span-4 grid grid-cols-1">
                    {/* assigned staff area */}
                    <AssignedStaff fields={fields} remove={remove} />
                    {/* select staff area */}
                    <SelectStaff />
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
