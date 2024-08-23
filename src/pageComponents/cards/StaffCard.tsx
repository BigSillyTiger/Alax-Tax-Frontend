import type { ComponentPropsWithoutRef } from "react";
import { Amail, Atel } from "@/components/aLinks";
import { useTranslation } from "react-i18next";
import Fieldset from "@/components/Fieldset";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import SingleField from "@/components/SingleField";
import { Tstaff } from "@/configs/schema/staffSchema";

type Tprops = ComponentPropsWithoutRef<"div"> & { staff: Tstaff };

const StaffCard = ({ staff, className }: Tprops) => {
    const { t } = useTranslation();
    return (
        <Fieldset
            title={t("label.staffInfo")}
            sFieldset={`flex flex-col gap-x-6 gap-y-2 ${className}`}
        >
            <div className="flex justify-evenly">
                <span className="font-bold text-lg">
                    {staff.first_name + " " + staff.last_name}
                </span>
                <span>{staff.uid}</span>
            </div>

            <SingleField
                label={<PhoneIcon />}
                outClass=""
                spanClass="font-semibold"
            >
                <Atel href={staff.phone} />
            </SingleField>
            <SingleField
                label={<EnvelopeIcon />}
                outClass=""
                spanClass="font-semibold"
            >
                <Amail href={staff.email} />
            </SingleField>
        </Fieldset>
    );
};

export default StaffCard;
