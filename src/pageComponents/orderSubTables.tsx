import { PTable } from "@/components/table";
import { Torder, TorderService } from "@/configs/schema/orderSchema";
import i18n from "@/configs/i18n";
import { TitemContent } from "@/configs/types";
import { ColumnDef } from "@tanstack/react-table";

export const orderSubTable = (
    data: Torder,
    orderDescColumns: ColumnDef<TorderService>[],
    orderPaymentsColumns: ColumnDef<Torder>[]
) => {
    const items = [] as TitemContent[];

    /* order services table */
    items.push({
        title: i18n.t("label.services"),
        content: data?.order_services?.length ? (
            <PTable
                data={data.order_services}
                columns={orderDescColumns}
                cnHead="bg-indigo-50"
                hFilter={false}
            />
        ) : (
            <div className="my-2 px-1">{i18n.t("tips.noServices")}</div>
        ),
    });

    /* order payments table */
    items.push({
        title: i18n.t("label.payments"),
        content: data?.payments?.length ? (
            <PTable
                data={data.payments}
                columns={
                    orderPaymentsColumns as ColumnDef<{
                        paid: number;
                        fk_oid: string;
                        pid: string;
                        paid_date: string;
                    }>[]
                }
                cnHead="bg-indigo-50"
                hFilter={false}
            />
        ) : (
            <div className="my-2 px-1">{i18n.t("tips.noPayments")}</div>
        ),
    });

    return items;
};
