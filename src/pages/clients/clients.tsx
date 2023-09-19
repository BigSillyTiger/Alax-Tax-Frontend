import React, { FC, Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import LoadingPage from "@/components/loadingPage";
import Table from "@/components/table";
import clientColumns from "./clientColumnDefs";

const Clients: FC = () => {
    const { clients } = useLoaderData() as { clients: any };

    const ClientTableContent = ({ clients }: any) => {
        return (
            <div className="px-4 sm:px-6 lg:px-8">
                {/* header area */}
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto sm:flex"></div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add New Client
                        </button>
                    </div>
                </div>

                {/* table */}
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <Table data={clients} columns={clientColumns} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Suspense fallback={<LoadingPage />}>
                <Await resolve={clients}>
                    {(clientList) => {
                        //setClientList(clientList.data);
                        return <ClientTableContent clients={clientList.data} />;
                    }}
                </Await>
            </Suspense>
        </>
    );
};

export default Clients;
