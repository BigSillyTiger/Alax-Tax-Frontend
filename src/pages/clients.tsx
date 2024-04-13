import { Suspense, useEffect } from "react";
import type { FC, TouchEvent, MouseEvent } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import LoadingPage from "@/components/loadingEle";
import clientColumns from "@/configs/columnDefs/defClients.tsx";
import Card from "@/components/card";
import { toastError, toastSuccess } from "@/lib/toaster";
import { Tclient } from "@/configs/schema/clientSchema.ts";
import { PTable } from "@/components/table";
import { MClientDel, MClientForm } from "@/pageComponents/modals";
import { atClient, atInfoConflict, atModalOpen } from "@/configs/atoms";
import { RES_STATUS } from "@/configs/types";

type Tprops = {
    clients: Tclient[] | null;
};

const Clients: FC = () => {
    const [client, setClient] = useAtom(atClient);
    const [, setInfoConflict] = useAtom(atInfoConflict);
    const [, setModalOpen] = useAtom(atModalOpen);
    const { t } = useTranslation();
    const { clients } = useLoaderData() as {
        clients: Tclient[] | null;
    };
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
                setModalOpen("");
                setClient(RESET);
                toastSuccess(successMessage);
                break;
            }
            case RES_STATUS.SUC_DEL:
                // Delete a client
                setModalOpen("");
                toastSuccess(t("toastS.deleteClient"));
                break;
            case RES_STATUS.FAILED_DUP_PHONE:
            case RES_STATUS.FAILED_DUP_EMAIL:
            case RES_STATUS.FAILED_DUP_P_E:
                // Duplicated register info
                setInfoConflict(status);
                toastError(t("toastS.duplicateRegistration"));
                break;
            default:
                break;
        }

        // set status to default, in case the stale value interfere the next action
        actionData.status = RES_STATUS.DEFAULT;
    }, [actionData, client.cid, setClient, setInfoConflict, setModalOpen, t]);

    const handleAddNew = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        setClient(RESET);
        setModalOpen("Add");
    };

    const ClientTableContent: FC<Tprops> = ({ clients }) => {
        return (
            <>
                <div className="px-4 sm:px-6 lg:px-8 top-0">
                    {/* header area */}
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto sm:flex"></div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={handleAddNew}
                            >
                                {t("btn.addClient")}
                            </button>
                        </div>
                    </div>
                    {/* table */}
                    {clients ? (
                        <Card className="mt-8">
                            <PTable
                                search={true}
                                hFilter={true}
                                data={clients}
                                columns={clientColumns}
                                menuOptions={{ edit: true, del: true }}
                                setData={setClient}
                                cnSearch="my-3"
                                cnTable={`h-[65dvh]`}
                                cnHead="sticky z-10 bg-indigo-300"
                                cnTh="py-3"
                            />
                        </Card>
                    ) : (
                        <Card className="mt-8">
                            <span className="m-5 p-5  text-center h-15">
                                {t("pageText.noClient")}
                            </span>
                        </Card>
                    )}
                </div>
            </>
        );
    };

    return (
        <div className="container border-0">
            <Suspense fallback={<LoadingPage />}>
                <Await resolve={clients}>
                    {(clientList) => {
                        return <ClientTableContent clients={clientList.data} />;
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
