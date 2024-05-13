import { memo } from "react";
import type { FC } from "react";
import Card from "@/components/Card";
import { useTranslation } from "react-i18next";
import { Tcompany } from "@/configs/schema/settingSchema";
import { Btext } from "@/components/Btext";

type Tinfo = {
    company: Tcompany;
    className: string;
};

const CompanyInfoCard: FC<Tinfo> = memo(({ company, className }) => {
    const { t } = useTranslation();
    return (
        <Card
            className={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 ${className}`}
        >
            <div className="col-span-full">
                <p>
                    <Btext>{t("label.company")}: </Btext> {company.name}
                </p>
            </div>
            <div className="col-span-full">
                <p>
                    <Btext>{t("label.address")}: </Btext> {company.address}
                </p>
            </div>
            <div className="col-span-full">
                <p>
                    <Btext>{t("label.phone1")}: </Btext> {company.phone}
                </p>
            </div>
            <div className="col-span-full">
                <p>
                    <Btext>{t("label.email1")}: </Btext>
                    {company.email}
                </p>
            </div>
            <div className="col-span-1">
                <p>
                    <Btext>{t("label.bld")}: </Btext> {company.bld}
                </p>
            </div>
            <div className="col-span-1">
                <p>
                    <Btext>{t("label.abn")}: </Btext> {company.abn}
                </p>
            </div>
            <div className="col-span-1">
                <p>
                    <Btext>{t("label.bsb")}: </Btext> {company.bsb}
                </p>
            </div>
            <div className="col-span-1">
                <p>
                    <Btext>{t("label.acc")}: </Btext> {company.acc}
                </p>
            </div>
        </Card>
    );
});

export default CompanyInfoCard;
