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

const WorkLogs: FC = () => {
    const { t } = useTranslation();
    const { worklogs } = useLoaderData() as {
        worklogs: TwlTableRow[];
    };

    const actionData = useActionData() as Tresponse;

    useEffect(() => {
        //console.log("-> test");
    }, [actionData]);

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
                            //setData={setClientOrder}
                            getRowCanExpand={(row) => {
                                if (row.original.order_services.length > 0) {
                                    return true;
                                }
                                return false;
                            }}
                            //expandContent={orderSubTable}
                            cnSearch="my-3"
                            cnTable="h-[65vh]"
                            cnHead="sticky z-10 bg-indigo-300"
                            cnTh="py-3"
                        />
                    </Card>
                ) : (
                    <Card className="mt-8">
                        <span className="m-5 p-5  text-center h-15">
                            No Order Content
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
        </div>
    );
};

export default WorkLogs;
