import { memo } from "react";
import type { FC } from "react";
import Card from "@/components/card";
import { useTranslation } from "react-i18next";
import { Tcompany } from "@/configs/schema/manageSchema";

type Tinfo = {
    company: Tcompany;
    className: string;
};

const CompanyInfo_Card: FC<Tinfo> = ({ company, className }) => {
    const { t } = useTranslation();
    return (
        <Card
            className={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 ${className}`}
        >
            <div className="col-span-full">
                <p>
                    <b className="text-indigo-600">{t("label.company")}: </b>{" "}
                    {company.name}
                </p>
            </div>
            <div className="col-span-full">
                <p>
                    <b className="text-indigo-600">{t("label.address")}: </b>{" "}
                    {company.address}
                </p>
            </div>
            <div className="col-span-full">
                <p>
                    <b className="text-indigo-600">{t("label.phone1")}: </b>{" "}
                    {company.phone}
                </p>
            </div>
            <div className="col-span-full">
                <p>
                    <b className="text-indigo-600">{t("label.email1")}: </b>
                    {company.email}
                </p>
            </div>
            <div className="col-span-1">
                <p>
                    <b className="text-indigo-600">{t("label.bld")}: </b>{" "}
                    {company.bld}
                </p>
            </div>
            <div className="col-span-1">
                <p>
                    <b className="text-indigo-600">{t("label.abn")}: </b>{" "}
                    {company.abn}
                </p>
            </div>
            <div className="col-span-1">
                <p>
                    <b className="text-indigo-600">{t("label.bsb")}: </b>{" "}
                    {company.bsb}
                </p>
            </div>
            <div className="col-span-1">
                <p>
                    <b className="text-indigo-600">{t("label.acc")}: </b>{" "}
                    {company.acc}
                </p>
            </div>
        </Card>
    );
};

const CompanyInfoCard = memo(CompanyInfo_Card);

export default CompanyInfoCard;
