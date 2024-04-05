import type { FC } from "react";
import Fieldset from "@/components/form/fieldset";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { useTranslation } from "react-i18next";
import WorkCard from "./WorkCard";

type Tprops = {
    worklogs: TwlTableRow[];
};

const DutyCard: FC<Tprops> = ({ worklogs }) => {
    const { t } = useTranslation();

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
};

export default DutyCard;
