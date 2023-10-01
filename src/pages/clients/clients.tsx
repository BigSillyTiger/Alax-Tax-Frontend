import React, {
    FC,
    Suspense,
    useState,
    useEffect,
    TouchEvent,
    MouseEvent,
} from "react";
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

type Tprops = {
    clients: TclientView[] | null;
};

const Clients: FC = () => {
    const [addNewOpen, setAddNewOpen] = useState(false);
    const [clientInfo, setClientInfo] = useState<TclientView | null>(null);
    const [deleteClientID, setDeleteClientID] = useState(0);
    /* 200 - no conflicted, 401 - phone, 402 - email, 403 - both */
    const [infoConflict, setInfoConflict] = useState<200 | 401 | 402 | 403>(
        200
    );
    const { clients } = useLoaderData() as {
        clients: TclientView[] | null;
    };
    const actionData = useActionData() as Tresponse;

    useEffect(() => {
        /* close add new client dialog if successed insert into db */
        if (actionData?.status === 200 && addNewOpen) {
            setAddNewOpen(false);
            toastSuccess("Registered a new client");
        } else if (actionData?.status && actionData?.status === 201) {
            // delete a client
            toastSuccess("Deleted a client");
        } else if (actionData?.status && actionData?.status !== 200) {
            setInfoConflict(actionData?.status as 401 | 402 | 403);
            toastError("Email or Phone conflicted");
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
                                rowClick={setClientInfo}
                            />
                        </Card>
                    ) : (
                        <Card className="mt-8">
                            <span className="m-5 p-5 h-15 text-center">
                                No client content
                            </span>
                        </Card>
                    )}
                </div>
            </>
        );
    };

    return (
        <div className="container mx-auto">
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
            <MClientInfo
                client={clientInfo}
                setOpen={setClientInfo}
                deleteClientID={deleteClientID}
                setDeleteDialogOpen={setDeleteClientID}
            />
            <MDelete
                id={deleteClientID}
                setOpen={setDeleteClientID}
                setClientInfo={setClientInfo}
            />
        </div>
    );
};

export default Clients;
