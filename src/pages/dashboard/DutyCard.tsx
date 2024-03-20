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
            sFieldset="grid grid-cols-1 w-[28vw] h-[50vh] gap-y-2 px-2 overflow-y-auto overflow-x-hidden"
        >
            {worklogs.map((wl) => {
                return <WorkCard key={wl.wlid} data={wl} />;
            })}
        </Fieldset>
    );
};

export default DutyCard;
