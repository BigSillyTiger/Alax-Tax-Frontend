import { FormEvent, useEffect } from "react";
import { MTemplate } from "@/components/modal";
import { atAllStaff, atModalOpen, atOrder } from "@/configs/atoms";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { mOpenOps } from "@/configs/utils";
import { useAtom } from "jotai";
import { SubmitBtn } from "@/components/form";
import { useTranslation } from "react-i18next";
import ClientInfoFs from "../../fieldset/ClientInfoFs";
import OrderInfoFs from "../../fieldset/OrderInfoFs";
import AssignedStaff from "./AssignedStaff";
import SelectStaff from "./SelectStaff";
import DateSchedule from "./DateSchedule";
import { useJobAssignStore } from "@/configs/zustore";
import { isSameDay } from "date-fns";

const MJobAssign = () => {
    const navigation = useNavigation();
    const submit = useSubmit();
    const { t } = useTranslation();
    // jotai atoms
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [clientOrder] = useAtom(atOrder);
    const [atomAllStaff] = useAtom(atAllStaff);
    // zustand states and actions
    const setWorkLogs = useJobAssignStore((state) => state.setWorkLogs);
    const selectedDate = useJobAssignStore((state) => state.selectedDate);
    const currentWorkLogs = useJobAssignStore((state) => state.currentWorkLogs);
    const allStaff = useJobAssignStore((state) => state.allStaff);
    const setAllStaff = useJobAssignStore((state) => state.setAllStaff);

    /* update client order */
    useEffect(() => {
        setWorkLogs(clientOrder.work_logs);
    }, [clientOrder.work_logs, setWorkLogs]);

    /* update all staff with unselected status as default*/
    useEffect(() => {
        const newAllStaff = atomAllStaff.map((staff) => {
            return { ...staff, ["selected"]: false };
        });
        setAllStaff(newAllStaff);
    }, [atomAllStaff, setAllStaff]);

    /* update work logs when all staff changed */
    /* useEffect(() => {
        const newWorkLogs = allStaff
            .filter((staff) => staff.selected === true)
            .map((staff) => ({
                fk_oid: clientOrder.oid,
                wl_date: selectedDate ? selectedDate.toISOString() : "",
                assigned_work: [
                    {
                        wlid: "",
                        fk_oid: clientOrder.oid,
                        fk_uid: staff.uid,
                        wl_date: selectedDate ? selectedDate.toISOString() : "",
                        s_time: "",
                        e_time: "",
                        b_time: "",
                        wl_status: "ongoing",
                        wl_note: "",

                        first_name: staff.first_name,
                        last_name: staff.last_name,
                        phone: staff.phone,
                        email: staff.email,
                        role: staff.role,
                    },
                ],
            }));
        setWorkLogs(newWorkLogs);
    }, [allStaff, selectedDate, clientOrder.oid, setWorkLogs]); */

    const onClose = () => {
        setModalOpen(mOpenOps.default);
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        submit({}, { method: "POST", action: "/test" });
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
                    <DateSchedule appendSchedule={() => {}} />
                </section>
                {/* right area */}
                <section className="col-span-1 lg:col-span-4 grid grid-cols-1">
                    {/* assigned staff area */}
                    <AssignedStaff />
                    {/* select staff area */}
                    <SelectStaff />
                    {/* submit btns */}
                    <section className="col-span-full row-span-2">
                        {/* btns */}
                        <SubmitBtn
                            onClick={() => {}}
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
