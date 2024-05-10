import type { FC } from "react";
import { useEffect, useMemo } from "react";
import { ClientInfoCard } from "@/pageComponents/cards";
import { useTranslation } from "react-i18next";
import { useAsyncValue } from "react-router-dom";
import Card from "@/components/Card";
import { PTable } from "@/components/table";
import useClientOrderColumnsDef from "@/configs/columnDefs/defClientOrder";
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
import { Nbtn } from "@/components/btns";

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
    const clientOrderColumns = useClientOrderColumnsDef();

    const newOrders = useMemo(() => {
        return orders.map((item) => {
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
                /* wlUnion: item.wlUnion.map((wl) => {
                    return {
                        ...wl,

                        assigned_work: wl.assigned_work.map((aw) => {
                            return {
                                ...aw,
                                s_time: hmsTohm(aw.s_time as string),
                                e_time: hmsTohm(aw.e_time as string),
                                b_hour: hmsTohm(aw.b_hour as string),
                            };
                        }),
                    };
                }), */
            };
        });
    }, [orders]);

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
        wlUnion: [],
    };

    // condition setState should be in useEffect
    useEffect(() => {
        setClient(client[0]);
        setCompany(company);
        setLogo(logo);
        if (uniData) {
            setUniData(uniData);
            setServiceDesc({
                fk_oid: clientOrder.oid,
                ranking: 0,
                title: uniData?.services?.length
                    ? (uniData.services[0].service as string)
                    : "",
                taxable: true,
                description: "",
                qty: 1,
                unit: uniData?.services.length
                    ? (uniData.services[0].unit as string)
                    : "",
                unit_price: uniData?.services.length
                    ? (uniData.services[0].unit_price as number)
                    : 0,
                gst: calGst(
                    uniData?.services.length
                        ? Number(uniData.services[0].unit_price)
                        : 0
                ),
                netto: uniData?.services.length
                    ? (uniData.services[0].unit_price as number)
                    : 0,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client[0], clientOrder, uniData, company, logo]);

    return (
        <div className="px-4 sm:px-6 lg:px-8 top-0 flex flex-col gap-y-4">
            <div className="flex flex-col sm:flex-row gap-x-4 w-full justify-evenly">
                <ClientInfoCard
                    client={client[0]}
                    className="my-2 mx-1 col-span-3 text-sm"
                />

                <Nbtn
                    type="button"
                    className="w-full sm:w-[25dvw] md:w-[30dvw] text-wrap"
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
                </Nbtn>
            </div>
            <Card className="col-span-6">
                {/* order table */}
                {newOrders.length > 0 ? (
                    <PTable
                        search={true}
                        data={newOrders}
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
