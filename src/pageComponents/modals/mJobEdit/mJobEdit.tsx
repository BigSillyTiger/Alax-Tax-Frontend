import type { FormEvent } from "react";
import { useEffect } from "react";
import { MTemplate } from "@/components/modal";
import { atModalOpen, atWorkLogTableRow } from "@/configs/atoms";
import { useNavigation, Form, useSubmit } from "react-router-dom";
import { mOpenOps } from "@/configs/utils/modal";
import { useAtom } from "jotai";
import { SubmitBtn } from "@/components/form";
import { useTranslation } from "react-i18next";
import StaffCard from "@/pageComponents/cards/StaffCard";
import WorkInfoCard from "@/pageComponents/cards/WorkInfoCard";
import { isWorkHoursValid } from "@/lib/time";
import { genAction } from "@/lib/literals";
import { toastWarning } from "@/lib/toaster";
import {
    useAdminStore,
    useDeductStore,
    useRouterStore,
} from "@/configs/zustore";
import { useWLHoursStore } from "@/configs/zustore/wlHoursStore";
import { SdTabs } from "@/components/tabs";
import { TitemContent } from "@/configs/types";
import WorkHoursCard from "./WorkHoursCard";
import DeductionCard from "@/pageComponents/cards/DeductionCard";
import { useJobWLStore } from "@/configs/zustore/jobWLStore";
import { ROLES } from "@/configs/utils/staff";

const MJobEdit = () => {
    const navigation = useNavigation();
    const submit = useSubmit();
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [worklog] = useAtom(atWorkLogTableRow);
    const isManager =
        useAdminStore((state) => state.currentAdmin).role === ROLES.manager;
    const currentRouter = useRouterStore((state) => state.currentRouter);
    const s_time = useWLHoursStore((state) => state.s_time);
    const e_time = useWLHoursStore((state) => state.e_time);
    const b_hour = useWLHoursStore((state) => state.b_hour);
    const setSTime = useWLHoursStore((state) => state.setSTime);
    const setETime = useWLHoursStore((state) => state.setETime);
    const setBHour = useWLHoursStore((state) => state.setBHour);
    const deduction = useDeductStore((state) => state.deduction);
    const setDeduction = useDeductStore((state) => state.setDeduction);
    const wlNote = useJobWLStore((state) => state.wlNote);
    const setWlNote = useJobWLStore((state) => state.setWlNote);
    const isDisable = isManager
        ? worklog.wl_status === "completed" || worklog.wl_status === "unpaid"
            ? true
            : false
        : worklog.wl_status === "cancelled" ||
            worklog.wl_status === "confirmed" ||
            worklog.wl_status === "completed" ||
            worklog.wl_status === "unpaid"
          ? true
          : false;

    useEffect(() => {
        setSTime(worklog.s_time ? worklog.s_time : "00:00");
        setETime(worklog.e_time ? worklog.e_time : "00:00");
        setBHour(worklog.b_hour ? worklog.b_hour : "00:00");
        setDeduction(worklog.deduction ? worklog.deduction : []);
        setWlNote(worklog.wl_note ? worklog.wl_note : "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalOpen, worklog]);

    const onClose = () => {
        setModalOpen(mOpenOps.default);
        setDeduction([]);
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let submitContent = {};
        if (isManager) {
            if (!isWorkHoursValid(s_time, e_time, b_hour)) {
                toastWarning(t("toastW.invalidWorkHoursUpdateOthers"));
                submitContent = {
                    wlid: JSON.stringify(worklog.wlid),
                    values: JSON.stringify("skip"),
                    wlNote: JSON.stringify(wlNote),
                    deduction: JSON.stringify(deduction),
                    req: "jobEdit",
                };
            } else {
                submitContent = {
                    wlid: JSON.stringify(worklog.wlid),
                    values: JSON.stringify({
                        s_time,
                        e_time,
                        b_hour,
                    }),
                    wlNote: JSON.stringify(wlNote),
                    deduction: JSON.stringify(deduction),
                    req: "jobEdit",
                };
            }
        } else {
            submitContent = {
                wlid: JSON.stringify(worklog.wlid),
                values: JSON.stringify({
                    s_time,
                    e_time,
                    b_hour,
                }),
                wlNote: JSON.stringify("skip"),
                deduction: JSON.stringify("skip"),
                req: "jobEdit",
            };
        }
        submit(
            {
                ...submitContent,
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
            content: (
                <DeductionCard
                    className="col-span-full"
                    isDisabled={isDisable}
                />
            ),
        });

        return items;
    };

    const mainContent = (
        <Form onSubmit={onSubmit} className="grid grid-cols-1">
            <div className="col-span-1 flex flex-col sm:flex-row">
                <StaffCard staff={worklog} className="grow-1" />
                <WorkInfoCard
                    work={worklog}
                    className="grow-1"
                    editable={isManager}
                />
            </div>
            {/* time */}
            {isManager ? (
                <SdTabs items={tabsContent()} className="col-span-full" />
            ) : (
                <WorkHoursCard className="col-span-full h-[25dvh]" />
            )}
            {isDisable ? null : (
                <div className="col-span-full">
                    {/* btns */}
                    <SubmitBtn
                        onClick={() => {}}
                        onClose={onClose}
                        navState={navigation.state}
                        className=""
                    />
                </div>
            )}
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
