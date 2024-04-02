import { FC, Suspense, useEffect } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import LoadingPage from "@/components/loadingEle";
import Card from "@/components/card";
import { Torder } from "@/configs/schema/orderSchema";
import type { Tunivers } from "@/utils/types";
import { RES_STATUS } from "@/utils/types";
import { PTable } from "@/components/table";
import orderColumns from "@/configs/columnDefs/defOrders";
import {
    MJobAssign,
    MOrderDel,
    MOrderForm,
    MOrderPay,
    MpdfMaker,
} from "@/pageComponents/modals";
import { useAtom } from "jotai";
import {
    atAllStaff,
    atCompany,
    atLogo,
    atModalOpen,
    atOrder,
    atSUData,
} from "@/configs/atoms";
import { Tcompany } from "@/configs/schema/settingSchema";
import { mOpenOps } from "@/configs/utils";
import { toastError, toastSuccess } from "@/utils/toaster";
import { useTranslation } from "react-i18next";
import { orderSubTable } from "@/pageComponents/orderSubTables";
import { Tstaff } from "@/configs/schema/staffSchema";
import { pageTableH } from "@/configs/ui";

type Torders = {
    orders: Torder[] | null;
};

const Orders: FC = () => {
    const { t } = useTranslation();
    const { orders, uniData, company, logo, staff } = useLoaderData() as {
        orders: Torder[];
        uniData: Tunivers;
        company: Tcompany;
        logo: string;
        staff: Tstaff[];
    };

    const actionData = useActionData() as Tresponse;
    const [, setClientOrder] = useAtom(atOrder);
    const [, setAllStaff] = useAtom(atAllStaff);
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [, setUniData] = useAtom(atSUData);
    const [, setCompany] = useAtom(atCompany);
    const [, setLogo] = useAtom(atLogo);

    useEffect(() => {
        setAllStaff(staff);
        setCompany(company);
        setLogo(logo);
        setUniData(uniData);
    }, [
        setAllStaff,
        staff,
        setCompany,
        company,
        setLogo,
        logo,
        setUniData,
        uniData,
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
        } else if (actionData?.status === RES_STATUS.SUC_UPDATE_WORKLOG) {
            if (modalOpen === mOpenOps.jobAssign) {
                setModalOpen(mOpenOps.default);
                toastSuccess(t("toastS.updateWorkLog"));
                actionData.status = RES_STATUS.DEFAULT;
            }
        }
    }, [actionData, modalOpen, setModalOpen, t]);

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
                            data={orders}
                            columns={orderColumns}
                            menuOptions={{
                                assign: true,
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
                            cnTable={`h-[${pageTableH}]`}
                            cnHead="sticky z-10 bg-indigo-300"
                            cnTh="py-3"
                        />
                    </Card>
                ) : (
                    <Card className="mt-8">
                        <span className="m-5 p-5  text-center h-15">
                            {t("label.noContent")}
                        </span>
                    </Card>
                )}
            </div>
        );
    };

    return (
        <div className="container border-0">
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
            <MJobAssign />
        </div>
    );
};

export default Orders;
