import type { FC } from "react";
import { useTranslation } from "react-i18next";
import SelectBtn from "./SelectBtn";

const Title: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="flex felx-row justify-between items-center pt-1 pb-3">
            <div className="text-xl font-bold">
                {t("label.orderPaymentPreview")}
            </div>
            <div className="border border-indigo-700 bg-indigo-400 px-4 py-1 text-slate-50 rounded-lg text-md font-bold">
                <SelectBtn />
            </div>
        </div>
    );
};
export default Title;
