import type { FC } from "react";
import { useEffect } from "react";
import { ClientInfoCard } from "@/pageComponents/cards";
import { useTranslation } from "react-i18next";
import { useAsyncValue } from "react-router-dom";
import { useAtom } from "jotai";
import {
    atClient,
    atCompany,
    atLogo,
    atModalOpen,
    atOrderWithClient,
    atOrderService,
    atSUData,
} from "@/configs/atoms";
import { TorderWithClient } from "@/configs/schema/orderSchema";
import { calGst } from "@/lib/calculations";
import { Tclient } from "@/configs/schema/clientSchema";
import { Tunivers } from "@/configs/types";
import { Tcompany } from "@/configs/schema/settingSchema";
import { Nbtn } from "@/components/btns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientOrderContent from "./ClientOrderContent";
import ClientServiceContent from "./ClientServiceContent";
import { TorderService } from "@/configs/schema/orderServiceSchema";

const MainContent: FC = () => {
    const { t } = useTranslation();
    const [, setClient] = useAtom(atClient);
    const [, setModalOpen] = useAtom(atModalOpen);
    const [clientOrder, setClientOrder] = useAtom(atOrderWithClient) as [
        TorderWithClient,
        (prev: TorderWithClient) => TorderWithClient,
    ];
    const [, setUniData] = useAtom(atSUData);
    const [, setCompany] = useAtom(atCompany);
    const [, setLogo] = useAtom(atLogo);
    const [, setOrderService] = useAtom(atOrderService);
    const [client, orders, services, uniData, company, logo] =
        useAsyncValue() as [
            Tclient[],
            TorderWithClient[],
            TorderService[],
            Tunivers,
            Tcompany,
            string,
        ];

    console.log("--> client services: ", services);

    const initOrder: TorderWithClient = {
        oid: "",
        fk_cid: client[0].cid,
        status: t("label.pending"),
        archive: false,
        total: 0,
        paid: 0,
        gst: 0,
        net: 0,
        q_deposit: 0,
        q_valid: 15,
        q_date: new Date().toISOString().slice(0, 10),
        i_date: new Date().toISOString().slice(0, 10),
        note: "",
        created_date: new Date().toISOString().slice(0, 10),
        client_info: client[0],
        order_services: [],
        payments: [],
    };

    // condition setState should be in useEffect
    useEffect(() => {
        setClient(client[0]);
        setCompany(company);
        setLogo(logo);
        if (uniData) {
            setUniData(uniData);
            setOrderService({
                osid: "",
                fk_cid: clientOrder.fk_cid,
                fk_oid: clientOrder.oid,
                status: t("label.pending"),
                ranking: 0,
                title: uniData?.services?.length
                    ? (uniData.services[0].service as string)
                    : "",
                taxable: true,
                note: "",
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
                net: uniData?.services.length
                    ? (uniData.services[0].unit_price as number)
                    : 0,
                created_date: "",
                expiry_date: "none",
                service_type: "",
                product_name: "",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client[0], clientOrder, uniData, company, logo]);

    const AddNewOrder = () => (
        <Nbtn
            type="button"
            className="w-[20%] my-2 mx-1 text-wrap"
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
    );

    return (
        <Tabs defaultValue="orders" className="w-full h-full flex flex-col">
            {/* tabs header */}
            <TabsList className="flex flex-col md:flex-row justify-between mb-4 h-[35dvh] sm:h-[25dvh]">
                <div className="flex flex-row justify-center items-center w-full md:w-[50%]">
                    <ClientInfoCard
                        client={client[0]}
                        className="my-2 mx-1 text-sm grow"
                    />

                    <AddNewOrder />
                </div>
                <div className="flex flex-col h-full w-full sm:w-auto sm:mr-6">
                    {/* empty square */}
                    <div className="hidden md:block md:w-full md:grow"></div>
                    <div className="flex flex-row bg-indigo-100 rounded-lg p-2">
                        <TabsTrigger value="orders" className="w-full">
                            {t("label.orders")}
                        </TabsTrigger>
                        <TabsTrigger value="services" className="w-full">
                            {t("label.services")}
                        </TabsTrigger>
                    </div>
                </div>
            </TabsList>
            {/* tabs body */}
            <TabsContent value="orders" className="grow">
                <ClientOrderContent orders={orders} />
            </TabsContent>
            <TabsContent value="services" className="grow">
                <ClientServiceContent services={services} />
            </TabsContent>
        </Tabs>
    );
};

export default MainContent;
