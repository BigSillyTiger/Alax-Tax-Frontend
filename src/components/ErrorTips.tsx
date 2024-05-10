import type { FC } from "react";
import Card from "./Card";
import { useAsyncError, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Nbtn } from "./btns";

const ErrorTips: FC = () => {
    const { t } = useTranslation();
    const nevigate = useNavigate();
    const error = useAsyncError();
    console.log("---> Error Tips Page:", error);
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <Card className="flex flex-col justify-center items-center">
                <p className="text-lg font-bold">{t("tips.errorTips")}</p>
                <Nbtn
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        return nevigate("/login", { replace: true });
                    }}
                >
                    {t("btn.goToLogin")}
                </Nbtn>
            </Card>
            ;
        </div>
    );
};

export default ErrorTips;
