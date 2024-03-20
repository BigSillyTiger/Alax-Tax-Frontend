import type { ComponentPropsWithoutRef } from "react";
import { useTranslation } from "react-i18next";
import { TwlTableRow } from "@/configs/schema/workSchema";
import Fieldset from "@/components/form/fieldset";

type Tprops = ComponentPropsWithoutRef<"div"> & { work: TwlTableRow };

const WorkInfoCard = ({ work, className }: Tprops) => {
    const { t } = useTranslation();
    return (
        <Fieldset
            title={t("label.workInfo")}
            sFieldset={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 pl-3 pr-5 pb-3 ${className}`}
        >
            <div className="col-span-full">
                <span>{t("label.wlID") + ": "}</span>
                <span className="font-semibold">{work.wlid}</span>
            </div>
            <div className="col-span-full">
                <span className="">{t("label.addr") + ": "}</span>
                <span className="font-semibold">
                    {work.address +
                        ", " +
                        work.suburb +
                        ", " +
                        work.city +
                        ", " +
                        work.state +
                        ", " +
                        work.postcode}
                </span>
            </div>
            <div className="col-span-full">
                <span>{t("label.date") + ": "}</span>
                <span className="font-semibold">{work.wl_date}</span>
            </div>
        </Fieldset>
    );
};

export default WorkInfoCard;
