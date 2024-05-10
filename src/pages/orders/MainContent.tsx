import type { FC } from "react";
import { useEffect, useMemo } from "react";
import Card from "@/components/Card";
import { PTable } from "@/components/table";
import SubTable from "./SubTable";
import { useTranslation } from "react-i18next";
import { Torder } from "@/configs/schema/orderSchema";
import { Tunivers } from "@/configs/types";
import { Tcompany } from "@/configs/schema/settingSchema";
import { TstaffWPayslip } from "@/configs/schema/staffSchema";
import { useAtom } from "jotai";
import {
    atAllStaff,
    atCompany,
    atLogo,
    atOrder,
    atSUData,
} from "@/configs/atoms";
import { useAsyncValue } from "react-router-dom";
import { hmsTohm } from "@/lib/time";
import useOrderColumnsDef from "@/configs/columnDefs/defOrders";

const MainContent: FC = () => {
    const { t } = useTranslation();
    const [, setClientOrder] = useAtom(atOrder);
    const [, setAllStaff] = useAtom(atAllStaff);
    const [, setUniData] = useAtom(atSUData);
    const [, setCompany] = useAtom(atCompany);
    const [, setLogo] = useAtom(atLogo);

    const [orders, staff, uniData, company, logo] = useAsyncValue() as [
        Torder[],
        TstaffWPayslip[],
        Tunivers,
        Tcompany,
        string,
    ];

    const orderColumns = useOrderColumnsDef();

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
                wlUnion: item.wlUnion.map((wl) => {
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
                }),
            };
        });
    }, [orders]);

    useEffect(() => {
        setCompany(company);
        setLogo(logo);
        setAllStaff(staff);
        setUniData(uniData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [staff, uniData, company, logo]);

    return (
        <div className="px-4 sm:px-6 lg:px-8 top-0">
            {/* header area */}

            {/* table */}
            {newOrders && newOrders.length ? (
                <Card className="mt-8">
                    <PTable
                        search={true}
                        hFilter={true}
                        data={newOrders}
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
                        expandContent={SubTable}
                        cnSearch="my-3"
                        cnTable={`h-[70dvh]`}
                        cnHead="sticky z-10 bg-indigo-300"
                        cnTh="py-3"
                    />
                </Card>
            ) : (
                <Card className="mt-8">
                    <span className="m-5 p-5  text-center h-15">
                        {t("tips.noOrder")}
                    </span>
                </Card>
            )}
        </div>
    );
};

export default MainContent;
