import { PTable } from "@/components/table";
import { TorderWithClient, TorderPayment } from "@/configs/schema/orderSchema";
import i18n from "@/configs/i18n";
import { TitemContent } from "@/configs/types";
import { ColumnDef } from "@tanstack/react-table";
import { ORDER_STATUS } from "@/configs/utils/setting";
import QuoteDetailsCard from "./cards/QuoteDetailsCard";
import { TorderService } from "@/configs/schema/orderServiceSchema";

export const orderSubTable = (
    data: TorderWithClient,
    orderDescColumns: ColumnDef<TorderService>[],
    orderPaymentsColumns: ColumnDef<TorderPayment>[]
) => {
    const items = [] as TitemContent[];

    /* order services table */
    items.push({
        title: i18n.t("label.services"),
        content: data?.order_services?.length ? (
            <PTable
                data={data.order_services}
                columns={orderDescColumns}
                cnTHead="bg-indigo-50"
                hFilter={false}
            />
        ) : (
            <div className="my-2 px-1">{i18n.t("tips.noServices")}</div>
        ),
    });

    /* order payments table */
    if (data.status === ORDER_STATUS[0]) {
        // pending
        items.push({
            title: i18n.t("label.quotation"),
            content: (
                <QuoteDetailsCard
                    date={data.q_date ?? ""}
                    valid={data.q_valid}
                    deposit={data.q_deposit}
                />
            ),
        });
    } else {
        items.push({
            title: i18n.t("label.payments"),
            content: data?.payments?.length ? (
                <PTable
                    data={data.payments}
                    columns={orderPaymentsColumns as ColumnDef<TorderPayment>[]}
                    cnTHead="bg-indigo-50"
                    hFilter={false}
                />
            ) : (
                <div className="my-2 px-1">{i18n.t("tips.noPayments")}</div>
            ),
        });
    }

    return items;
};
