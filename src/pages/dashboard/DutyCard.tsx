import type { FC } from "react";
import Fieldset from "@/components/form/Fieldset";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { useTranslation } from "react-i18next";
import WorkCard from "./WorkCard";

type Tprops = {
    worklogs: TwlTableRow[];
    type?: "today" | "tomorrow";
};

const DutyCard: FC<Tprops> = ({ worklogs, type = "today" }) => {
    const { t } = useTranslation();

    if (type === "today") {
        return (
            <Fieldset
                title={t("label.todayDuty")}
                sFieldset="p-3 grid grid-cols-1 gap-y-2"
            >
                {!worklogs.length && <p>{t("tips.noDutyToday")}</p>}
                {worklogs.map((wl) => {
                    return <WorkCard key={wl.wlid} data={wl} />;
                })}
            </Fieldset>
        );
    } else {
        return (
            <Fieldset
                title={t("label.tomorrowDuty")}
                sFieldset="p-3 grid grid-cols-1 gap-y-2"
            >
                {!worklogs.length && <p>{t("tips.noDutyTomorrow")}</p>}
                {worklogs.map((wl) => {
                    return (
                        <WorkCard key={wl.wlid} data={wl} clickAble={false} />
                    );
                })}
            </Fieldset>
        );
    }
};

export default DutyCard;
