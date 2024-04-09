import i18n from "@/configs/i18n";
import { TitemContent } from "@/configs/types";
import DeductionCard from "@/pageComponents/modals/mJobEdit/DeductionCard";
import WorkHoursCard from "@/pageComponents/modals/mJobEdit/WorkHoursCard";

export const tabsContent = () => {
    const items = [] as TitemContent[];

    items.push({
        title: i18n.t("label.workHours"),
        content: <WorkHoursCard className="col-span-full h-[25dvh]" />,
    });

    items.push({
        title: i18n.t("label.deduction"),
        content: <DeductionCard className="col-span-full" />,
    });

    return items;
};
