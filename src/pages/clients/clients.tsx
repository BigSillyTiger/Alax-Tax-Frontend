import React, { FC, Suspense, useState, MouseEvent, TouchEvent } from "react";
import { Await, useLoaderData } from "react-router-dom";
import LoadingPage from "@/components/loadingEle";
import {
    VirtualTable as VTable,
    PaginatedTable as PTable,
} from "@/components/table";
import clientColumns from "./clientColumnDefs";
import Card from "@/components/card";
import AddNew from "./addNew";

const Clients: FC = () => {
    const [addNewOpen, setAddNewOpen] = useState(false);
    const { clients } = useLoaderData() as { clients: any };

    const handleAddeNew = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        setAddNewOpen(true);
    };

    const ClientTableContent = ({ clients }: any) => {
        return (
            <>
                <div className="px-4 sm:px-6 lg:px-8 ">
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
                    <Card>
                        <PTable data={clients} columns={clientColumns} />
                    </Card>
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
            <AddNew open={addNewOpen} setOpen={setAddNewOpen} />
        </div>
    );
};

export default Clients;
