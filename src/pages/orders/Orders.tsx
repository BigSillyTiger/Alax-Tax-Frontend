import { FC, Suspense, useEffect } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import LoadingPage from "@/components/loadingEle";
import { Torder } from "@/configs/schema/orderSchema";
import type { Tunivers } from "@/configs/types";
import { RES_STATUS } from "@/configs/types";
import {
    MJobAssign,
    MOrderDel,
    MOrderForm,
    MOrderPay,
    MpdfMaker,
} from "@/pageComponents/modals";
import { useAtom } from "jotai";
import { atModalOpen } from "@/configs/atoms";
import { Tcompany } from "@/configs/schema/settingSchema";
import { mOpenOps } from "@/configs/utils/modal";
import { toastError, toastSuccess } from "@/lib/toaster";
import { useTranslation } from "react-i18next";
import { TstaffWPayslip } from "@/configs/schema/staffSchema";
import ErrorTips from "@/components/ErrorTips";
import MainContent from "./MainContent";

const Orders: FC = () => {
    const { t } = useTranslation();
    const actionData = useActionData() as Tresponse;
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const { allPromise } = useLoaderData() as {
        allPromise: Promise<
            [Torder[], TstaffWPayslip[], Tunivers, Tcompany, string]
        >;
    };

    useEffect(() => {
        if (!actionData) return;
        const { status } = actionData;
        switch (status) {
            case RES_STATUS.SUCCESS:
                if (modalOpen === mOpenOps.add) {
                    setModalOpen(mOpenOps.default);
                    toastSuccess(t("toastS.addOrder"));
                }
                break;
            case RES_STATUS.SUC_DEL:
                setModalOpen(mOpenOps.default);
                toastSuccess(t("toastS.delOrder"));
                break;
            case RES_STATUS.SUC_UPDATE_STATUS:
                setModalOpen(mOpenOps.default);
                toastSuccess(t("toastS.updateOrderStatus"));
                break;
            case RES_STATUS.SUC_UPDATE:
                setModalOpen(mOpenOps.default);
                toastSuccess(t("toastS.updateOrder"));
                break;
            case RES_STATUS.SUC_UPDATE_PAYMENTS:
                setModalOpen(mOpenOps.default);
                toastSuccess(t("toastS.updatePayment"));
                break;
            case RES_STATUS.SUC_UPDATE_WORKLOG:
                if (modalOpen === mOpenOps.assign) {
                    setModalOpen(mOpenOps.default);
                    toastSuccess(t("toastS.updateWorkLog"));
                }
                break;
            case RES_STATUS.FAILED:
                if (modalOpen === mOpenOps.add) {
                    toastError(t("toastF.addOrder"));
                    actionData.status = RES_STATUS.DEFAULT;
                } else if (modalOpen === mOpenOps.edit) {
                    toastError(t("toastF.updateOrder"));
                    actionData.status = RES_STATUS.DEFAULT;
                } else if (modalOpen === mOpenOps.del) {
                    toastError(t("toastF.delOrder"));
                }
                break;
            default:
                break;
        }
        actionData.status = RES_STATUS.DEFAULT;
    }, [actionData, modalOpen, setModalOpen, t]);

    return (
        <div className="container border-0">
            <Suspense fallback={<LoadingPage />}>
                <Await resolve={allPromise} errorElement={<ErrorTips />}>
                    <MainContent />
                </Await>
            </Suspense>

            {/* modals */}
            <MOrderForm />
            <MOrderDel />
            <MOrderPay />
            <MpdfMaker />
            <MJobAssign />
        </div>
    );
};

export default Orders;
