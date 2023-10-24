import React, { Suspense, useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import {
    useParams,
    Await,
    useLoaderData,
    useActionData,
} from "react-router-dom";
import LoadingPage from "@/components/loadingEle";
import type { Tclient } from "@/utils/schema/clientSchema";
import type { Torder, TorderWithDesc } from "@/utils/schema/orderSchema";
import { RES_STATUS, type Tresponse } from "@/utils/types";
import Card from "@/components/card";
import MOrderAdd from "./modals/mOrderAdd";
import MOrderDel from "./modals/mOrderDel";
import MOrderEdit from "./modals/mOrderEdit";
import ClientOrderTable from "./tables/tableClientOrder";
import clientOrderColumns from "./tables/defClientOrder";
import { toastError, toastSuccess } from "@/utils/utils";
import { useTranslation } from "react-i18next";

const initOrder = {
    order_id: 0,
    fk_client_id: 0,
    fk_invoice_id: 0,
    order_address: "",
    order_suburb: "",
    order_city: "",
    order_state: "",
    order_country: "",
    order_pc: "5000",
    order_status: "pending",
    order_date: "",
};
const initOrderWithDesc = {
    order_id: 0,
    fk_client_id: 0,
    fk_invoice_id: 0,
    order_address: "",
    order_suburb: "",
    order_city: "",
    order_state: "",
    order_country: "",
    order_pc: "5000",
    order_status: "pending",
    order_date: "",
    order_desc: [],
};

const Client = () => {
    const { t } = useTranslation();
    const { cid } = useParams();
    const { clientInfo, clientOrders } = useLoaderData() as {
        clientInfo: Tclient;
        clientOrders: TorderWithDesc[];
    };

    const actionData = useActionData() as Tresponse;

    const [orderAdd, setOrderAdd] = useState<Tclient>({
        ...clientInfo,
        client_id: 0,
    });

    const [orderDel, setOrderDel] = useState<Torder>(initOrder);

    const [orderEdit, setOrderEdit] =
        useState<TorderWithDesc>(initOrderWithDesc);

    useEffect(() => {
        if (actionData?.status === RES_STATUS.SUCCESS) {
            if (orderAdd.client_id != 0) {
                setOrderAdd({
                    ...orderAdd,
                    client_id: 0,
                });
                toastSuccess(t("toastS.addOrder"));
            }
        } else if (actionData?.status === RES_STATUS.SUC_DEL) {
            toastSuccess(t("toastS.delOrder"));
        } else if (actionData?.status === RES_STATUS.SUC_UPDATE) {
            setOrderEdit(initOrderWithDesc);
            toastSuccess(t("toastS.updateOrder"));
        } else {
            if (orderAdd.client_id != 0) {
                /* setOrderAdd({
                    ...orderAdd,
                    client_id: 0,
                }); */
                toastError(t("toastF.addOrder"));
            } else if (orderDel.order_id != 0) {
                //setOrderDel(initOrder);
                toastError(t("toastF.delOrder"));
            } else if (orderEdit.order_id != 0) {
                //setOrderEdit(initOrderWithDesc);
                toastError(t("toastF.updateOrder"));
            }
        }
    }, [actionData]);

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
                                setOrderAdd(client);
                            }}
                        >
                            New Order
                        </button>
                    </div>
                </div>
                <Card className="col-span-6">
                    {/* <ClientOrderTable data={} /> */}
                    {clientOrders.length > 0 ? (
                        <ClientOrderTable
                            data={clientOrders}
                            columns={clientOrderColumns}
                            clickEdit={setOrderEdit}
                            clickDel={setOrderDel}
                            getRowCanExpand={(row) => {
                                //console.log("-> expanded row: ", row);
                                if (row.original.order_desc.length > 0) {
                                    return true;
                                }
                                return false;
                            }}
                        />
                    ) : (
                        <span>No Order Content</span>
                    )}
                </Card>
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
            <MOrderAdd client={orderAdd} setOpen={setOrderAdd} />
            <MOrderEdit order={orderEdit} setOpen={setOrderEdit} />
            <MOrderDel
                cid={Number(cid)}
                order={orderDel}
                setOpen={setOrderDel}
            />
        </>
    );
};

export default Client;
