import Fieldset from "@/components/form/fieldset";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { XBtn } from "@/components/btns";
import { useAtom } from "jotai";
import { atWorkLogs } from "@/configs/atoms";
import WorkLogCard from "@/pageComponents/cards/WorkLogCard";

const AssignedStaff: FC = () => {
    const { t } = useTranslation();
    //const { selectedDate } = useAtom(atSelectedDate);
    const [workLogs, setWorkLogs] = useAtom(atWorkLogs);
    const scheduledWork = workLogs[0].assigned_work;
    console.log("-->test content assign: ", scheduledWork);

    return (
        <Fieldset
            title={t("label.assignedStaff")}
            sFieldset="col-span-full lg:col-span-5 my-2 mx-1 lg:h-[45vh] overflow-y-auto grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8 p-4"
        >
            {scheduledWork ? (
                scheduledWork.map((item, index) => {
                    return (
                        <section
                            key={item.fk_uid}
                            className="col-span-full grid grid-cols-12 gap-x-1"
                        >
                            {/* x btn */}
                            <div className="col-span-1 m-auto">
                                <XBtn onClick={() => {}} />
                            </div>
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
