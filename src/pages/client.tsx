import { Suspense, useEffect } from "react";
import type { FC } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import { useAtom } from "jotai";
import LoadingPage from "@/components/loadingEle";
import type { Tclient } from "@/configs/schema/clientSchema";
import type { Torder } from "@/configs/schema/orderSchema";
import type { Tunivers } from "@/utils/types";
import Card from "@/components/card";
import { MOrderDel, MOrderForm, MOrderPay } from "@/pageComponents/modals";
import clientOrderColumns from "../configs/columnDefs/defClientOrder";
import { toastError, toastSuccess } from "@/utils/toaster";
import { useTranslation } from "react-i18next";
import { ClientInfoCard } from "@/pageComponents/cards";
import { PTable } from "@/components/table";
import { Tcompany } from "@/configs/schema/settingSchema";
import { calGst } from "@/utils/calculations";
import {
    atClient,
    atOrder,
    atOrderService,
    atCompany,
    atLogo,
    atModalOpen,
    atSUData,
} from "@/configs/atoms";
import { mOpenOps } from "@/configs/utils";
import { MpdfMaker } from "@/pageComponents/modals";
import { orderSubTable } from "@/pageComponents/orderSubTables";

const Client = () => {
    const { t } = useTranslation();
    // true for services, false for payments
    const { clientInfo, orders, uniData, company, logo } = useLoaderData() as {
        clientInfo: {
            status: number;
            msg: string;
            data: Tclient[];
        };
        orders: Torder[];
        uniData: Tunivers;
        company: Tcompany;
        logo: string;
    };

    /**
     * the boolean in mysql is stored as 1 and 0
     * when working with values like these, need to convert them to boolean
     */
    const newClientOrders =
        orders &&
        orders.map((item) => {
            return {
                ...item,
                order_services: item.order_services
                    .sort((a, b) => a.ranking - b.ranking)
                    .map((desc) => {
                        return {
                            ...desc,
                            taxable: Boolean(desc.taxable),
                        };
                    }),
            };
        });

    const initOrder: Torder = {
        oid: "",
        client_info: clientInfo.data[0],
        fk_cid: clientInfo.data[0].cid,
        address: clientInfo.data[0].address,
        suburb: clientInfo.data[0].suburb,
        city: clientInfo.data[0].city,
        state: clientInfo.data[0].state,
        country: clientInfo.data[0].country,
        postcode: clientInfo.data[0].postcode,
        status: t("label.pending"),
        total: 0,
        paid: 0,
        gst: 0,
        deposit: 0,
        created_date: "",
        quotation_date: "",
        invoice_date: "",
        order_services: [],
        payments: [],
        work_logs: [],
    };

    const actionData = useActionData() as Tresponse;

    //const client = clientInfo.data[0] as Tclient;
    const [, setClient] = useAtom(atClient);
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [clientOrder, setClientOrder] = useAtom(atOrder);
    const [, setUniData] = useAtom(atSUData);
    const [, setCompany] = useAtom(atCompany);
    const [, setLogo] = useAtom(atLogo);
    const [, setServiceDesc] = useAtom(atOrderService);

    useEffect(() => {
        setClient(clientInfo.data[0]);
        setCompany(company);
        setLogo(logo);
        setUniData(uniData);
        setServiceDesc({
            fk_oid: clientOrder.oid,
            ranking: 0,
            title: uniData?.services[0].service as string,
            taxable: true,
            description: "",
            qty: 1,
            unit: uniData?.services[0].unit as string,
            unit_price: uniData?.services[0].unit_price as number,
            gst: calGst(Number(uniData?.services[0].unit_price)),
            netto: uniData?.services[0].unit_price as number,
        });
    }, [
        setClient,
        setCompany,
        setLogo,
        clientInfo,
        company,
        logo,
        setUniData,
        uniData,
        setServiceDesc,
        clientOrder,
    ]);

    useEffect(() => {
        if (actionData?.status === RES_STATUS.SUCCESS) {
            if (modalOpen === mOpenOps.add) {
                setModalOpen("");
                toastSuccess(t("toastS.addOrder"));
                actionData.status = RES_STATUS.DEFAULT;
            }
        } else if (actionData?.status === RES_STATUS.SUC_DEL) {
            toastSuccess(t("toastS.delOrder"));
            actionData.status = RES_STATUS.DEFAULT;
        } else if (actionData?.status === RES_STATUS.SUC_UPDATE_STATUS) {
            toastSuccess(t("toastS.updateOrderStatus"));
            actionData.status = RES_STATUS.DEFAULT;
        } else if (actionData?.status === RES_STATUS.SUC_UPDATE) {
            setModalOpen("");
            toastSuccess(t("toastS.updateOrder"));
            actionData.status = RES_STATUS.DEFAULT;
        } else if (actionData?.status === RES_STATUS.SUC_UPDATE_PAYMENTS) {
            setModalOpen("");
            toastSuccess(t("toastS.updatePayment"));
            actionData.status = RES_STATUS.DEFAULT;
        } else if (actionData?.status === RES_STATUS.FAILED) {
            if (modalOpen === mOpenOps.add) {
                toastError(t("toastF.addOrder"));
                actionData.status = RES_STATUS.DEFAULT;
            } else if (modalOpen === mOpenOps.edit) {
                toastError(t("toastF.updateOrder"));
                actionData.status = RES_STATUS.DEFAULT;
            } else if (modalOpen === mOpenOps.del) {
                toastError(t("toastF.delOrder"));
                actionData.status = RES_STATUS.DEFAULT;
            }
        }
    }, [actionData, modalOpen, setModalOpen, t]);

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
                                setClientOrder({
                                    ...initOrder,
                                    oid: "",
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
                            setData={setClientOrder}
                            menuOptions={{
                                edit: true,
                                del: true,
                                pay: true,
                                invoice: true,
                                quotation: true,
                            }}
                            getRowCanExpand={(row) => {
                                if (row.original.order_services.length > 0) {
                                    return true;
                                }
                                return false;
                            }}
                            expandContent={orderSubTable}
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
            <div className="container border-0">
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

            <MOrderDel />
            <MOrderForm />
            <MOrderPay />
            <MpdfMaker />
        </>
    );
};

export default Client;
