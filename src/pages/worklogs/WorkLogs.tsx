import type { FC } from "react";
import { Suspense, useEffect } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import LoadingPage from "@/components/loadingEle";
import { useTranslation } from "react-i18next";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { atModalOpen } from "@/configs/atoms";
import { useAtom } from "jotai";
import MJobEdit from "@/pageComponents/modals/mJobEdit/mJobEdit";
import { RES_STATUS } from "@/configs/types";
import { mOpenOps } from "@/configs/utils/modal";
import { toastError, toastSuccess } from "@/lib/toaster";
import MWorkLogDel from "@/pageComponents/modals/mWorkLogDel";
import ErrorTips from "@/components/ErrorTips";
import MainContent from "./MainContent";
import PageWrapper from "@/components/PageWrapper";

const WorkLogs: FC = () => {
    const { t } = useTranslation();
    const { allPromise } = useLoaderData() as {
        allPromise: Promise<[TwlTableRow[]]>;
    };

    const actionData = useActionData() as Tresponse;

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
            case RES_STATUS.SUC_DELETE_WORKLOG:
                setModalOpen(mOpenOps.default);
                toastSuccess(t("toastS.delWorkLog"));
                break;
            case RES_STATUS.FAILED_DEL_WORKLOG:
                setModalOpen(mOpenOps.default);
                toastError(t("toastF.delWorkLog"));
                break;
            case RES_STATUS.FAILED_DEL:
                setModalOpen(mOpenOps.default);
                toastError(t("toastF.delWorkLog"));
                break;
            case RES_STATUS.FAILED:
                setModalOpen(mOpenOps.default);
                toastError(t("toastF.responseFailed"));
                break;
            default:
                break;
        }
        actionData.status = RES_STATUS.DEFAULT;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actionData, modalOpen]);

    return (
        <>
            <PageWrapper>
                <Suspense fallback={<LoadingPage />}>
                    <Await resolve={allPromise} errorElement={<ErrorTips />}>
                        <MainContent />
                    </Await>
                </Suspense>
            </PageWrapper>

            {/* modals */}
            <MJobEdit />
            <MWorkLogDel />
        </>
    );
};

export default WorkLogs;
