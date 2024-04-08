import { PTable } from "@/components/table";
import orderDescColumns from "@/configs/columnDefs/defOrderDesc";
import orderPaymentsColumns from "@/configs/columnDefs/defPayments";
import { Torder } from "@/configs/schema/orderSchema";
import i18n from "@/configs/i18n";

export const orderSubTable = (data: Torder) => {
    const items = [] as { title: string; content: JSX.Element }[];
    /* order services table */
    items.push({
        title: i18n.t("label.services"),
        content: data?.order_services?.length ? (
            <PTable
                data={data.order_services}
                columns={orderDescColumns}
                cnHead="bg-indigo-50"
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
                columns={orderPaymentsColumns}
                cnHead="bg-indigo-50"
            />
        ) : (
            <div className="my-2 px-1">{i18n.t("tips.noPayments")}</div>
        ),
    });

    return items;
};
