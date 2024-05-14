import type { FC } from "react";
import { Suspense, useEffect } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import LoadingPage from "@/components/loadingEle";
import { toastError, toastSuccess } from "@/lib/toaster";
import { MClientDel, MClientForm } from "@/pageComponents/modals";
import { atClient, atInfoConflict, atModalOpen } from "@/configs/atoms";
import { RES_STATUS } from "@/configs/types";
import MainContent from "./MainContent";
import ErrorTips from "@/components/ErrorTips";
import { mOpenOps } from "@/configs/utils/modal";

const Clients: FC = () => {
    const { allPromise } = useLoaderData() as {
        allPromise: Promise<[Tresponse]>;
    };

    const [client, setClient] = useAtom(atClient);
    const [, setInfoConflict] = useAtom(atInfoConflict);
    const [, setModalOpen] = useAtom(atModalOpen);
    const { t } = useTranslation();

    const actionData = useActionData() as Tresponse;

    useEffect(() => {
        if (!actionData) return;
        const { status } = actionData;

        switch (status) {
            case RES_STATUS.SUCCESS: {
                // Update or add a client
                const successMessage = client.cid
                    ? t("toastS.updateClient")
                    : t("toastS.addClient");
                setInfoConflict(status);
                setModalOpen(mOpenOps.default);
                setClient(RESET);
                toastSuccess(successMessage);
                break;
            }
            case RES_STATUS.SUC_DEL:
                // Delete a client
                setModalOpen(mOpenOps.default);
                toastSuccess(t("toastS.deleteClient"));
                break;
            case RES_STATUS.FAILED_DUP_PHONE:
            case RES_STATUS.FAILED_DUP_EMAIL:
            case RES_STATUS.FAILED_DUP_P_E:
                // Duplicated register info
                setInfoConflict(status);
                toastError(t("toastS.duplicateRegistration"));
                break;
            case RES_STATUS.FAILED_DEL:
                setModalOpen(mOpenOps.default);
                toastError(t("toastF.deleteClient"));
                break;
            case RES_STATUS.FAILED:
                setModalOpen(mOpenOps.default);
                toastError(t("toastF.responseFailed"));
                break;
            default:
                break;
        }

        // set status to default, in case the stale value interfere the next action
        actionData.status = RES_STATUS.DEFAULT;
    }, [actionData, client.cid, setClient, setInfoConflict, setModalOpen, t]);

    return (
        <div className="container border-0">
            <Suspense fallback={<LoadingPage />}>
                <Await resolve={allPromise} errorElement={<ErrorTips />}>
                    {(result) => {
                        const [clientList] = result;
                        return <MainContent clients={clientList.data} />;
                    }}
                </Await>
            </Suspense>

            {/* Modal for add new client, and this modal can not be insert into Await*/}
            {/* otherwise, the animation would get lost*/}
            <MClientDel />
            <MClientForm />
        </div>
    );
};

export default Clients;
