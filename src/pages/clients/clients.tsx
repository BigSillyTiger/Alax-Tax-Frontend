import React, { Suspense, useState, useEffect } from "react";
import type { FC, TouchEvent, MouseEvent } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";

import LoadingPage from "@/components/loadingEle";
import {
    VirtualTable as VTable,
    PaginatedTable as PTable,
} from "@/components/table";
import clientColumns from "./clientColumnDefs";
import Card from "@/components/card";
import MAddNewClient from "./modals/mAddNewClient";
import { Tresponse } from "@/configs/types";
import { toastError, toastSuccess } from "@/configs/utils";

import { TclientView } from "@/configs/schema/client";
import MClientInfo from "./modals/mClient";
import MDelete from "@/pages/clients/modals/mDelete";
import MUpdateClient from "./modals/mUpdateClient";
import { RES_STATUS } from "@/configs/types";

type Tprops = {
    clients: TclientView[] | null;
};

type TisConflict =
    | RES_STATUS.SUCCESS
    | RES_STATUS.FAILED_DUP_PHONE
    | RES_STATUS.FAILED_DUP_EMAIL
    | RES_STATUS.FAILED_DUP_P_E;

const Clients: FC = () => {
    const [addNewOpen, setAddNewOpen] = useState(false);
    const [clientInfo, setClientInfo] = useState<TclientView | null>(null);
    const [clientEdit, setClientEdit] = useState<TclientView>({
        id: 0,
        full_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postcode: "",
    });
    const [clientDel, setClientDel] = useState<TclientView>({
        id: 0,
        full_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postcode: "",
    });
    const [infoConflict, setInfoConflict] = useState<TisConflict>(
        RES_STATUS.SUCCESS
    );
    const { clients } = useLoaderData() as {
        clients: TclientView[] | null;
    };
    const actionData = useActionData() as Tresponse;

    useEffect(() => {
        /* close modals if RES_STATUS.SUCCESS  */
        if (actionData?.status === RES_STATUS.SUCCESS) {
            if (addNewOpen) {
                setAddNewOpen(false);
                toastSuccess("Registered a new client");
            }
            if (clientEdit.id) {
                setClientEdit({ ...clientEdit, id: 0 });
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
                            <PTable
                                data={clients}
                                columns={clientColumns}
                                clickInfo={setClientInfo}
                                clickEdit={setClientEdit}
                                clickDel={setClientDel}
                            />
                        </Card>
                    ) : (
                        <Card className="mt-8">
                            <span className="m-5 p-5  text-center h-15">
                                No client content
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
                        //setClientList(clientList.data);
                        return <ClientTableContent clients={clientList.data} />;
                    }}
                </Await>
            </Suspense>

            {/* Modal for add new client, and this modal can not be insert into Await*/}
            {/* otherwise, the animation would get lost*/}
            <MAddNewClient
                open={addNewOpen}
                setOpen={setAddNewOpen}
                isConflict={infoConflict}
            />
            <MClientInfo client={clientInfo} setOpen={setClientInfo} />
            <MDelete client={clientDel} setOpen={setClientDel} />
            <MUpdateClient
                client={clientEdit}
                setOpen={setClientEdit}
                isConflict={infoConflict}
            />
        </div>
    );
};

export default Clients;
