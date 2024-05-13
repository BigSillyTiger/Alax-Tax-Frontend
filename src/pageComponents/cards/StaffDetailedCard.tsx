import type { FC } from "react";
import Card from "@/components/Card";

import { useTranslation } from "react-i18next";
import { Tstaff } from "@/configs/schema/staffSchema";
import { Btext } from "@/components/Btext";

type Tprops = {
    staff: Partial<Tstaff>;
    className?: string;
};

const StaffDetailedCard: FC<Tprops> = ({ staff, className = "" }) => {
    const { t } = useTranslation();

    return (
        <Card
            className={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 ${className}`}
        >
            <div className="col-span-4">
                <p>
                    <Btext>{t("label.client")}: </Btext> {staff.first_name}
                    &nbsp;{staff.last_name}
                </p>
            </div>
            <div className="col-span-2">
                <p>
                    <Btext>{t("label.clientID")}: </Btext> {staff.uid}
                </p>
            </div>
            <div className="col-span-6 sm:col-span-4">
                <p>
                    <Btext>{t("label.phone1")}: </Btext> {staff.phone}
                </p>
            </div>
            <div className="col-span-6 sm:col-span-2">
                <p>
                    <Btext>{t("label.pc")}: </Btext>
                    {staff.postcode}
                </p>
            </div>
            <div className="col-span-6">
                <p>
                    <Btext>{t("label.email1")}: </Btext> {staff.email}
                </p>
            </div>
            <div className="col-span-6">
                <p>
                    <Btext>{t("label.address")}: </Btext> {staff.address},{" "}
                    {staff.suburb}, {staff.city}, {staff.state}, {staff.country}
                </p>
            </div>
            <div className="col-span-2">
                <p>
                    <Btext>{t("label.hr")}: </Btext> ${staff.hr}/H
                </p>
            </div>
            <div className="col-span-2">
                <p>
                    <Btext>{t("label.bsb")}: </Btext> {staff.bsb}
                </p>
            </div>
            <div className="col-span-2">
                <p>
                    <Btext>{t("label.acc")}: </Btext> {staff.account}
                </p>
            </div>
        </Card>
    );
};

export default StaffDetailedCard;
