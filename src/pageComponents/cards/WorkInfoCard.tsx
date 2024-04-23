import type { ComponentPropsWithoutRef } from "react";
import { useTranslation } from "react-i18next";
import { TwlTableRow } from "@/configs/schema/workSchema";
import Fieldset from "@/components/Fieldset";
import {
    IdentificationIcon,
    HomeModernIcon,
    CalendarDaysIcon,
} from "@heroicons/react/24/outline";

import SingleField from "@/components/SingleField";

type Tprops = ComponentPropsWithoutRef<"div"> & { work: TwlTableRow };

const WorkInfoCard = ({ work, className }: Tprops) => {
    const { t } = useTranslation();
    return (
        <Fieldset
            title={t("label.workInfo")}
            sFieldset={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 pl-3 pr-5 pb-3 ${className}`}
        >
            <SingleField
                label={<IdentificationIcon />}
                content={work.wlid}
                outClass="col-span-full"
                spanClass="font-semibold"
            />
            <SingleField
                label={<HomeModernIcon />}
                content={
                    work.address +
                    ", " +
                    work.suburb +
                    ", " +
                    work.city +
                    ", " +
                    work.state +
                    ", " +
                    work.postcode
                }
                outClass="col-span-full"
                spanClass="font-semibold"
            />
            <SingleField
                label={<CalendarDaysIcon />}
                content={work.wl_date}
                outClass="col-span-full"
                spanClass="font-semibold"
            />
        </Fieldset>
    );
};

export default WorkInfoCard;
