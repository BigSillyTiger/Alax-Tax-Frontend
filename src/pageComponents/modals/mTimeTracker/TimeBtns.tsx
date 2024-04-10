import { type FC, type ComponentPropsWithoutRef } from "react";
import { Button } from "@/components/ui/button";
import { useSubmit } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { genAction } from "@/lib/literals";
import { useRouterStore } from "@/configs/zustore";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";
import { TactionReqList } from "@/configs/types";
import { actionReqList } from "@/configs/utils";

type Tprops = ComponentPropsWithoutRef<"div"> & {
    setOpenReset: (val: boolean) => void;
};

const TimeBtnGroup: FC<Tprops> = ({ className, setOpenReset }) => {
    const { t } = useTranslation();
    //const [worklog] = useAtom(atWorkLogTableRow);
    const currentRouter = useRouterStore((state) => state.currentRouter);
    const submit = useSubmit();
    const currentWlid = useTodayWLStore((state) => state.currentWlid);
    const todayWorklogs = useTodayWLStore((state) => state.todayWorklogs);
    const worklog =
        todayWorklogs.find((wl) => wl.wlid === currentWlid) ??
        ({} as TwlTableRow);

    const handleClick = (req: TactionReqList) => {
        submit(
            {
                wlid: worklog.wlid,
                req,
            },
            { method: "POST", action: genAction(currentRouter) }
        );
    };

    return (
        <div
            className={`w-full grid grid-cols-5 gap-x-5 pt-3 border-t border-indigo-100 border-dashed ${className}`}
        >
            {worklog.wl_status === "pending" ? (
                <Button
                    className={`border-2 text-lg font-bold col-span-full border-lime-700 bg-lime-600 text-slate-100 hover:bg-slate-100 hover:text-lime-600`}
                    onClick={() => handleClick(actionReqList.startTimer)}
                >
                    {t("btn.timeStart")}
                </Button>
            ) : (
                <>
                    <Button
                        className={`border-2 col-span-1 rounded-full font-bold border-red-600 bg-red-500 text-slate-100 hover:bg-slate-100 hover:text-red-600 text-wrap`}
                        onClick={() => setOpenReset(true)}
                    >
                        {t("btn.timeReset")}
                    </Button>
                    {worklog.b_time === "00:00" ? (
                        <Button
                            className={`border-2 text-lg font-bold col-span-2 border-amber-700 bg-amber-600 text-slate-100 hover:bg-slate-100 hover:text-amber-600`}
                            disabled={
                                worklog.wl_status === "confirmed" ||
                                worklog.wl_status === "unconfirmed" ||
                                worklog.wl_status === "cancelled"
                            }
                            onClick={() =>
                                handleClick(actionReqList.pauseTimer)
                            }
                        >
                            {t("btn.timeBreak")}
                        </Button>
                    ) : (
                        <Button
                            className={`border-2 text-lg font-bold col-span-2 border-amber-700 bg-amber-600 text-slate-100 hover:bg-slate-100 hover:text-amber-600`}
                            disabled={
                                worklog.wl_status === "confirmed" ||
                                worklog.wl_status === "unconfirmed"
                            }
                            onClick={() =>
                                handleClick(actionReqList.resumeTimer)
                            }
                        >
                            {t("btn.timeResume")}
                        </Button>
                    )}

                    <Button
                        className={`border-2 text-lg font-bold col-span-2 border-indigo-700 bg-indigo-600 text-slate-100 hover:bg-slate-100 hover:text-indigo-600`}
                        disabled={
                            worklog.wl_status === "confirmed" ||
                            worklog.wl_status === "unconfirmed"
                        }
                        onClick={() => handleClick(actionReqList.stopTimer)}
                    >
                        {t("btn.timeStop")}
                    </Button>
                </>
            )}
        </div>
    );
};

export default TimeBtnGroup;
