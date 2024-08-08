import type { FC } from "react";
import { useEffect, useMemo } from "react";
import Card from "@/components/Card";
import { PTable } from "@/components/table";
import SubTable from "./SubTable";
import { useTranslation } from "react-i18next";
import { TorderWithClient } from "@/configs/schema/orderSchema";
import { Tunivers } from "@/configs/types";
import { Tcompany } from "@/configs/schema/settingSchema";
import { TstaffWPayslip } from "@/configs/schema/staffSchema";
import { useAtom } from "jotai";
import {
    atAllStaff,
    atCompany,
    atLogo,
    atOrderWithClient,
    atSUData,
} from "@/configs/atoms";
import { useAsyncValue } from "react-router-dom";
import useOrderColumnsDef from "@/configs/columnDefs/defOrders";

const MainContent: FC = () => {
    const { t } = useTranslation();
    const [, setClientOrder] = useAtom(atOrderWithClient);
    const [, setAllStaff] = useAtom(atAllStaff);
    const [, setUniData] = useAtom(atSUData);
    const [, setCompany] = useAtom(atCompany);
    const [, setLogo] = useAtom(atLogo);

    const [orders, staff, uniData, company, logo] = useAsyncValue() as [
        TorderWithClient[],
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
        <div className="flex flex-col top-0">
            {/* header area */}

            {/* table */}
            {newOrders && newOrders.length ? (
                <Card className="my-3">
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
                    />
                </Card>
            ) : (
                <Card className="mt-8">
                    <span className="m-5 p-5 text-center h-15">
                        {t("tips.noOrder")}
                    </span>
                </Card>
            )}
        </div>
    );
};

export default MainContent;
