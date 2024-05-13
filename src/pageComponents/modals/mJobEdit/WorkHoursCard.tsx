import { useEffect, useState, type ComponentPropsWithoutRef } from "react";
import { useTranslation } from "react-i18next";
import { calWorkTime, isWorkHoursValid } from "@/lib/time";
import { useWLHoursStore } from "@/configs/zustore/wlHoursStore";
import Card from "@/components/Card";
import { TimeInput } from "@/components/input";

type Tprops = ComponentPropsWithoutRef<"div">;

const WorkHoursCard = ({ className }: Tprops) => {
    const { t } = useTranslation();
    const s_time = useWLHoursStore((state) => state.s_time);
    const e_time = useWLHoursStore((state) => state.e_time);
    const b_hour = useWLHoursStore((state) => state.b_hour);
    const setSTime = useWLHoursStore((state) => state.setSTime);
    const setETime = useWLHoursStore((state) => state.setETime);
    const setBHour = useWLHoursStore((state) => state.setBHour);
    const [totalWH, setTotalWH] = useState(calWorkTime(s_time, e_time, b_hour));
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setIsValid(isWorkHoursValid(s_time, e_time, b_hour));
        setTotalWH(calWorkTime(s_time, e_time, b_hour));
    }, [s_time, e_time, b_hour]);

    return (
        <Card
            className={`m-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 pl-3 pr-6 pb-3 overflow-y-auto ${className}`}
        >
            <div className="col-span-3 row-span-2 flex flex-col items-center">
                <label
                    htmlFor="s_time"
                    className={`text-lg ${!isValid && "text-red-500"}`}
                >
                    {t("label.start")}
                </label>
                <TimeInput
                    id="s_time"
                    type="start"
                    value={s_time}
                    isValid={isValid}
                    onChange={(e) => setSTime(e.target.value)}
                    className=""
                />
            </div>
            <div className="col-span-3 row-span-2 flex flex-col items-center">
                <label
                    htmlFor="e_time"
                    className={`mx-2 text-lg font-bold ${!isValid && "text-red-500"}`}
                >
                    {t("label.end")}
                </label>
                <TimeInput
                    id="e_time"
                    type="end"
                    value={e_time}
                    isValid={isValid}
                    onChange={(e) => setETime(e.target.value)}
                    className=""
                />
            </div>
            <div className="col-span-3 row-span-1 flex flex-col items-center">
                <label
                    htmlFor="b_hour"
                    className={`mx-2 text-lg font-bold ${!isValid && "text-red-500"}`}
                >
                    {t("label.break")}
                </label>
                <TimeInput
                    id="b_hour"
                    type="break"
                    value={b_hour}
                    isValid={isValid}
                    onChange={(e) => setBHour(e.target.value)}
                    className=""
                />
            </div>
            <div className="col-span-3 row-span-1 flex flex-col items-center">
                <label htmlFor="w_time" className="mx-2 text-lg font-bold">
                    {t("label.workTime")}
                </label>
                <TimeInput
                    id="w_time"
                    type="work"
                    value={totalWH}
                    className=""
                />
            </div>
        </Card>
    );
};

export default WorkHoursCard;
