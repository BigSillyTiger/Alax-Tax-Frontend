import { useState, useEffect } from "react";
import { MTemplate } from "@/components/modal";
import { atModalOpen } from "@/configs/atoms";
//import { useSubmit } from "react-router-dom";
import { genHHMM, mOpenOps, wlStatusColorMap } from "@/configs/utils";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import StaffCard from "@/pageComponents/cards/StaffCard";
import WorkInfoCard from "@/pageComponents/cards/WorkInfoCard";
import { calBreakTime, calWorkTime, capFirstLetter } from "@/utils/utils";
//import { useRouterStore } from "@/configs/zustore";
import Fieldset from "@/components/form/fieldset";
import { Input } from "@/components/ui/input";
import TimeBtnGroup from "./TimeBtns";
import MResetTimer from "./mResetTimer";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { timerModalH } from "@/configs/ui";

const MTimeTracker = () => {
    //const submit = useSubmit();
    const { t } = useTranslation();
    const [nowTime, setNowTime] = useState(genHHMM(new Date()));
    const [openReset, setOpenReset] = useState(false);
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    //const currentRouter = useRouterStore((state) => state.currentRouter);
    const currentWlid = useTodayWLStore((state) => state.currentWlid);
    const todayWorklogs = useTodayWLStore((state) => state.todayWorklogs);
    const worklog =
        todayWorklogs.find((wl) => wl.wlid === currentWlid) ??
        ({} as TwlTableRow);

    useEffect(() => {
        const timer = setInterval(() => {
            setNowTime(genHHMM(new Date()));
        }, 10000);

        // Clean up the timer when the component unmounts
        return () => clearInterval(timer);
    }, []);

    const onClose = () => {
        if (openReset) {
            setOpenReset(false);
        } else {
            setModalOpen(mOpenOps.default);
        }
    };

    const workTime = (() => {
        if (worklog.wl_status === "ongoing" && worklog.b_time === "00:00") {
            return calWorkTime(worklog.s_time, nowTime, worklog.b_hour);
        } else if (
            worklog.wl_status === "ongoing" &&
            worklog.b_time !== "00:00"
        ) {
            return calWorkTime(worklog.s_time, worklog.b_time, "00:00");
        } else {
            return calWorkTime(worklog.s_time, worklog.e_time, worklog.b_hour);
        }
    })();

    const breakTime = (() => {
        if (worklog.wl_status === "ongoing" && worklog.b_time === "00:00") {
            return worklog.b_hour;
        } else if (
            worklog.wl_status === "ongoing" &&
            worklog.b_time !== "00:00"
        ) {
            return calBreakTime(worklog.b_time, nowTime, worklog.b_hour);
        } else {
            return worklog.b_hour;
        }
    })();

    const mainContent = (
        <div className="">
            <section
                className={`grid grid-cols-1 sm:grid-cols-2 gap-x-2 overflow-y-auto max-h-[${timerModalH}]`}
            >
                {/* info */}
                <div className="col-span-1">
                    <StaffCard staff={worklog} className="col-span-full" />
                    <WorkInfoCard work={worklog} className="col-span-full" />
                </div>
                {/* time */}
                <div className="col-span-1">
                    <Fieldset
                        title={t("label.timeInfo")}
                        sFieldset="m-3 grid grid-cols-6 pl-3 pr-5"
                    >
                        <div className="col-span-3 row-span-2">
                            <label
                                htmlFor="s_time"
                                className={`mx-2 text-lg font-bold`}
                            >
                                {t("label.start")}
                            </label>
                            <Input
                                id="s_time"
                                type="time"
                                step="60"
                                value={worklog.s_time}
                                readOnly
                                className={`text-bold text-3xl w-auto text-center text-indigo-500 m-2 p-2`}
                            />
                        </div>
                        <div className="col-span-3 row-span-2">
                            <label
                                htmlFor="e_time"
                                className={`mx-2 text-lg font-bold`}
                            >
                                {t("label.end")}
                            </label>
                            <Input
                                id="e_time"
                                type="time"
                                step="60"
                                value={worklog.e_time}
                                readOnly
                                className={`text-bold text-3xl text-center w-auto text-indigo-500 m-2 p-2`}
                            />
                        </div>
                        <div className="col-span-3 row-span-1">
                            <label
                                htmlFor="b_hour"
                                className={`mx-2 text-lg font-bold`}
                            >
                                {t("label.break")}
                            </label>
                            <Input
                                id="b_hour"
                                type="time"
                                step="60"
                                value={breakTime}
                                readOnly
                                className={`text-bold text-3xl w-auto text-amber-500 text-center m-2 p-2`}
                            />
                        </div>
                        <div className="col-span-3 row-span-1">
                            <label
                                htmlFor="w_time"
                                className="mx-2 text-lg font-bold"
                            >
                                {t("label.workTime")}
                            </label>
                            <Input
                                id="w_time"
                                type="time"
                                step="60"
                                readOnly
                                value={workTime}
                                className="text-bold text-3xl w-auto text-center text-lime-600 m-2 p-2"
                            />
                        </div>
                    </Fieldset>
                    <div className="mt-10 pl-5">
                        <span className="text-lg font-bold text-indigo-600">
                            {t("label.workStatus") + ": "}
                        </span>
                        <span
                            className={`text-3xl font-bold rounded-full px-4 ${wlStatusColorMap[worklog.wl_status]}`}
                        >
                            {capFirstLetter(worklog.wl_status)}
                        </span>
                    </div>
                </div>
                <TimeBtnGroup
                    setOpenReset={setOpenReset}
                    className="col-span-full"
                />
            </section>
        </div>
    );

    return (
        <>
            <MTemplate
                open={!!(modalOpen === mOpenOps.edit)}
                onClose={onClose}
                title={t("modal.title.timeTracker")}
                mQuit={false}
                mode="xl"
            >
                {mainContent}
            </MTemplate>

            <MResetTimer
                open={openReset}
                setOpen={setOpenReset}
                wlid={worklog.wlid}
            />
        </>
    );
};

export default MTimeTracker;
