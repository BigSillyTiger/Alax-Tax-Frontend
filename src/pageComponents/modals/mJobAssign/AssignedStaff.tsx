import type { FC } from "react";
import Fieldset from "@/components/Fieldset";
import { useTranslation } from "react-i18next";
import WorkLogCard from "@/pageComponents/modals/mJobAssign/WorkLogCard";
import { useJobAssignStore } from "@/configs/zustore";
import { isSameDay } from "date-fns";

const AssignedStaff: FC = () => {
    const { t } = useTranslation();
    const selectedDate = useJobAssignStore((state) => state.selectedDate);
    const currentWLUnion = useJobAssignStore((state) => state.currentWLUnion);

    /* update work logs when all staff changed */
    const scheduledWork = (() => {
        if (selectedDate) {
            const workLog = currentWLUnion.filter((work) => {
                return isSameDay(new Date(work.wl_date), selectedDate);
            });
            return workLog.length ? workLog[0].assigned_work : [];
        } else {
            return [];
        }
    })();

    return (
        <Fieldset
            title={t("label.assignedStaff")}
            sFieldset={`col-span-full lg:col-span-5 my-2 mx-1 h-[28dvh] md:h-[38dvh] lg:h-[45dvh] overflow-y-auto p-4`}
        >
            {scheduledWork.length > 0 ? (
                scheduledWork.map((item) => (
                    <WorkLogCard
                        key={item.fk_uid}
                        className="w-full"
                        item={item}
                    />
                ))
            ) : (
                <span className="text-bold text-indigo-300">
                    {t("tips.noAssignedStaff")}
                </span>
            )}
        </Fieldset>
    );
};

export default AssignedStaff;
