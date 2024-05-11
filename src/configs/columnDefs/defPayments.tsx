import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { TorderPayment } from "@/configs/schema/orderSchema";
import { dateFormat } from "@/lib/time";
import { rangeFilterFn } from "./filterFn";

const useOrderPaymentColumnsDef = () => {
    const orderPaymentsColumns: ColumnDef<TorderPayment>[] = [
        {
            header: i18n.t("label.paid"),
            accessorKey: "paid",
            cell: (info: CellContext<TorderPayment, unknown>) => {
                return <span>{info.getValue<number>()}</span>;
            },
            filterFn: rangeFilterFn,
            meta: {
                filterVariant: "range",
            },
        },
        {
            header: i18n.t("label.payDate"),
            accessorFn: (data: TorderPayment) => dateFormat(data.paid_date),
            cell: (info: CellContext<TorderPayment, unknown>) => {
                return (
                    <span>{dateFormat(info.getValue() as string, "au")}</span>
                );
            },
        },
    ];
    return orderPaymentsColumns;
};

export default useOrderPaymentColumnsDef;
