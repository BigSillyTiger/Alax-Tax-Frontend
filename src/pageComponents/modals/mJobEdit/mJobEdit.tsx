import type { FormEvent } from "react";
import { useEffect } from "react";
import { MTemplate } from "@/components/modal";
import { atModalOpen, atWorkLogTableRow } from "@/configs/atoms";
import { useNavigation, Form, useSubmit } from "react-router-dom";
import { mOpenOps } from "@/configs/utils";
import { useAtom } from "jotai";
import { SubmitBtn } from "@/components/form";
import { useTranslation } from "react-i18next";
import StaffCard from "@/pageComponents/cards/StaffCard";
import WorkInfoCard from "@/pageComponents/cards/WorkInfoCard";
import { isWorkHoursValid } from "@/lib/time";
import { genAction } from "@/lib/literals";
import { toastError } from "@/lib/toaster";
import { useRouterStore } from "@/configs/zustore";
import { useWorklogStore } from "@/configs/zustore/worklogStore";
import { SdTabs } from "@/components/tabs";
import { tabsContent } from "./tabsContent";

const MJobEdit = () => {
    const navigation = useNavigation();
    const submit = useSubmit();
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [worklog] = useAtom(atWorkLogTableRow);
    const currentRouter = useRouterStore((state) => state.currentRouter);
    const s_time = useWorklogStore((state) => state.s_time);
    const e_time = useWorklogStore((state) => state.e_time);
    const b_hour = useWorklogStore((state) => state.b_hour);
    const setSTime = useWorklogStore((state) => state.setSTime);
    const setETime = useWorklogStore((state) => state.setETime);
    const setBHour = useWorklogStore((state) => state.setBHour);
    const deduction = useWorklogStore((state) => state.deduction);
    const setDeduction = useWorklogStore((state) => state.setDeduction);

    useEffect(() => {
        setSTime(worklog.s_time ? worklog.s_time : "00:00");
        setETime(worklog.e_time ? worklog.e_time : "00:00");
        setBHour(worklog.b_hour ? worklog.b_hour : "00:00");
        setDeduction(worklog.deduction ? worklog.deduction : []);
    }, [modalOpen, worklog, setSTime, setETime, setBHour, setDeduction]);

    const onClose = () => {
        setModalOpen(mOpenOps.default);
        setDeduction([]);
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isWorkHoursValid(s_time, e_time, b_hour)) {
            toastError(t("toastF.invalidWorkHours"));
            return;
        }
        submit(
            {
                values: JSON.stringify({
                    wlid: worklog.wlid,
                    s_time,
                    e_time,
                    b_hour,
                }),
                deduction: JSON.stringify(deduction),
                req: "jobEdit",
            },
            { method: "POST", action: genAction(currentRouter) }
        );
    };

    const mainContent = (
        <Form onSubmit={onSubmit} className="grid grid-cols-1">
            <StaffCard staff={worklog} className="col-span-full" />
            <WorkInfoCard work={worklog} className="col-span-full" />
            <SdTabs items={tabsContent()} className="col-span-full" />
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
