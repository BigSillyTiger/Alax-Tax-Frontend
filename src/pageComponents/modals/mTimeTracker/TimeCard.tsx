import type { FC } from "react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";
import { capFirstLetter } from "@/lib/literals";
import { calBreakTime, calWorkTime, genHHMM } from "@/lib/time";
import { useTranslation } from "react-i18next";
import TimeBtnGroup from "./TimeBtnGroup";
import { TwlTableRow } from "@/configs/schema/workSchema";
import Card from "@/components/Card";
import { statusColor } from "@/configs/utils/color";
import { joinAllValues } from "@/lib/utils";
import { TstatusColor } from "@/configs/types";
import { Separator } from "@/components/ui/separator";

type Tprops = {
    isDisabled?: boolean;
};

const TimeCard: FC<Tprops> = ({ isDisabled }) => {
    const { t } = useTranslation();
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
        <div className="flex flex-col">
            <Card className="m-3 flex flex-col gap-y-3">
                <div className="mt-2 flex justify-evenly items-center">
                    <span className="text-lg font-bold text-indigo-600">
                        {t("label.workStatus") + ": "}
                    </span>
                    <span
                        className={`text-3xl font-bold rounded-full px-4 ${joinAllValues(statusColor[worklog.wl_status as TstatusColor])}`}
                    >
                        {capFirstLetter(worklog.wl_status)}
                    </span>
                </div>

                <Separator className="border-indigo-300" />

                <div className="flex flex-row flex-wrap justify">
                    {/* start */}
                    <div className="flex flex-col items-center">
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
                    <div className="flex flex-col items-center">
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
                    <div className="flex flex-col items-center">
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
                    <div className="flex flex-col items-center">
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
                </div>
            </Card>
            {isDisabled ? null : <TimeBtnGroup className="mt-2" />}
        </div>
    );
};

export default TimeCard;
