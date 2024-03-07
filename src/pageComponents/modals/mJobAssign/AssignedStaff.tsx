import type { FC } from "react";
import Fieldset from "@/components/form/fieldset";
import { useTranslation } from "react-i18next";
import WorkLogCard from "@/pageComponents/cards/WorkLogCard";
import { useJobAssignStore } from "@/configs/zustore";
import { isSameDay } from "date-fns";

const AssignedStaff: FC = () => {
    const { t } = useTranslation();
    const selectedDate = useJobAssignStore((state) => state.selectedDate);
    const currentWorkLogs = useJobAssignStore((state) => state.currentWorkLogs);

    /* update work logs when all staff changed */
    const filterWorkLogs = () => {
        if (selectedDate) {
            const workLog = currentWorkLogs.filter((work) => {
                return isSameDay(new Date(work.wl_date), selectedDate);
            });
            return workLog.length ? workLog[0].assigned_work : [];
        } else {
            return [];
        }
    };

    const scheduledWork = filterWorkLogs();

    return (
        <Fieldset
            title={t("label.assignedStaff")}
            sFieldset="col-span-full lg:col-span-5 my-2 mx-1 lg:h-[45vh] overflow-y-auto grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8 p-4"
        >
            {scheduledWork.length > 0 ? (
                scheduledWork.map((item) => {
                    return (
                        <section
                            key={item.fk_uid}
                            className="col-span-full grid grid-cols-12 gap-x-1"
                        >
                            {/* x btn */}
                            {/* <div className="col-span-1 m-auto">
                                <XBtn onClick={() => {}} />
                            </div> */}
                            {/* content */}
                            <WorkLogCard item={item} />
                        </section>
                    );
                })
            ) : (
                <span className="text-bold text-indigo-300">
                    {t("tips.noAssignedStaff")}
                </span>
            )}
        </Fieldset>
    );
};

export default AssignedStaff;
