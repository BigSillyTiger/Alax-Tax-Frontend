import type { ComponentPropsWithoutRef } from "react";
import UserIcon from "@/components/UserIcon";
import { Amail, Atel } from "@/components/aLinks";
import { useTranslation } from "react-i18next";
import { TwlTableRow } from "@/configs/schema/workSchema";
import Fieldset from "@/components/form/fieldset";

type Tprops = ComponentPropsWithoutRef<"div"> & { staff: TwlTableRow };

const StaffCard = ({ staff, className }: Tprops) => {
    const { t } = useTranslation();
    return (
        <Fieldset
            title={t("label.staffInfo")}
            sFieldset={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 pl-3 pr-5 pb-3 ${className}`}
        >
            <div className="col-span-2 row-span-3 m-auto">
                <UserIcon
                    fName={staff.first_name}
                    lName={staff.last_name}
                    size="lg"
                />
            </div>
            <div className="col-span-4 row-span-1">
                <span className="font-bold text-lg">
                    {staff.first_name + " " + staff.last_name}
                </span>
                <span>{" - " + staff.fk_uid}</span>
            </div>
            <div className="col-span-4 row-span-1">
                {t("label.tel") + ": "}
                <Atel href={staff.phone} />
            </div>
            <div className="col-span-4 row-span-1">
                {t("label.email1") + ": "}
                <Amail href={staff.email} />
            </div>
        </Fieldset>
    );
};

export default StaffCard;
