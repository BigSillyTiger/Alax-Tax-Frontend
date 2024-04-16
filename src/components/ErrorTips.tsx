import type { FC } from "react";
import Card from "./card";
import { useAsyncError } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ErrorTips: FC = () => {
    const [t] = useTranslation();
    const error = useAsyncError();
    console.log("---> Error EL Tips:", error);
    return <Card>{t("tips.errorTips")}</Card>;
};

export default ErrorTips;
