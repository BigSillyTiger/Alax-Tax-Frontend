import { FC, Suspense, useEffect } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import LoadingPage from "@/components/loadingEle";
import Card from "@/components/card";
import { Torder } from "@/configs/schema/orderSchema";
import { Tresponse, RES_STATUS, Tunivers } from "@/utils/types";
import { PTable } from "@/components/table";
import orderColumns from "@/configs/columnDefs/defOrders";
import {
    MOrderDel,
    MOrderForm,
    MOrderPay,
    MpdfMaker,
} from "@/pageComponents/modals";
import { useAtom } from "jotai";
import { atModalOpen, atOrder } from "@/configs/atoms";
import { Tcompany } from "@/configs/schema/settingSchema";
import { mOpenOps } from "@/configs/utils";
import { toastError, toastSuccess } from "@/utils/toaster";
import { useTranslation } from "react-i18next";
import { orderSubTable } from "@/pageComponents/orderSubTables";

type Torders = {
    orders: Torder[] | null;
};

const Orders: FC = () => {
    const { t } = useTranslation();
    const { orders, uniData, company, logo } = useLoaderData() as {
        orders: Torder[];
        uniData: Tunivers;
        company: Tcompany;
        logo: string;
    };
    const actionData = useActionData() as Tresponse;
    const [, setClientOrder] = useAtom(atOrder);
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);

    useEffect(() => {
        if (actionData?.status === RES_STATUS.SUCCESS) {
            console.log("--> order page receiving success from server");
        }
    }, [actionData]);

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

    const OrderTableContent: FC<Torders> = ({ orders }) => {
        return (
            <div className="px-4 sm:px-6 lg:px-8 top-0">
                {/* header area */}

                {/* table */}
                {orders ? (
                    <Card className="mt-8">
                        <PTable
                            search={true}
                            hFilter={true}
                            data={newClientOrders}
                            columns={orderColumns}
                            menuOptions={{
                                edit: true,
                                del: true,
                                pay: true,
                                quotation: true,
                                invoice: true,
                            }}
                            setData={setClientOrder}
                            getRowCanExpand={(row) => {
                                if (row.original.order_services.length > 0) {
                                    return true;
                                }
                                return false;
                            }}
                            expandContent={orderSubTable}
                            cnSearch="my-3"
                            cnTable="h-[65vh]"
                            cnHead="sticky z-10 bg-indigo-300"
                            cnTh="py-3"
                        />
                    </Card>
                ) : (
                    <Card className="mt-8">
                        <span className="m-5 p-5  text-center h-15">
                            No Order Content
                        </span>
                    </Card>
                )}
            </div>
        );
    };

    return (
        <div className="container mx-auto border-0">
            <Suspense fallback={<LoadingPage />}>
                <Await resolve={orders}>
                    {(ordersList) => {
                        return <OrderTableContent orders={ordersList} />;
                    }}
                </Await>
            </Suspense>

            {/* modals */}
            <MOrderForm />
            <MOrderDel />
            <MOrderPay />
            <MpdfMaker />
        </div>
    );
};

export default Orders;
