import type { FC } from "react";
import Card from "@/components/card";

import { useTranslation } from "react-i18next";
import { Tstaff } from "@/configs/schema/staffSchema";

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
                    <b className="text-indigo-600">{t("label.client")}: </b>{" "}
                    {staff.first_name}&nbsp;{staff.last_name}
                </p>
            </div>
            <div className="col-span-2">
                <p>
                    <b className="text-indigo-600">{t("label.clientID")}: </b>{" "}
                    {staff.uid}
                </p>
            </div>
            <div className="col-span-6 sm:col-span-4">
                <p>
                    <b className="text-indigo-600">{t("label.phone1")}: </b>{" "}
                    {staff.phone}
                </p>
            </div>
            <div className="col-span-6 sm:col-span-2">
                <p>
                    <b className="text-indigo-600">{t("label.pc")}: </b>
                    {staff.postcode}
                </p>
            </div>
            <div className="col-span-6">
                <p>
                    <b className="text-indigo-600">{t("label.email1")}: </b>{" "}
                    {staff.email}
                </p>
            </div>
            <div className="col-span-6">
                <p>
                    <b className="text-indigo-600">{t("label.address")}: </b>{" "}
                    {staff.address}, {staff.suburb}, {staff.city}, {staff.state}
                    , {staff.country}
                </p>
            </div>
            <div className="col-span-2">
                <p>
                    <b className="text-indigo-600">{t("label.hr")}: </b> $
                    {staff.hr}/H
                </p>
            </div>
            <div className="col-span-2">
                <p>
                    <b className="text-indigo-600">{t("label.bsb")}: </b>{" "}
                    {staff.bsb}
                </p>
            </div>
            <div className="col-span-2">
                <p>
                    <b className="text-indigo-600">{t("label.acc")}: </b>{" "}
                    {staff.account}
                </p>
            </div>
        </Card>
    );
};

export default StaffDetailedCard;
