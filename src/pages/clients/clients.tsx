import React, { Suspense, useState, useEffect } from "react";
import type { FC, TouchEvent, MouseEvent } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoadingPage from "@/components/loadingEle";
import ClientTable from "./tables/tableClients.tsx";
import clientColumns from "./tables/defClients.tsx";
import Card from "@/components/card";
import { Tresponse } from "@/utils/types";
import { toastError, toastSuccess } from "@/utils/utils";
import { RES_STATUS } from "@/utils/types";
import { Tclient } from "@/utils/schema/clientSchema.ts";
import MClientDel from "./modals/mClientDel";
import MClientForm from "./modals/mClientForm.tsx";

type Tprops = {
    clients: Tclient[] | null;
};

type TisConflict =
    | RES_STATUS.SUCCESS
    | RES_STATUS.FAILED_DUP_PHONE
    | RES_STATUS.FAILED_DUP_EMAIL
    | RES_STATUS.FAILED_DUP_P_E;

const initClient = {
    client_id: -1,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    suburb: "",
    city: "",
    state: "",
    country: "",
    postcode: "",
};

const Clients: FC = () => {
    const [client, setClient] = useState<Tclient>(initClient);
    const [clientDel, setClientDel] = useState<Tclient>(initClient);
    const [infoConflict, setInfoConflict] = useState<TisConflict>(
        RES_STATUS.SUCCESS
    );
    const { t } = useTranslation();
    const { clients } = useLoaderData() as {
        clients: Tclient[] | null;
    };
    const actionData = useActionData() as Tresponse;

    useEffect(() => {
        /* close modals if RES_STATUS.SUCCESS  */
        if (actionData?.status === RES_STATUS.SUCCESS) {
            setInfoConflict(actionData?.status);
            if (client.client_id === 0) {
                //setAddNewOpen(false);
                setClient(initClient);
                toastSuccess("Registered a new client");
            } else if (client.client_id > 0) {
                //setClientEdit(initClient);
                setClient(initClient);
                toastSuccess("Updated client informaton");
            }
        } else if (
            //actionData?.status &&
            actionData?.status === RES_STATUS.SUC_DEL
        ) {
            // delete a client
            toastSuccess("Deleted a client");
        } else {
            setInfoConflict(
                actionData?.status as
                    | RES_STATUS.FAILED_DUP_PHONE
                    | RES_STATUS.FAILED_DUP_EMAIL
                    | RES_STATUS.FAILED_DUP_P_E
            );
            toastError("Email or Phone already existed");
        }
    }, [actionData]);

    const handleAddeNew = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        setClient({ ...initClient, client_id: 0 });
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
                                onClick={handleAddeNew}
                            >
                                {t("pClients.btn.addClient")}
                            </button>
                        </div>
                    </div>
                    {/* table */}
                    {clients ? (
                        <Card className="mt-8">
                            <ClientTable
                                data={clients}
                                columns={clientColumns}
                                clickEdit={setClient}
                                clickDel={setClientDel}
                            />
                        </Card>
                    ) : (
                        <Card className="mt-8">
                            <span className="m-5 p-5  text-center h-15">
                                {t("pClients.text.noClient")}
                            </span>
                        </Card>
                    )}
                </div>
            </>
        );
    };

    return (
        <div className="container mx-auto border-0">
            <Suspense fallback={<LoadingPage />}>
                <Await resolve={clients}>
                    {(clientList) => {
                        return <ClientTableContent clients={clientList.data} />;
                    }}
                </Await>
            </Suspense>

            {/* Modal for add new client, and this modal can not be insert into Await*/}
            {/* otherwise, the animation would get lost*/}
            <MClientDel client={clientDel} setOpen={setClientDel} />
            <MClientForm
                client={client}
                setOpen={setClient}
                isConflict={infoConflict}
                setConflict={setInfoConflict}
            />
        </div>
    );
};

export default Clients;
