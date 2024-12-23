import type { FC } from "react";
import { useEffect, useMemo } from "react";
import Card from "@/components/Card";
import { PTable } from "@/components/table";
import { atWorkLogTableRow } from "@/configs/atoms";
import useWLConlumnsDef from "@/configs/columnDefs/defWorkLogs";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { dateFormat, hmsTohm } from "@/lib/time";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { useAsyncValue } from "react-router-dom";
import { updateBellAlert } from "@/lib/utils";
import { useAdminStore } from "@/configs/zustore";
import { ROLES } from "@/configs/utils/staff";
import EmptyTips from "@/components/EmptyTips";

const MainContent: FC = () => {
    const { t } = useTranslation();
    const [, setWorkLog] = useAtom(atWorkLogTableRow);
    const currentAdmin = useAdminStore((state) => state.currentAdmin);

    const [worklogs] = useAsyncValue() as [TwlTableRow[]];
    const wlColumns = useWLConlumnsDef();
    // remove menu bar for employee
    const newWLColumns =
        currentAdmin.role === ROLES.manager ? wlColumns : wlColumns.slice(1);

    const newWorklogs = useMemo(
        () =>
            worklogs
                .sort((a: TwlTableRow, b: TwlTableRow) => {
                    const dateA = new Date(a.wl_date);
                    const dateB = new Date(b.wl_date);

                    // Compare dates
                    if (dateA > dateB) return -1; // Return -1 to indicate dateA comes before dateB
                    if (dateA < dateB) return 1; // Return 1 to indicate dateA comes after dateB
                    return 0;
                })
                .map((wl: TwlTableRow) => {
                    return {
                        ...wl,
                        // convert the date format stored in mysql: yyyy-mm-dd to au: dd-mm-yyyy
                        // this format is related to date searching in the table
                        wl_date: dateFormat(wl.wl_date),
                        s_time: hmsTohm(wl.s_time as string),
                        e_time: hmsTohm(wl.e_time as string),
                        b_time: hmsTohm(wl.b_time as string),
                        b_hour: hmsTohm(wl.b_hour as string),
                    };
                }),

        [worklogs]
    );

    useEffect(() => {
        // update bell alert
        updateBellAlert({ unWorklog: worklogs });
    }, [worklogs]);

    return (
        <div
            className="w-full h-full px-4 sm:px-6 lg:px-8 top-0 
            flex flex-col gap-3"
        >
            {/* header area */}

            {/* table */}
            {
                <Card className="my-2 grow">
                    {newWorklogs && newWorklogs.length ? (
                        <PTable
                            search={true}
                            hFilter={true}
                            data={newWorklogs}
                            columns={newWLColumns}
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
                            cnSearch="mb-2"
                            cnTable={`h-[74dvh]`}
                            cnHead="sticky z-10 bg-indigo-300"
                            cnTh="py-3"
                        />
                    ) : (
                        <EmptyTips>{t("tips.noWorklog")}</EmptyTips>
                    )}
                </Card>
            }
        </div>
    );
};

export default MainContent;
