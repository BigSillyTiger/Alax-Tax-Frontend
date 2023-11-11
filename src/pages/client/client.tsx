import React, { Suspense, useState, useEffect } from "react";
import type { FC } from "react";
import {
    useParams,
    Await,
    useLoaderData,
    useActionData,
} from "react-router-dom";
import LoadingPage from "@/components/loadingEle";
import type { Tclient } from "@/configs/schema/clientSchema";
import type { TorderWithDetails } from "@/configs/schema/orderSchema";
import { RES_STATUS } from "@/utils/types";
import type { Tresponse, Tunivers, TclientOrderModal } from "@/utils/types";
import Card from "@/components/card";
import MOrderDel from "./modals/mOrderDel";
import clientOrderColumns from "../../configs/columnDefs/defClientOrder";
import { toastError, toastSuccess } from "@/utils/toaster";
import { useTranslation } from "react-i18next";
import MOrderForm from "./modals/mOrderForm";
import { ClientInfoCard } from "@/components/customized";
import { PTable } from "@/components/table";
import orderDescColumns from "../../configs/columnDefs/defOrderDesc";
import orderPaymentsColumns from "@/configs/columnDefs/defPayments";
import MOrderPay from "./modals/mOrderPay";
import MInQ from "@/components/modal/mInQ";
import { Tcompany } from "@/configs/schema/manageSchema";

const Client = () => {
    const { t } = useTranslation();
    const { cid } = useParams();
    // true for services, false for payments
    const { clientInfo, clientOrders, uniData, company } = useLoaderData() as {
        clientInfo: {
            status: number;
            msg: string;
            data: Tclient[];
        };
        clientOrders: TorderWithDetails[];
        uniData: Tunivers | null;
        company: Tcompany;
    };
    /**
     * the boolean in mysql is stored as 1 and 0
     * when working with values like these, need to convert them to boolean
     */
    const newClientOrders =
        clientOrders &&
        clientOrders.map((item) => {
            return {
                ...item,
                order_desc: item.order_desc
                    .sort((a, b) => a.ranking - b.ranking)
                    .map((desc) => {
                        return {
                            ...desc,
                            taxable: Boolean(desc.taxable),
                        };
                    }),
            };
        });

    const client = clientInfo.data[0] as Tclient;

    const initOrder: TorderWithDetails = {
        // -1 - close the modal; 0 - add new order; >0 = update order
        order_id: -1,
        fk_client_id: client.client_id,
        order_address: client.address,
        order_suburb: client.suburb,
        order_city: client.city,
        order_state: client.state,
        order_country: client.country,
        order_pc: client.postcode,
        order_status: t("label.pending"),
        order_total: 0,
        order_paid: 0,
        order_gst: 0,
        order_deposit: 0,
        order_date: "",
        quotation_date: "",
        invoice_issue_date: "",
        order_desc: [],
        payments: [],
    };
    const actionData = useActionData() as Tresponse;
    const [modalOpen, setModalOpen] = useState<TclientOrderModal>("");
    const [order, setOrder] = useState<TorderWithDetails>(initOrder);
    //const [orderDel, setOrderDel] = useState<TorderWithDetails>(initOrder);

    useEffect(() => {
        if (actionData?.status === RES_STATUS.SUCCESS) {
            if (modalOpen === "Add") {
                setModalOpen("");
                toastSuccess(t("toastS.addOrder"));
            }
        } else if (actionData?.status === RES_STATUS.SUC_DEL) {
            toastSuccess(t("toastS.delOrder"));
        } else if (actionData?.status === RES_STATUS.SUC_UPDATE_STATUS) {
            toastSuccess(t("toastS.updateOrderStatus"));
        } else if (actionData?.status === RES_STATUS.SUC_UPDATE) {
            setModalOpen("");
            toastSuccess(t("toastS.updateOrder"));
        } else if (actionData?.status === RES_STATUS.SUC_UPDATE_PAYMENTS) {
            setModalOpen("");
            toastSuccess(t("toastS.updatePayment"));
        } else if (actionData?.status === RES_STATUS.FAILED) {
            if (modalOpen === "Add") {
                toastError(t("toastF.addOrder"));
            } else if (modalOpen === "Edit") {
                toastError(t("toastF.updateOrder"));
            } else if (modalOpen === "Del") {
                toastError(t("toastF.delOrder"));
            }
        }
    }, [actionData]);

    const subOrderTable = (data: any) => {
        const items = [];
        items.push({
            title: t("label.services"),
            content: data?.order_desc?.length ? (
                <PTable
                    data={data.order_desc}
                    columns={orderDescColumns}
                    cnHead="bg-indigo-50"
                />
            ) : (
                <div className="my-2 px-1">{t("tips.noServices")}</div>
            ),
        });

        items.push({
            title: t("label.payments"),
            content: data?.payments?.length ? (
                <PTable
                    data={data.payments}
                    columns={orderPaymentsColumns}
                    cnHead="bg-indigo-50"
                />
            ) : (
                <div className="my-2 px-1">{t("tips.noPayments")}</div>
            ),
        });

        return items;
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
                                setOrder({
                                    ...initOrder,
                                    order_id: 0,
                                });
                                setModalOpen("Add");
                            }}
                        >
                            {t("btn.newOrder")}
                        </button>
                    </div>
                </div>
                <Card className="col-span-6">
                    {/* order table */}
                    {newClientOrders.length > 0 ? (
                        <PTable
                            search={true}
                            data={newClientOrders}
                            columns={clientOrderColumns}
                            setModalOpen={setModalOpen}
                            setData={setOrder}
                            menuOptions={{
                                edit: true,
                                del: true,
                                pay: true,
                                invoice: true,
                                quotation: true,
                            }}
                            getRowCanExpand={(row) => {
                                if (row.original.order_desc.length > 0) {
                                    return true;
                                }
                                return false;
                            }}
                            expandContent={subOrderTable}
                            cnSearch="my-3"
                            cnTable="h-[55vh]"
                            cnHead="sticky z-10 bg-indigo-300"
                            cnTh="py-3"
                        />
                    ) : (
                        <span>{t("tips.noOrder")}</span>
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
                            return (
                                <ClientInfoContent
                                    client={clientInfo.data[0]}
                                />
                            );
                        }}
                    </Await>
                </Suspense>
            </div>

            <MOrderDel
                client={client}
                order={order}
                open={modalOpen}
                setOpen={setModalOpen}
            />
            <MOrderForm
                client={client}
                order={order}
                open={modalOpen}
                setOpen={setModalOpen}
                uniData={uniData}
            />
            <MOrderPay
                client={client}
                order={order}
                open={modalOpen}
                setOpen={setModalOpen}
            />
            <MInQ
                open={modalOpen}
                setOpen={setModalOpen}
                client={client}
                order={order}
                company={company}
            />
        </>
    );
};

export default Client;
