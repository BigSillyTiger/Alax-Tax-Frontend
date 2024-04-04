import type { ComponentPropsWithoutRef } from "react";
import UserIcon from "@/components/UserIcon";
import { Amail, Atel } from "@/components/aLinks";
import { useTranslation } from "react-i18next";
import { Tstaff } from "@/configs/schema/staffSchema";
import Card from "@/components/card";

type Tprops = ComponentPropsWithoutRef<"div"> & { staff: Tstaff };

const StaffDetailCard = ({ staff, className }: Tprops) => {
    const { t } = useTranslation();
    return (
        /* sm: 8 col */
        <Card
            className={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-8 pl-3 pr-5 pb-3 ${className}`}
        >
            <div className="col-span-5 row-span-1">
                <span className="font-bold text-lg">
                    {staff.first_name + " " + staff.last_name}
                </span>
                <span>{" - " + staff.uid}</span>
            </div>
            <div className="col-span-3">
                {t("label.hr") + ": "}
                <span>${staff.hr}/h</span>
            </div>
            <div className="col-span-full row-span-1">
                {t("label.tel") + ": "}
                <Atel href={staff.phone} />
            </div>
            <div className="col-span-full row-span-1">
                {t("label.email1") + ": "}
                <Amail href={staff.email} />
            </div>
            <div className="col-span-full row-span-1">
                {t("label.address") + ": "}
                {staff.address + ", " + staff.suburb + ", " + staff.city}
            </div>
        </Card>
    );
};

export default StaffDetailCard;
