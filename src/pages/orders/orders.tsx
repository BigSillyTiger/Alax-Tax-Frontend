import { FC, Suspense, useEffect } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import LoadingPage from "@/components/loadingEle";
import Card from "@/components/card";
import { TtotalOrder } from "@/configs/schema/orderSchema";
import { Tresponse, RES_STATUS } from "@/utils/types";
import { PTable } from "@/components/table";
import orderColumns from "@/configs/columnDefs/defOrders";

type Torders = {
    orders: TtotalOrder[] | null;
};

const Orders: FC = () => {
    const { orders } = useLoaderData() as Torders;
    const actionData = useActionData() as Tresponse;

    useEffect(() => {
        if (actionData?.status === RES_STATUS.SUCCESS) {
            console.log("--> order page receiving success from server");
        }
    }, [actionData]);

    const OrderTableContent: FC<Torders> = ({ orders }) => {
        return (
            <div className="px-4 sm:px-6 lg:px-8 top-0">
                {/* header area */}
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto sm:flex">
                        {/* placeholder */}
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            /* onClick={} */
                        >
                            Add New Order
                        </button>
                    </div>
                </div>

                {/* table */}
                {orders ? (
                    <Card className="mt-8">
                        <PTable
                            search={true}
                            hFilter={true}
                            data={orders}
                            columns={orderColumns}
                            //menuOptions={{ edit: true, del: true }}
                            setData={() => {}}
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
        </div>
    );
};

export default Orders;
