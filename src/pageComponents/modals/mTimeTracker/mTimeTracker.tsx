import { useState } from "react";
import { MTemplate } from "@/components/modal";
import { atModalOpen } from "@/configs/atoms";
//import { useSubmit } from "react-router-dom";
import { mOpenOps } from "@/configs/utils";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import StaffCard from "@/pageComponents/cards/StaffCard";
import WorkInfoCard from "@/pageComponents/cards/WorkInfoCard";

import TimeBtnGroup from "./TimeBtns";
import MResetTimer from "./mResetTimer";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";
import { TwlTableRow } from "@/configs/schema/workSchema";
import TimeCard from "./TimeCard";

const MTimeTracker = () => {
    //const submit = useSubmit();
    const { t } = useTranslation();
    const [openReset, setOpenReset] = useState(false);
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    //const currentRouter = useRouterStore((state) => state.currentRouter);
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

    const mainContent = (
        <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-x-2 overflow-y-auto h-[47dvh]`}
        >
            {/* info */}
            <div className="col-span-1">
                <StaffCard staff={worklog} className="col-span-full" />
                <WorkInfoCard work={worklog} className="col-span-full" />
            </div>
            {/* time */}
            <TimeCard />
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
