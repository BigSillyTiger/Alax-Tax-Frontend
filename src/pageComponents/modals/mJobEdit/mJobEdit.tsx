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
import { useDeductStore, useRouterStore } from "@/configs/zustore";
import { useWLHoursStore } from "@/configs/zustore/wlHoursStore";
import { SdTabs } from "@/components/tabs";
import { TitemContent } from "@/configs/types";
import WorkHoursCard from "./WorkHoursCard";
import DeductionCard from "@/pageComponents/cards/DeductionCard";

const MJobEdit = () => {
    const navigation = useNavigation();
    const submit = useSubmit();
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [worklog] = useAtom(atWorkLogTableRow);
    const currentRouter = useRouterStore((state) => state.currentRouter);
    const s_time = useWLHoursStore((state) => state.s_time);
    const e_time = useWLHoursStore((state) => state.e_time);
    const b_hour = useWLHoursStore((state) => state.b_hour);
    const setSTime = useWLHoursStore((state) => state.setSTime);
    const setETime = useWLHoursStore((state) => state.setETime);
    const setBHour = useWLHoursStore((state) => state.setBHour);
    const deduction = useDeductStore((state) => state.deduction);
    const setDeduction = useDeductStore((state) => state.setDeduction);

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

    const tabsContent = () => {
        const items = [] as TitemContent[];

        items.push({
            title: t("label.workHours"),
            content: <WorkHoursCard className="col-span-full h-[25dvh]" />,
        });

        items.push({
            title: t("label.deduction"),
            content: <DeductionCard className="col-span-full" />,
        });

        return items;
    };

    const mainContent = (
        <Form onSubmit={onSubmit} className="grid grid-cols-1">
            <StaffCard staff={worklog} className="col-span-full" />
            <WorkInfoCard work={worklog} className="col-span-full" />
            <SdTabs items={tabsContent()} className="col-span-full" />
            <div className="col-span-full">
                {/* btns */}
                <SubmitBtn
                    onClick={() => {}}
                    onClose={onClose}
                    navState={navigation.state}
                    className=""
                />
            </div>
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
