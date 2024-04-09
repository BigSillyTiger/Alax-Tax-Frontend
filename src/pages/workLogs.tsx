import type { FC } from "react";
import { Suspense, useEffect } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import LoadingPage from "@/components/loadingEle";
import Card from "@/components/card";
//import { RES_STATUS } from "@/utils/types";
import { PTable } from "@/components/table";
import { useTranslation } from "react-i18next";
import { TwlTableRow } from "@/configs/schema/workSchema";
import wlColumns from "@/configs/columnDefs/defWorkLogs";
import { atModalOpen, atWorkLogTableRow } from "@/configs/atoms";
import { useAtom } from "jotai";
import MJobEdit from "@/pageComponents/modals/mJobEdit/mJobEdit";
import { RES_STATUS } from "@/configs/types";
import { mOpenOps } from "@/configs/utils";
import { toastError, toastSuccess } from "@/lib/toaster";
import MWorkLogDel from "@/pageComponents/modals/mWorkLogDel";

const WorkLogs: FC = () => {
    const { t } = useTranslation();
    const { worklogs } = useLoaderData() as {
        worklogs: TwlTableRow[];
    };
    const actionData = useActionData() as Tresponse;
    const [, setWorkLog] = useAtom(atWorkLogTableRow);
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);

    useEffect(() => {
        if (actionData?.status === RES_STATUS.SUC_UPDATE_WORKLOG) {
            if (modalOpen === mOpenOps.edit) {
                setModalOpen(mOpenOps.default);
                toastSuccess(t("toastS.updateWorkHours"));
                actionData.status = RES_STATUS.DEFAULT;
            }
        } else if (actionData?.status === RES_STATUS.FAILED_UPDATE_WORKLOG) {
            if (modalOpen === mOpenOps.edit) {
                setModalOpen(mOpenOps.default);
                toastError(t("toastF.updateWorkHours"));
                actionData.status = RES_STATUS.DEFAULT;
            }
        } else if (actionData?.status === RES_STATUS.SUC_DELETE_WORKLOG) {
            setModalOpen(mOpenOps.default);
            toastSuccess(t("toastS.delWorkLog"));
            actionData.status = RES_STATUS.DEFAULT;
        } else if (actionData?.status === RES_STATUS.FAILED_DELETE_WORKLOG) {
            setModalOpen(mOpenOps.default);
            toastError(t("toastF.delWorkLog"));
            actionData.status = RES_STATUS.DEFAULT;
        }
    }, [actionData, modalOpen, setModalOpen, t]);

    const WorkLogsTableContent = ({
        workLogs,
    }: {
        workLogs: TwlTableRow[];
    }) => {
        return (
            <div className="px-4 sm:px-6 lg:px-8 top-0">
                {/* header area */}

                {/* table */}
                {workLogs ? (
                    <Card className="mt-8">
                        <PTable
                            search={true}
                            hFilter={true}
                            data={workLogs}
                            columns={wlColumns}
                            menuOptions={{
                                edit: true,
                                del: true,
                            }}
                            setData={setWorkLog}
                            /* getRowCanExpand={(row) => {
                                if (row.original. > 0) {
                                    return true;
                                }
                                return false;
                            }} */
                            //expandContent={orderSubTable}
                            cnSearch="my-3"
                            cnTable={`h-[65dvh]`}
                            cnHead="sticky z-10 bg-indigo-300"
                            cnTh="py-3"
                        />
                    </Card>
                ) : (
                    <Card className="mt-8">
                        <span className="m-5 p-5  text-center h-15">
                            {t("label.noContent")}
                        </span>
                    </Card>
                )}
            </div>
        );
    };

    return (
        <div className="container border-0">
            <Suspense fallback={<LoadingPage />}>
                <Await resolve={worklogs}>
                    {(workLogs) => {
                        return <WorkLogsTableContent workLogs={workLogs} />;
                    }}
                </Await>
            </Suspense>

            {/* modals */}
            <MJobEdit />
            <MWorkLogDel />
        </div>
    );
};

export default WorkLogs;
