import type { ComponentPropsWithoutRef } from "react";
import { useTranslation } from "react-i18next";
import { TwlTableRow } from "@/configs/schema/workSchema";
import Fieldset from "@/components/Fieldset";
import {
    IdentificationIcon,
    HomeIcon,
    CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import SingleField from "@/components/SingleField";
import { Textarea } from "@/components/ui/textarea";
import { useJobWLStore } from "@/configs/zustore/jobWLStore";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

type Tprops = ComponentPropsWithoutRef<"div"> & {
    work: TwlTableRow;
    editable?: boolean;
};

const WorkInfoCard = ({ work, className, editable = false }: Tprops) => {
    const { t } = useTranslation();
    const wlNote = useJobWLStore((state) => state.wlNote);
    const setWlNote = useJobWLStore((state) => state.setWlNote);

    return (
        <Fieldset
            title={t("label.workInfo")}
            sFieldset={`grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6${className}`}
        >
            <SingleField
                label={<IdentificationIcon />}
                outClass="col-span-full"
                spanClass="font-semibold"
            >
                {work.wlid}
            </SingleField>
            <SingleField
                label={<HomeIcon />}
                outClass="col-span-full"
                spanClass="font-semibold"
            >
                {work.address +
                    ", " +
                    work.suburb +
                    ", " +
                    work.city +
                    ", " +
                    work.state +
                    ", " +
                    work.postcode}
            </SingleField>
            <SingleField
                label={<CalendarDaysIcon />}
                outClass="col-span-full"
                spanClass="font-semibold"
            >
                {work.wl_date}
            </SingleField>
            <SingleField
                label={<ExclamationCircleIcon />}
                outClass="col-span-full"
                spanClass="font-semibold w-full"
            >
                <Textarea
                    disabled={!editable}
                    className="w-full text-md"
                    value={wlNote}
                    onChange={(e) => setWlNote(e.target.value)}
                />
            </SingleField>
        </Fieldset>
    );
};

export default WorkInfoCard;
