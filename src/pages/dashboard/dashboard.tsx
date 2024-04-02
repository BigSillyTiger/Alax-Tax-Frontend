import { Suspense, useEffect } from "react";
import type { FC } from "react";
import { Await, useLoaderData } from "react-router-dom";
import SpinningEle from "@/components/loadingEle/SpinningEle";
//import { useAdminStore } from "@/configs/zustore";
import { TwlTableRow } from "@/configs/schema/workSchema";
import DutyCard from "./DutyCard";
import MTimeTracker from "@/pageComponents/modals/mTimeTracker";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";
import {
    dutyCardH,
    dutyCardLgH,
    dutyCardLgW,
    dutyCardSmH,
    dutyCardSmW,
    fullW,
} from "@/configs/ui";

const Dashboard: FC = () => {
    const { worklogs } = useLoaderData() as { worklogs: TwlTableRow[] };
    const setWorklogs = useTodayWLStore((state) => state.setWorklogs);

    useEffect(() => {
        setWorklogs(worklogs);
    }, [worklogs, setWorklogs]);

    const DashboardContent = ({ workLogs }: { workLogs: TwlTableRow[] }) => {
        return (
            <div className="grid grid-cols-12 gap-x-2">
                <div
                    className={`grid grid-cols-1 w-[${fullW}] h-[${dutyCardH}] sm:w-[${dutyCardSmW}] sm:h-[${dutyCardSmH}] lg:w-[${dutyCardLgW}] lg:h-[${dutyCardLgH}] gap-y-2 px-2 overflow-y-auto overflow-x-hidden`}
                >
                    <DutyCard worklogs={workLogs} />
                </div>
            </div>
        );
    };

    return (
        <div className="mx-2 px-0">
            <Suspense fallback={<SpinningEle />}>
                <Await resolve={worklogs}>
                    {(workLogs) => {
                        return <DashboardContent workLogs={workLogs} />;
                    }}
                </Await>
            </Suspense>

            {/* modals */}
            <MTimeTracker />
        </div>
    );
};

export default Dashboard;
