import { FormEvent, useState } from "react";
import { MTemplate } from "@/components/modal";
import { atModalOpen } from "@/configs/atoms";
import { useSubmit } from "react-router-dom";
import { mOpenOps } from "@/configs/utils";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import StaffCard from "@/pageComponents/cards/StaffCard";
import WorkInfoCard from "@/pageComponents/cards/WorkInfoCard";
import { calWorkTime, genAction } from "@/utils/utils";
import { useRouterStore } from "@/configs/zustore";
import Fieldset from "@/components/form/fieldset";
import { Input } from "@/components/ui/input";
import TimeBtnGroup from "./TimeBtns";
import MResetTimer from "./mResetTimer";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";
import { TwlTableRow } from "@/configs/schema/workSchema";

const MTimeTracker = () => {
    const submit = useSubmit();
    const { t } = useTranslation();
    const [openReset, setOpenReset] = useState(false);
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const currentRouter = useRouterStore((state) => state.currentRouter);
    const currentWlid = useTodayWLStore((state) => state.currentWlid);
    const todayWorklogs = useTodayWLStore((state) => state.todayWorklogs);
    const worklog =
        todayWorklogs.find((wl) => wl.wlid === currentWlid) ??
        ({} as TwlTableRow);

    const onClose = () => {
        if (openReset) {
            setOpenReset(false);
        } else {
            setModalOpen(mOpenOps.default);
        }
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        submit(
            {
                values: JSON.stringify({
                    wlid: worklog.wlid,
                }),
                req: "timeTracker",
            },
            { method: "POST", action: genAction(currentRouter) }
        );
    };

    const mainContent = (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2">
            {/* info */}
            <div className="col-span-1">
                <StaffCard staff={worklog} className="col-span-full" />
                <WorkInfoCard work={worklog} className="col-span-full" />
            </div>
            {/* time */}
            <div className="col-span-1">
                <Fieldset
                    title={t("label.timeInfo")}
                    sFieldset="grid grid-cols-6"
                >
                    <div className="col-span-3 row-span-2">
                        <label
                            htmlFor="s_time"
                            className={`mx-2 text-lg font-bold`}
                        >
                            {t("label.start")}
                        </label>
                        <Input
                            id="s_time"
                            type="time"
                            step="60"
                            value={worklog.s_time}
                            readOnly
                            className={`text-bold text-3xl w-auto text-center text-indigo-500 m-2 p-2`}
                        />
                    </div>
                    <div className="col-span-3 row-span-2">
                        <label
                            htmlFor="e_time"
                            className={`mx-2 text-lg font-bold`}
                        >
                            {t("label.end")}
                        </label>
                        <Input
                            id="e_time"
                            type="time"
                            step="60"
                            value={worklog.e_time}
                            readOnly
                            className={`text-bold text-3xl text-center w-auto text-indigo-500 m-2 p-2`}
                        />
                    </div>
                    <div className="col-span-3 row-span-1">
                        <label
                            htmlFor="b_time"
                            className={`mx-2 text-lg font-bold`}
                        >
                            {t("label.break")}
                        </label>
                        <Input
                            id="b_time"
                            type="time"
                            step="60"
                            value={worklog.b_time}
                            readOnly
                            className={`text-bold text-3xl w-auto text-amber-500 text-center m-2 p-2`}
                        />
                    </div>
                    <div className="col-span-3 row-span-1">
                        <label
                            htmlFor="w_time"
                            className="mx-2 text-lg font-bold"
                        >
                            {t("label.workTime")}
                        </label>
                        <Input
                            id="w_time"
                            type="time"
                            step="60"
                            readOnly
                            value={calWorkTime(
                                worklog.s_time,
                                worklog.e_time,
                                worklog.b_time
                            )}
                            className="text-bold text-3xl w-auto text-center text-lime-600 m-2 p-2"
                        />
                    </div>
                </Fieldset>
            </div>
            <TimeBtnGroup
                setOpenReset={setOpenReset}
                className="col-span-full"
            />
        </div>
    );

    return (
        <>
            <MTemplate
                open={!!(modalOpen === mOpenOps.edit)}
                onClose={onClose}
                title={t("modal.title.timeTracker")}
                mQuit={false}
                mode="xl"
            >
                {mainContent}
            </MTemplate>

            <MResetTimer
                open={openReset}
                setOpen={setOpenReset}
                wlid={worklog.wlid}
            />
        </>
    );
};

export default MTimeTracker;
