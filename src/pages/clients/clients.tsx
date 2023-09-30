import React, {
    FC,
    Suspense,
    useState,
    MouseEvent,
    TouchEvent,
    useMemo,
    useEffect,
} from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingPage from "@/components/loadingEle";
import {
    VirtualTable as VTable,
    PaginatedTable as PTable,
} from "@/components/table";
import clientColumns from "./clientColumnDefs";
import Card from "@/components/card";
import AddNew from "./addNew";
import { Tresult } from "./dataAccess";
import { t_table_client } from "@/components/table/config";
import { toastError, toastSuccess } from "@/configs/utils";

type Tprops = {
    clients: t_table_client[] | null;
};

const toast_conflict = () => "Email or Phone conflicted";
const toast_add_client = () => toast.success("Register a new client");

const Clients: FC = () => {
    const [addNewOpen, setAddNewOpen] = useState(false);
    /* 200 - no conflicted, 401 - phone, 402 - email, 403 - both */
    const [infoConflict, setInfoConflict] = useState<200 | 401 | 402 | 403>(
        200
    );
    const { clients } = useLoaderData() as { clients: t_table_client[] | null };
    const actionData = useActionData() as Tresult;

    useEffect(() => {
        /* close add new client dialog if successed insert into db */
        if (actionData?.status == 200 && addNewOpen) {
            setAddNewOpen(false);
            toastSuccess("Register a new client");
        }
        if (actionData?.status && actionData?.status != 200) {
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
                    {clients ? (
                        <Card>
                            <PTable data={clients} columns={clientColumns} />
                        </Card>
                    ) : (
                        <Card>
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
            <AddNew
                open={addNewOpen}
                setOpen={setAddNewOpen}
                isConflict={infoConflict}
            />
        </div>
    );
};

export default Clients;
