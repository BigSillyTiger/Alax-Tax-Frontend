import type { FC } from "react";
import { Suspense, useEffect } from "react";
import { Await, useActionData, useLoaderData } from "react-router-dom";
import SpinningEle from "@/components/loadingEle/SpinningEle";
import MTimeTracker from "@/pageComponents/modals/mTimeTracker";
import { RES_STATUS } from "@/configs/types";
import { atModalOpen } from "@/configs/atoms";
import { useAtom } from "jotai";
import { mOpenOps } from "@/configs/utils/modal";
import { toastError, toastSuccess } from "@/lib/toaster";
import { useTranslation } from "react-i18next";
import ErrorTips from "@/components/ErrorTips";
import MainContent from "./MainContent";
import { TwlTableRow } from "@/configs/schema/workSchema";
import PageWrapper from "@/components/PageWrapper";

const Dashboard: FC = () => {
    const { t } = useTranslation();
    const actionData = useActionData() as Tresponse;
    const { allPromise } = useLoaderData() as {
        allPromise: Promise<[TwlTableRow[], TwlTableRow[]]>;
    };
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);

    useEffect(() => {
        if (!actionData) return;

        const { status } = actionData;
        switch (status) {
            case RES_STATUS.SUC_UPDATE_WORKLOG:
                if (modalOpen === mOpenOps.edit) {
                    setModalOpen(mOpenOps.default);
                    toastSuccess(t("toastS.updateWL"));
                }
                break;
            case RES_STATUS.FAILED_UPDATE_WORKLOG:
                if (modalOpen === mOpenOps.edit) {
                    setModalOpen(mOpenOps.default);
                    toastError(t("toastF.updateWL"));
                }
                break;
            default:
                break;
        }

        actionData.status = RES_STATUS.DEFAULT;
    }, [actionData, modalOpen, setModalOpen, t]);

    return (
        <PageWrapper>
            <Suspense fallback={<SpinningEle />}>
                <Await resolve={allPromise} errorElement={<ErrorTips />}>
                    <MainContent />
                </Await>
            </Suspense>

            {/* modals */}
            <MTimeTracker />
        </PageWrapper>
    );
};

export default Dashboard;
