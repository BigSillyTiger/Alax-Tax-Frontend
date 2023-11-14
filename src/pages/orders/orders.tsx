import { FC, Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import LoadingPage from "@/components/loadingEle";
import Card from "@/components/card";

const Orders: FC = () => {
    const orders = useLoaderData();

    const OrderTableContent = ({ orders }: { orders: any }) => {
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
                        <div></div>
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
                    {(orders) => {
                        return <OrderTableContent orders={orders.data} />;
                    }}
                </Await>
            </Suspense>
        </div>
    );
};

export default Orders;
