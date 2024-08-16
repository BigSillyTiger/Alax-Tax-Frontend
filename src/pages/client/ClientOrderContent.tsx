import type { FC } from "react";
import Card from "@/components/Card";
import { TorderWithClient } from "@/configs/schema/orderSchema";
import { PTable } from "@/components/table";
import useClientOrderColumnsDef from "@/configs/columnDefs/defClientOrder";
import { useAtom } from "jotai";
import { atOrderWithClient } from "@/configs/atoms";
import { useTranslation } from "react-i18next";
import SubTable from "./SubTable";

type Tprops = {
    orders: TorderWithClient[];
};

const ClientOrderContent: FC<Tprops> = ({ orders }) => {
    const { t } = useTranslation();
    const clientOrderColumns = useClientOrderColumnsDef();
    const [, setClientOrder] = useAtom(atOrderWithClient) as [
        TorderWithClient,
        (prev: TorderWithClient) => TorderWithClient,
    ];

    return (
        <Card className="">
            {/* client orders table */}
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
                />
            ) : (
                <span>{t("tips.noOrder")}</span>
            )}
        </Card>
    );
};

export default ClientOrderContent;
