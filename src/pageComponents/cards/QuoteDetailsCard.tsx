import Label from "@/components/Label";
import { Input } from "@/components/ui/input";
import { calculateExpiryDate, dateFormat, isDateExpired } from "@/lib/time";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type Tprops = {
    deposit: number;
    valid: number;
    date: string;
};

/**
 * @description this component display quote relatec details
 * @returns
 */
const QuoteDetailsCard: FC<Tprops> = ({ deposit, valid, date }) => {
    const { t } = useTranslation();
    const isExpired = isDateExpired(date, valid);
    return (
        <div className="flex flex-row justify-evenly items-center h-full">
            <div>
                <Label htmlFor="Qdate">{t("label.quoteDate")}</Label>
                <Input id="Qdate" readOnly value={date} />
            </div>
            <div>
                <Label htmlFor="Qvalid">{t("label.quoteValid")}</Label>
                <Input id="Qvalid" readOnly value={valid} />
            </div>
            <div>
                <Label htmlFor="Qexpiry">{t("label.expiredDate")}</Label>
                <Input
                    id="Qdeposit"
                    readOnly
                    value={dateFormat(calculateExpiryDate(date, valid))}
                    className={`${isExpired ? "text-red-500" : ""}`}
                />
            </div>
            <div>
                <Label htmlFor="Qdeposit">{t("label.deposit")}</Label>
                <Input id="Qdeposit" readOnly value={deposit} />
            </div>
        </div>
    );
};

export default QuoteDetailsCard;
