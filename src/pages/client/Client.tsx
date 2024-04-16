import type { FC } from "react";
import { Suspense, useEffect } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import { useAtom } from "jotai";
import LoadingPage from "@/components/loadingEle";
import type { Tclient } from "@/configs/schema/clientSchema";
import type { Torder } from "@/configs/schema/orderSchema";
import type { Tunivers } from "@/configs/types";
import { RES_STATUS } from "@/configs/types";
import { MOrderDel, MOrderForm, MOrderPay } from "@/pageComponents/modals";
import { toastError, toastSuccess } from "@/lib/toaster";
import { useTranslation } from "react-i18next";
import { Tcompany } from "@/configs/schema/settingSchema";
import { atModalOpen } from "@/configs/atoms";
import { mOpenOps } from "@/configs/utils/modal";
import { MpdfMaker } from "@/pageComponents/modals";
import ErrorTips from "@/components/ErrorTips";
import MainContent from "./MainContent";

const Client: FC = () => {
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const { allPromise } = useLoaderData() as {
        allPromise: Promise<[Tclient[], Torder[], Tunivers, Tcompany, string]>;
    };
    const actionData = useActionData() as Tresponse;

    useEffect(() => {
        if (!actionData) return;

        const { status } = actionData;

        switch (status) {
            case RES_STATUS.SUCCESS:
                if (modalOpen === mOpenOps.add) {
                    toastSuccess(t("toastS.addOrder"));
                } else if (modalOpen === mOpenOps.edit) {
                    toastSuccess(t("toastS.updateOrder"));
                }
                setModalOpen("");
                break;
            case RES_STATUS.SUC_DEL:
                setModalOpen("");
                toastSuccess(t("toastS.delOrder"));
                break;
            case RES_STATUS.SUC_UPDATE_STATUS:
                setModalOpen("");
                toastSuccess(t("toastS.updateOrderStatus"));
                break;
            case RES_STATUS.SUC_UPDATE:
                setModalOpen("");
                toastSuccess(t("toastS.updateOrder"));
                break;
            case RES_STATUS.SUC_UPDATE_PAYMENTS:
                setModalOpen("");
                toastSuccess(t("toastS.updatePayment"));
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
                    actionData.status = RES_STATUS.DEFAULT;
                }
                break;
            default:
                break;
        }

        actionData.status = RES_STATUS.DEFAULT;
    }, [actionData, modalOpen, setModalOpen, t]);

    return (
        <>
            <div className="container border-0">
                <Suspense fallback={<LoadingPage />}>
                    <Await resolve={allPromise} errorElement={<ErrorTips />}>
                        <MainContent />
                    </Await>
                </Suspense>
            </div>

            <MOrderDel />
            <MOrderForm />
            <MOrderPay />
            <MpdfMaker />
        </>
    );
};

export default Client;
