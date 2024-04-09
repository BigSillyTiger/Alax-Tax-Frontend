import { useEffect, useState, type ComponentPropsWithoutRef } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { calWorkTime, isWorkHoursValid } from "@/lib/time";
import { useWorklogStore } from "@/configs/zustore/worklogStore";
import Card from "@/components/card";

type Tprops = ComponentPropsWithoutRef<"div">;

const WorkHoursCard = ({ className }: Tprops) => {
    const { t } = useTranslation();
    const s_time = useWorklogStore((state) => state.s_time);
    const e_time = useWorklogStore((state) => state.e_time);
    const b_hour = useWorklogStore((state) => state.b_hour);
    const setSTime = useWorklogStore((state) => state.setSTime);
    const setETime = useWorklogStore((state) => state.setETime);
    const setBHour = useWorklogStore((state) => state.setBHour);
    const [totalWH, setTotalWH] = useState(calWorkTime(s_time, e_time, b_hour));
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setIsValid(isWorkHoursValid(s_time, e_time, b_hour));
        setTotalWH(calWorkTime(s_time, e_time, b_hour));
    }, [s_time, e_time, b_hour, totalWH]);

    return (
        <Card
            className={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 pl-3 pr-5 pb-3 overflow-y-auto ${className}`}
        >
            <div className="col-span-3 row-span-2">
                <label
                    htmlFor="s_time"
                    className={`mx-2 text-lg font-bold ${!isValid && "text-red-500"}`}
                >
                    {t("label.start")}
                </label>
                <Input
                    id="s_time"
                    type="time"
                    step="60"
                    value={s_time}
                    onChange={(e) => setSTime(e.target.value)}
                    className={`text-bold text-3xl text-center text-indigo-500 m-2 p-2 ${isValid ? "text-indigo-500" : "border-red-500 focus-visible:ring-red-500 text-red-500"}`}
                />
            </div>
            <div className="col-span-3 row-span-2">
                <label
                    htmlFor="e_time"
                    className={`mx-2 text-lg font-bold ${!isValid && "text-red-500"}`}
                >
                    {t("label.end")}
                </label>
                <Input
                    id="e_time"
                    type="time"
                    step="60"
                    value={e_time}
                    onChange={(e) => setETime(e.target.value)}
                    className={`text-bold text-3xl text-center text-indigo-500 m-2 p-2 ${isValid ? "text-indigo-500" : "border-red-500 focus-visible:ring-red-500 text-red-500"}`}
                />
            </div>
            <div className="col-span-3 row-span-1">
                <label
                    htmlFor="b_hour"
                    className={`mx-2 text-lg font-bold ${!isValid && "text-red-500"}`}
                >
                    {t("label.break")}
                </label>
                <Input
                    id="b_hour"
                    type="time"
                    step="60"
                    value={b_hour}
                    onChange={(e) => setBHour(e.target.value)}
                    className={`text-bold text-3xl text-center m-2 p-2 ${isValid ? "text-amber-500" : "border-red-500 focus-visible:ring-red-500 text-red-500"}`}
                />
            </div>
            <div className="col-span-3 row-span-1">
                <label htmlFor="w_time" className="mx-2 text-lg font-bold">
                    {t("label.workTime")}
                </label>
                <Input
                    id="w_time"
                    type="time"
                    step="60"
                    readOnly
                    value={totalWH}
                    className="text-bold text-3xl text-center text-lime-600 m-2 p-2"
                />
            </div>
        </Card>
    );
};

export default WorkHoursCard;
