import { FormEvent, useEffect } from "react";
import { MTemplate } from "@/components/modal";
import { atModalOpen, atWorkLogTableRow } from "@/configs/atoms";
import { useNavigation, Form, useSubmit } from "react-router-dom";
import { mOpenOps } from "@/configs/utils";
import { useAtom } from "jotai";
import { SubmitBtn } from "@/components/form";
import { useTranslation } from "react-i18next";
import StaffCard from "@/pageComponents/cards/StaffCard";
import WorkHoursCard from "@/pageComponents/cards/WorkHoursCard";
import WorkInfoCard from "@/pageComponents/cards/WorkInfoCard";
import { genAction, isWorkHoursValid } from "@/utils/utils";
import { useRouterStore } from "@/configs/zustore";
import { useWorkHoursStore } from "@/configs/zustore/workHoursStore";
import { toastError } from "@/utils/toaster";

const MJobEdit = () => {
    const navigation = useNavigation();
    const submit = useSubmit();
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [worklog] = useAtom(atWorkLogTableRow);
    const currentRouter = useRouterStore((state) => state.currentRouter);
    const s_time = useWorkHoursStore((state) => state.s_time);
    const e_time = useWorkHoursStore((state) => state.e_time);
    const b_time = useWorkHoursStore((state) => state.b_time);
    const setSTime = useWorkHoursStore((state) => state.setSTime);
    const setETime = useWorkHoursStore((state) => state.setETime);
    const setBTime = useWorkHoursStore((state) => state.setBTime);

    useEffect(() => {
        setSTime(worklog.s_time ? worklog.s_time : "00:00");
        setETime(worklog.e_time ? worklog.e_time : "00:00");
        setBTime(worklog.b_time ? worklog.b_time : "00:00");
    }, [modalOpen, worklog, setSTime, setETime, setBTime]);

    const onClose = () => {
        setModalOpen(mOpenOps.default);
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isWorkHoursValid(s_time, e_time, b_time)) {
            toastError(t("toastF.invalidWorkHours"));
            return;
        }
        submit(
            {
                values: JSON.stringify({
                    wlid: worklog.wlid,
                    s_time,
                    e_time,
                    b_time,
                }),
                req: "jobEdit",
            },
            { method: "POST", action: genAction(currentRouter) }
        );
    };

    const mainContent = (
        <Form onSubmit={onSubmit} className="grid grid-cols-1">
            <StaffCard staff={worklog} className="col-span-full" />
            <WorkInfoCard work={worklog} className="col-span-full" />
            <WorkHoursCard className="col-span-full" />
            <section className="col-span-full">
                {/* btns */}
                <SubmitBtn
                    onClick={() => {}}
                    onClose={onClose}
                    navState={navigation.state}
                    className=""
                />
            </section>
        </Form>
    );

    return (
        <MTemplate
            open={!!(modalOpen === mOpenOps.edit)}
            onClose={onClose}
            title={t("modal.title.jobEdit")}
            mQuit={true}
        >
            {mainContent}
        </MTemplate>
    );
};

export default MJobEdit;
