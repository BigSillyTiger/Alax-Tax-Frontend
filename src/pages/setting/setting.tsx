import type { FC } from "react";
import { Suspense, useEffect } from "react";
import LoadingPage from "@/components/loadingEle";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import { Tunivers } from "@/configs/types";
import { Tcompany } from "@/configs/schema/settingSchema";
import { toastError, toastSuccess } from "@/lib/toaster";
import { useTranslation } from "react-i18next";
import { RES_STATUS } from "@/configs/types";
import ErrorTips from "@/components/ErrorTips";
import MainContent from "./MainContent";

const Setting: FC = () => {
    const { allPromise } = useLoaderData() as {
        allPromise: Promise<[Tunivers, Tcompany, string]>;
    };
    /* const { univers, company, logo } = useLoaderData() as {
        univers: Tunivers | null;
        company: Tcompany | null;
        logo: string;
    }; */
    const { t } = useTranslation();
    const actionData = useActionData() as Tresponse;

    useEffect(() => {
        if (!actionData) return;

        const { status } = actionData;

        switch (status) {
            case RES_STATUS.SUC_UPDATE_COMPANY:
                toastSuccess(t("toastS.updateCompany"));
                break;
            case RES_STATUS.SUC_ADD_NEW_SU:
                toastSuccess(t("toastS.addedNewSU"));
                break;
            case RES_STATUS.FAILED_ADD_NEW_SU:
                toastError(t("toastE.addedNewSU"));
                break;
            case RES_STATUS.FAILED_TOO_LARGE:
                toastError(t("toastF.fileTooLarge"));
                break;
            default:
                break;
        }
        actionData.status = RES_STATUS.DEFAULT;
    }, [actionData, t]);

    return (
        <div className="container border-0">
            <Suspense fallback={<LoadingPage />}>
                <Await resolve={allPromise} errorElement={<ErrorTips />}>
                    <MainContent />
                </Await>
            </Suspense>
        </div>
    );
};

export default Setting;
