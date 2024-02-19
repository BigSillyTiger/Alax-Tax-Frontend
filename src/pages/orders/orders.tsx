import { FC, Suspense, useEffect } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import LoadingPage from "@/components/loadingEle";
import Card from "@/components/card";
import { TtotalOrder } from "@/configs/schema/orderSchema";
import { Tresponse, RES_STATUS } from "@/utils/types";
import { PTable } from "@/components/table";
import orderColumns from "@/configs/columnDefs/defOrders";
import { MOrderDel, MOrderForm } from "@/page-components/modals";
import { useAtom } from "jotai";
import { atOrderWithPayments } from "@/configs/atoms";

type Torders = {
    orders: TtotalOrder[] | null;
};

const Orders: FC = () => {
    const { orders } = useLoaderData() as Torders;
    const actionData = useActionData() as Tresponse;

    const [, setClientOrder] = useAtom(atOrderWithPayments);

    useEffect(() => {
        if (actionData?.status === RES_STATUS.SUCCESS) {
            console.log("--> order page receiving success from server");
        }
    }, [actionData]);

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
                            menuOptions={{ edit: true, del: true }}
                            setData={setClientOrder}
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
                        return <OrderTableContent orders={ordersList.data} />;
                    }}
                </Await>
            </Suspense>

            {/* modals */}
            <MOrderForm />
            <MOrderDel />
        </div>
    );
};

export default Orders;
