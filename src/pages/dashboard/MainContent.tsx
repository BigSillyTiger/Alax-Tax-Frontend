import { TwlTableRow } from "@/configs/schema/workSchema";
import { useEffect, type FC } from "react";
import DutyCard from "./DutyCard";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";
import { useAsyncValue } from "react-router-dom";
import { dateFormat, hmsTohm } from "@/lib/time";

const MainContent: FC = () => {
    const [todayWls] = useAsyncValue() as [TwlTableRow[]];

    const setTodayWorklogs = useTodayWLStore((state) => state.setWorklogs);

    const newTodayWLs = todayWls.map((wl: TwlTableRow) => {
        return {
            ...wl,
            // convert the date format stored in mysql: yyyy-mm-dd to au: dd-mm-yyyy
            // this format is related to date searching in the table
            wl_date: dateFormat(wl.wl_date, "au"),
            s_time: hmsTohm(wl.s_time as string),
            e_time: hmsTohm(wl.e_time as string),
            b_time: hmsTohm(wl.b_time as string),
            b_hour: hmsTohm(wl.b_hour as string),
        };
    });

    useEffect(() => {
        setTodayWorklogs(newTodayWLs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newTodayWLs]);

    return (
        <div className="grid grid-cols-12 gap-x-2">
            <div
                className={`grid grid-cols-1 w-screen h-[40dvh] sm:w-[50vw] sm:h-[50dvh] lg:w-[30vw] lg:h-[50dvh] gap-y-2 px-2 overflow-y-auto overflow-x-hidden`}
            >
                <DutyCard worklogs={newTodayWLs} />
            </div>
        </div>
    );
};

export default MainContent;
