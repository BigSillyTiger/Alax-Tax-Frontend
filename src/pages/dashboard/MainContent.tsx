import { TwlTableRow } from "@/configs/schema/workSchema";
import type { FC } from "react";
import { useEffect } from "react";
import DutyCard from "./DutyCard";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";

type Tprops = {
    todayWLs: TwlTableRow[];
};

const MainContent: FC<Tprops> = ({ todayWLs }) => {
    const setWorklogs = useTodayWLStore((state) => state.setWorklogs);

    useEffect(() => {
        setWorklogs(todayWLs);
    }, [todayWLs, setWorklogs]);

    return (
        <div className="grid grid-cols-12 gap-x-2">
            <div
                className={`grid grid-cols-1 w-screen h-[40dvh] sm:w-[50vw] sm:h-[50dvh] lg:w-[30vw] lg:h-[50dvh] gap-y-2 px-2 overflow-y-auto overflow-x-hidden`}
            >
                <DutyCard worklogs={todayWLs} />
            </div>
        </div>
    );
};

export default MainContent;
