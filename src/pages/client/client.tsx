import React, { Suspense } from "react";
import type { FC } from "react";
import {
    useParams,
    Await,
    useLoaderData,
    useActionData,
} from "react-router-dom";
import LoadingPage from "@/components/loadingEle";
import { TclientView } from "@/configs/schema/client";
import Card from "@/components/card";

const Client = () => {
    //const { cid } = useParams();
    const { clientInfo } = useLoaderData() as {
        clientInfo: TclientView | null;
    };

    const clientInfoCard = (client: TclientView) => {
        console.log("card client: ", client);
        return (
            <Card className="my-2 mx-1 col-span-3 text-sm">
                <div className="m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                    <div className="col-span-5">
                        <p>
                            <b className="text-indigo-600">Client: </b>{" "}
                            {client.full_name}
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
                </div>
            </Card>
        );
    };

    const ClientInfoContent: FC<{ client: TclientView }> = ({ client }) => {
        console.log("-> client", client);
        return (
            <div className="px-4 sm:px-6 lg:px-8 top-0 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 ">
                {clientInfoCard(client)}
            </div>
        );
    };

    return (
        <div className="container mx-auto border-0">
            <Suspense fallback={<LoadingPage />}>
                <Await resolve={clientInfo}>
                    {(clientInfo) => {
                        //setClientList(clientList.data);
                        return (
                            <ClientInfoContent client={clientInfo.data[0]} />
                        );
                    }}
                </Await>
            </Suspense>
        </div>
    );
};

export default Client;
