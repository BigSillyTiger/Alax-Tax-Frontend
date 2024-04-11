import { Suspense, useEffect } from "react";
import type { FC } from "react";
import { Await, useActionData, useLoaderData } from "react-router-dom";
import SpinningEle from "@/components/loadingEle/SpinningEle";
import { TwlTableRow } from "@/configs/schema/workSchema";
import DutyCard from "./DutyCard";
import MTimeTracker from "@/pageComponents/modals/mTimeTracker";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";
import { RES_STATUS } from "@/configs/types";
import { atModalOpen } from "@/configs/atoms";
import { useAtom } from "jotai";
import { mOpenOps } from "@/configs/utils";
import { toastError, toastSuccess } from "@/lib/toaster";
import { useTranslation } from "react-i18next";

const Dashboard: FC = () => {
    const [t] = useTranslation();
    const actionData = useActionData() as Tresponse;
    const { worklogs } = useLoaderData() as { worklogs: TwlTableRow[] };
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const setWorklogs = useTodayWLStore((state) => state.setWorklogs);

    useEffect(() => {
        setWorklogs(worklogs);
    }, [worklogs, setWorklogs]);

    useEffect(() => {
        if (actionData?.status === RES_STATUS.SUC_UPDATE_WORKLOG) {
            if (modalOpen === mOpenOps.edit) {
                setModalOpen(mOpenOps.default);
                toastSuccess(t("toastS.updateWL"));
                actionData.status = RES_STATUS.DEFAULT;
            }
        } else if (actionData?.status === RES_STATUS.FAILED_UPDATE_WORKLOG) {
            if (modalOpen === mOpenOps.edit) {
                setModalOpen(mOpenOps.default);
                toastError(t("toastF.updateWL"));
                actionData.status = RES_STATUS.DEFAULT;
            }
        }
    }, [actionData, modalOpen, setModalOpen, t]);

    const DashboardContent = ({ workLogs }: { workLogs: TwlTableRow[] }) => {
        return (
            <div className="grid grid-cols-12 gap-x-2">
                <div
                    className={`grid grid-cols-1 w-screen h-[40dvh] sm:w-[50vw] sm:h-[50dvh] lg:w-[30vw] lg:h-[50dvh] gap-y-2 px-2 overflow-y-auto overflow-x-hidden`}
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
