import React, { Suspense, useState } from "react";
import type { FC, ReactNode } from "react";
import {
    useParams,
    Await,
    useLoaderData,
    useActionData,
} from "react-router-dom";
import LoadingPage from "@/components/loadingEle";
import { Tclient } from "@/utils/schema/clientSchema";
import Card from "@/components/card";
import MOrderAdd from "./modals/mOrderAdd";

const Client = () => {
    //const { cid } = useParams();
    const { clientInfo } = useLoaderData() as {
        clientInfo: Tclient;
    };
    const [orderAddClient, setOrderAddClient] = useState<Tclient>({
        ...clientInfo,
        client_id: 0,
    });

    const ClientInfoCard = ({
        client,
        className,
    }: {
        client: Tclient;
        className: string;
    }) => {
        return (
            <Card
                className={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 ${className}`}
            >
                <div className="col-span-5">
                    <p>
                        <b className="text-indigo-600">Client: </b>{" "}
                        {client.first_name}&nbsp;{client.last_name}
                    </p>
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <p>
                        <b className="text-indigo-600">Phone: </b>{" "}
                        {client?.phone}
                    </p>
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <p>
                        <b className="text-indigo-600">Postcode: </b>
                        {client?.postcode}
                    </p>
                </div>
                <div className="col-span-6">
                    <p>
                        <b className="text-indigo-600">Email: </b>{" "}
                        {client?.email}
                    </p>
                </div>
                <div className="col-span-6">
                    <p>
                        <b className="text-indigo-600">Address: </b>{" "}
                        {client?.address}, {client?.city}, {client?.state},{" "}
                        {client?.country}
                    </p>
                </div>
            </Card>
        );
    };

    const ClientInfoContent: FC<{ client: Tclient }> = ({ client }) => {
        return (
            <div className="px-4 sm:px-6 lg:px-8 top-0 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 ">
                <ClientInfoCard
                    client={client}
                    className="my-2 mx-1 col-span-3 text-sm"
                />
                <div className="sm:flex sm:items-center">
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={(e) => {
                                e.preventDefault();
                                setOrderAddClient(client);
                            }}
                        >
                            New Order
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="container mx-auto border-0">
                <Suspense fallback={<LoadingPage />}>
                    <Await resolve={clientInfo}>
                        {(clientInfo) => {
                            //setClientList(clientList.data);
                            return (
                                <ClientInfoContent
                                    client={clientInfo.data[0]}
                                />
                            );
                        }}
                    </Await>
                </Suspense>
            </div>
            <MOrderAdd open={orderAddClient} setOpen={setOrderAddClient} />
        </>
    );
};

export default Client;
