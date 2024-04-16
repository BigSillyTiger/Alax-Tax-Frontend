import type { FC } from "react";
import { useEffect } from "react";
import { ClientInfoCard } from "@/pageComponents/cards";
import { useTranslation } from "react-i18next";
import { useAsyncValue } from "react-router-dom";
import Card from "@/components/card";
import { PTable } from "@/components/table";
import clientOrderColumns from "@/configs/columnDefs/defClientOrder";
import SubTable from "./SubTable";
import { useAtom } from "jotai";
import {
    atClient,
    atCompany,
    atLogo,
    atModalOpen,
    atOrder,
    atOrderService,
    atSUData,
} from "@/configs/atoms";
import { Torder } from "@/configs/schema/orderSchema";
import { calGst } from "@/lib/calculations";
import { Tclient } from "@/configs/schema/clientSchema";
import { Tunivers } from "@/configs/types";
import { Tcompany } from "@/configs/schema/settingSchema";

const MainContent: FC = () => {
    const { t } = useTranslation();
    const [, setClient] = useAtom(atClient);
    const [, setModalOpen] = useAtom(atModalOpen);
    const [clientOrder, setClientOrder] = useAtom(atOrder);
    const [, setUniData] = useAtom(atSUData);
    const [, setCompany] = useAtom(atCompany);
    const [, setLogo] = useAtom(atLogo);
    const [, setServiceDesc] = useAtom(atOrderService);
    const [client, orders, uniData, company, logo] = useAsyncValue() as [
        Tclient[],
        Torder[],
        Tunivers,
        Tcompany,
        string,
    ];

    const initOrder: Torder = {
        oid: "",
        client_info: client[0],
        fk_cid: client[0].cid,
        address: client[0].address,
        suburb: client[0].suburb,
        city: client[0].city,
        state: client[0].state,
        country: client[0].country,
        postcode: client[0].postcode,
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

    useEffect(() => {
        setClient(client[0]);
        setCompany(company);
        setLogo(logo);
        if (uniData) {
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
        }
    }, [
        setClient,
        setCompany,
        setLogo,
        client,
        company,
        logo,
        setUniData,
        uniData,
        setServiceDesc,
        clientOrder,
    ]);

    return (
        <div className="px-4 sm:px-6 lg:px-8 top-0 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 ">
            <ClientInfoCard
                client={client[0]}
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
                {orders.length > 0 ? (
                    <PTable
                        search={true}
                        data={orders}
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
                        expandContent={SubTable}
                        cnSearch="my-3"
                        cnTable={`h-[55dvh]`}
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

export default MainContent;
