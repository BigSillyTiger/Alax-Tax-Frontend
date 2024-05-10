import type { FC } from "react";
import Card from "./Card";
import { useAsyncError, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ErrorTips: FC = () => {
    const { t } = useTranslation();
    const nevigate = useNavigate();
    const error = useAsyncError();
    console.log("---> Error Tips Page:", error);
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <Card className="flex flex-col justify-center items-center">
                <p className="text-lg font-bold">{t("tips.errorTips")}</p>
                <button
                    type="button"
                    className="w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={(e) => {
                        e.preventDefault();
                        return nevigate("/login", { replace: true });
                    }}
                >
                    {t("btn.goToLogin")}
                </button>
            </Card>
            ;
        </div>
    );
};

export default ErrorTips;
