import { FormEvent, useEffect, useMemo } from "react";
import { MTemplate } from "@/components/modal";
import { atAllStaff, atModalOpen, atOrder } from "@/configs/atoms";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { mOpenOps } from "@/configs/utils/modal";
import { useAtom } from "jotai";
import { SubmitBtn } from "@/components/form";
import { useTranslation } from "react-i18next";
import ClientInfoFs from "../../fieldset/ClientInfoFs";
import OrderInfoFs from "../../fieldset/OrderInfoFs";
import AssignedStaff from "./AssignedStaff";
import SelectStaff from "./SelectStaff";
import DateSchedule from "./DateSchedule";
import { useJobAssignStore, useRouterStore } from "@/configs/zustore";
import { genAction } from "@/lib/literals";

const MJobAssign = () => {
    const navigation = useNavigation();
    const submit = useSubmit();
    const { t } = useTranslation();
    // jotai atoms
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [clientOrder] = useAtom(atOrder);
    const [atomAllStaff] = useAtom(atAllStaff);
    // zustand states and actions
    const currentWLUnion = useJobAssignStore((state) => state.currentWLUnion);
    const setWorkLogs = useJobAssignStore((state) => state.setWorkLogs);
    const setAllStaff = useJobAssignStore((state) => state.setAllStaff);
    const setDate = useJobAssignStore((state) => state.setDate);
    const currentRouter = useRouterStore((state) => state.currentRouter);

    const newAllStaff = useMemo(() => {
        return atomAllStaff.map((staff) => {
            return { ...staff, ["selected"]: false };
        });
    }, [atomAllStaff]);

    /* update client order */
    // adding modalOpen to the dependency array
    // for reset the workLogs when modalOpen changes
    // especially when it's closed by cancling
    useEffect(() => {
        setWorkLogs(clientOrder.wlUnion);
    }, [clientOrder.wlUnion, setWorkLogs, modalOpen]);

    /* update all staff with unselected status as default*/
    useEffect(() => {
        setAllStaff(newAllStaff);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newAllStaff]);

    const onClose = () => {
        setWorkLogs(clientOrder.wlUnion);
        setDate(new Date());
        setModalOpen(mOpenOps.default);
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        submit(
            { values: JSON.stringify(currentWLUnion), req: "jobAssign" },
            {
                method: "POST",
                action: genAction(currentRouter),
            }
        );
    };

    const mainContent = (
        <Form onSubmit={onSubmit} className="grid grid-cols-1 gap-y-3 gap-x-4">
            <div
                className={`grid grid-cols-1 lg:grid-cols-8 gap-y-3 gap-x-4 overflow-y-auto h-[77dvh] lg:h-auto`}
            >
                {/* left area */}
                <div className="col-span-1 lg:col-span-4 grid grid-cols-1">
                    {/* client fieldset */}
                    <ClientInfoFs
                        client={clientOrder.client_info}
                        title={t("label.clientInfo")}
                    />

                    {/* address fieldset */}
                    <OrderInfoFs info={clientOrder} />

                    {/* date picker area */}
                    <DateSchedule />
                </div>
                {/* right area */}
                <div className="col-span-1 lg:col-span-4 grid grid-cols-1">
                    {/* assigned staff area */}
                    <AssignedStaff />
                    {/* select staff area */}
                    <SelectStaff />
                    {/* submit btns */}
                    <div className="col-span-full row-span-2">
                        {/* btns */}
                        <SubmitBtn
                            onClick={() => {}}
                            onClose={onClose}
                            navState={navigation.state}
                        />
                    </div>
                </div>
            </div>
        </Form>
    );

    return (
        <MTemplate
            open={!!(modalOpen === mOpenOps.assign)}
            onClose={onClose}
            title={t("modal.title.jobAssign")}
            mode="full"
            mQuit={true}
            className={"overflow-y-auto"}
        >
            {mainContent}
        </MTemplate>
    );
};

export default MJobAssign;
