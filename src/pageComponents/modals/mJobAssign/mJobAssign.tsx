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
    const setAllStaff = useJobAssignStore((state) => state.setAllStaff);
    const setDate = useJobAssignStore((state) => state.setDate);

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

    const onClose = () => {
        setModalOpen(mOpenOps.default);
        setDate(undefined);
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
                    <DateSchedule />
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
