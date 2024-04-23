import type { ComponentPropsWithoutRef } from "react";
import { Amail, Atel } from "@/components/aLinks";
import { useTranslation } from "react-i18next";
import { TwlTableRow } from "@/configs/schema/workSchema";
import Fieldset from "@/components/Fieldset";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import SingleField from "@/components/SingleField";

type Tprops = ComponentPropsWithoutRef<"div"> & { staff: TwlTableRow };

const StaffCard = ({ staff, className }: Tprops) => {
    const { t } = useTranslation();
    return (
        <Fieldset
            title={t("label.staffInfo")}
            sFieldset={`m-3 px-4 flex flex-col gap-x-6 gap-y-2 ${className}`}
        >
            <div className="flex justify-evenly">
                <span className="font-bold text-lg">
                    {staff.first_name + " " + staff.last_name}
                </span>
                <span>{staff.fk_uid}</span>
            </div>

            <SingleField
                label={<PhoneIcon />}
                content={<Atel href={staff.phone} />}
                outClass=""
                spanClass="font-semibold"
            />
            <SingleField
                label={<EnvelopeIcon />}
                content={<Amail href={staff.email} />}
                outClass=""
                spanClass="font-semibold"
            />
        </Fieldset>
    );
};

export default StaffCard;
