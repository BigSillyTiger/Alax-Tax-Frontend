import type { ComponentPropsWithoutRef, FC } from "react";
import Fieldset from "@/components/Fieldset";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { useTranslation } from "react-i18next";
import WorkCard from "./WorkCard";

type Tprops = ComponentPropsWithoutRef<"fieldset"> & {
    worklogs: TwlTableRow[];
};

const DutyCard: FC<Tprops> = ({ worklogs, className }) => {
    const { t } = useTranslation();

    return (
        <Fieldset
            title={t("label.todayDuty")}
            sFieldset={`p-3 flex flex-col gap-y-2 overflow-y-auto overflow-x-hidden ${className}`}
        >
            {!worklogs.length && <p>{t("tips.noDutyToday")}</p>}
            {worklogs.map((wl) => {
                return <WorkCard key={wl.wlid} data={wl} />;
            })}
        </Fieldset>
    );
};

export default DutyCard;
