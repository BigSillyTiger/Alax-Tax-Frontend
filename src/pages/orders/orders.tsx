import { FC, Suspense, useEffect } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import LoadingPage from "@/components/loadingEle";
import Card from "@/components/card";
import { Torder } from "@/configs/schema/orderSchema";
import { Tresponse, RES_STATUS, Tunivers } from "@/utils/types";
import { PTable } from "@/components/table";
import orderColumns from "@/configs/columnDefs/defOrders";
import { MOrderDel, MOrderForm } from "@/page-components/modals";
import { useAtom } from "jotai";
import { atOrder } from "@/configs/atoms";
import { Tcompany } from "@/configs/schema/settingSchema";

type Torders = {
    orders: Torder[] | null;
};

const Orders: FC = () => {
    const { orders, uniData, company, logo } = useLoaderData() as {
        orders: Torder[];
        uniData: Tunivers;
        company: Tcompany;
        logo: string;
    };
    const actionData = useActionData() as Tresponse;
    const [, setClientOrder] = useAtom(atOrder);

    useEffect(() => {
        if (actionData?.status === RES_STATUS.SUCCESS) {
            console.log("--> order page receiving success from server");
        }
    }, [actionData]);

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
        </div>
    );
};

export default Orders;
