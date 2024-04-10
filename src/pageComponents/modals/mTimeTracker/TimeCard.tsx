import type { FC } from "react";
import { useEffect, useState } from "react";
import Fieldset from "@/components/form/fieldset";
import { Input } from "@/components/ui/input";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { genHHMM, wlStatusColorMap } from "@/configs/utils";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";
import { capFirstLetter } from "@/lib/literals";
import { calBreakTime, calWorkTime } from "@/lib/time";
import { useTranslation } from "react-i18next";

const TimeCard: FC = () => {
    const [t] = useTranslation();
    const [nowTime, setNowTime] = useState(genHHMM(new Date()));
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

    const workTime = (() => {
        if (worklog.wl_status === "ongoing") {
            return calWorkTime(worklog.s_time, nowTime, worklog.b_hour);
        } else if (worklog.wl_status === "resting") {
            return calWorkTime(worklog.s_time, worklog.b_time, worklog.b_hour);
        } else {
            return calWorkTime(worklog.s_time, worklog.e_time, worklog.b_hour);
        }
    })();

    const breakTime = (() => {
        if (worklog.wl_status === "resting") {
            return calBreakTime(worklog.b_time, nowTime, worklog.b_hour);
        } else {
            return worklog.b_hour;
        }
    })();

    return (
        <div className="col-span-1">
            <Fieldset
                title={t("label.timeInfo")}
                sFieldset="m-3 grid grid-cols-6 pl-3 pr-5"
            >
                {/* start */}
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
                {/* end */}
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
                {/* break hour */}
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
                {/* work hour */}
                <div className="col-span-3 row-span-1">
                    <label htmlFor="w_time" className="mx-2 text-lg font-bold">
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
                    className={`text-3xl font-bold rounded-full px-4 ${wlStatusColorMap[worklog.wl_status as keyof typeof wlStatusColorMap]}`}
                >
                    {capFirstLetter(worklog.wl_status)}
                </span>
            </div>
        </div>
    );
};

export default TimeCard;
