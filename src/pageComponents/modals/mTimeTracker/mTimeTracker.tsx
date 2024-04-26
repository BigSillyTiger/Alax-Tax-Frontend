import { MTemplate } from "@/components/modal";
import { atModalOpen } from "@/configs/atoms";
//import { useSubmit } from "react-router-dom";
import { mOpenOps } from "@/configs/utils/modal";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import StaffCard from "@/pageComponents/cards/StaffCard";
import WorkInfoCard from "@/pageComponents/cards/WorkInfoCard";
import MResetTimer from "./mResetTimer";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";
import { SdTabs } from "@/components/tabs";
import { useAdminStore, useDeductStore } from "@/configs/zustore";
import { TitemContent } from "@/configs/types";
import DeductionCard from "@/pageComponents/cards/DeductionCard";
import TimeCard from "./TimeCard";
import atResetModal from "@/configs/atoms/atResetModal";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { useEffect } from "react";
import { ROLES } from "@/configs/utils/staff";

const MTimeTracker = () => {
    //const submit = useSubmit();
    const { t } = useTranslation();
    const [openReset, setOpenReset] = useAtom(atResetModal);
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    //const currentRouter = useRouterStore((state) => state.currentRouter);
    const currentAdmin = useAdminStore((state) => state.currentAdmin);
    const setDeduction = useDeductStore((state) => state.setDeduction);
    const currentWlid = useTodayWLStore((state) => state.currentWlid);
    const todayWorklogs = useTodayWLStore((state) => state.todayWorklogs);
    const worklog =
        todayWorklogs.find((wl) => wl.wlid === currentWlid) ??
        ({} as TwlTableRow);
    const isDisabled =
        worklog.wl_status === "completed" || worklog.wl_status === "unpaid"
            ? true
            : false;

    useEffect(() => {
        setDeduction(worklog.deduction ? worklog.deduction : []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [worklog]);

    const onClose = () => {
        if (openReset) {
            setOpenReset(false);
        } else {
            setModalOpen(mOpenOps.default);
        }
    };

    const tabsContent = () => {
        const items = [] as TitemContent[];

        items.push({
            title: t("label.workHours"),
            content: <TimeCard isDisabled={isDisabled} />,
        });

        items.push({
            title: t("label.deduction"),
            content: (
                <DeductionCard
                    className="col-span-full"
                    withSubmitBtn={true}
                    isDisabled={isDisabled}
                />
            ),
        });

        return items;
    };

    const mainContent = (
        <div className={`grid grid-cols-1 gap-x-2 overflow-y-auto h-[55dvh]`}>
            {/* info */}
            <div className="col-span-1 flex flex-col sm:flex-row">
                <StaffCard staff={worklog} className="grow-1" />
                <WorkInfoCard work={worklog} className="grow-1" />
            </div>
            {/* time */}
            {currentAdmin.role === ROLES.manager ? (
                <SdTabs items={tabsContent()} className="col-span-1" />
            ) : (
                <TimeCard isDisabled={isDisabled} />
            )}
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
                wlid={currentWlid}
            />
        </>
    );
};

export default MTimeTracker;
