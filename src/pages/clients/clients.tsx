import React, { Suspense, useState, useEffect } from "react";
import type { FC, TouchEvent, MouseEvent } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";

import LoadingPage from "@/components/loadingEle";
import ClientTable from "./tables/clientTable";
import clientColumns from "./tables/clientColumnDefs";
import Card from "@/components/card";
import { Tresponse } from "@/utils/types";
import { toastError, toastSuccess } from "@/utils/utils";

import { Tclient } from "@/utils/schema/client";
import MClientInfo from "./modals/mClientInfo.tsx";
import MClientAdd from "./modals/mClientAdd";
import MClientDel from "./modals/mClientDel";
import MClientEdit from "./modals/mClientEdit.tsx";
import { RES_STATUS } from "@/utils/types";

type Tprops = {
    clients: Tclient[] | null;
};

type TisConflict =
    | RES_STATUS.SUCCESS
    | RES_STATUS.FAILED_DUP_PHONE
    | RES_STATUS.FAILED_DUP_EMAIL
    | RES_STATUS.FAILED_DUP_P_E;

const initClient = {
    client_id: 0,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postcode: "",
};

const Clients: FC = () => {
    const [addNewOpen, setAddNewOpen] = useState(false);
    const [clientInfo, setClientInfo] = useState<Tclient | null>(null);
    const [clientEdit, setClientEdit] = useState<Tclient>(initClient);
    const [clientDel, setClientDel] = useState<Tclient>(initClient);
    const [infoConflict, setInfoConflict] = useState<TisConflict>(
        RES_STATUS.SUCCESS
    );
    const { clients } = useLoaderData() as {
        clients: Tclient[] | null;
    };
    const actionData = useActionData() as Tresponse;

    useEffect(() => {
        /* close modals if RES_STATUS.SUCCESS  */
        if (actionData?.status === RES_STATUS.SUCCESS) {
            if (addNewOpen) {
                setAddNewOpen(false);
                toastSuccess("Registered a new client");
            } else if (clientEdit.client_id) {
                setClientEdit(initClient);
                toastSuccess("Updated client informaton");
            }
        } else if (
            actionData?.status &&
            actionData?.status === RES_STATUS.SUC_DEL_SINGLE
        ) {
            // delete a client
            toastSuccess("Deleted a client");
        } else if (
            actionData?.status &&
            actionData?.status !== RES_STATUS.SUCCESS
        ) {
            setInfoConflict(
                actionData?.status as
                    | RES_STATUS.FAILED_DUP_PHONE
                    | RES_STATUS.FAILED_DUP_EMAIL
                    | RES_STATUS.FAILED_DUP_P_E
            );
            toastError("Email or Phone already existed");
        }
    }, [actionData]);

    useEffect(() => {
        !addNewOpen && setInfoConflict(200);
    }, [addNewOpen]);

    const handleAddeNew = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        setAddNewOpen(true);
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
                                Add New Client
                            </button>
                        </div>
                    </div>
                    {/* table */}
                    {clients ? (
                        <Card className="mt-8">
                            <ClientTable
                                data={clients}
                                columns={clientColumns}
                                clickEdit={setClientEdit}
                                clickDel={setClientDel}
                            />
                        </Card>
                    ) : (
                        <Card className="mt-8">
                            <span className="m-5 p-5  text-center h-15">
                                No Client Content
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
            <MClientAdd
                open={addNewOpen}
                setOpen={setAddNewOpen}
                isConflict={infoConflict}
            />
            <MClientInfo client={clientInfo} setOpen={setClientInfo} />
            <MClientDel client={clientDel} setOpen={setClientDel} />
            <MClientEdit
                client={clientEdit}
                setOpen={setClientEdit}
                isConflict={infoConflict}
            />
        </div>
    );
};

export default Clients;
