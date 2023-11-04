import { Cell, ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { TorderPayment } from "@/configs/schema/orderSchema";
import { dateFormat } from "@/utils/utils";

const orderPaymentsColumns: ColumnDef<TorderPayment>[] = [
    {
        header: i18n.t("label.id"),
        accessorKey: "payment_id",
        cell: ({ row }) => {
            return <span>{row.index + 1}</span>;
        },
    },
    {
        header: i18n.t("label.paid"),
        accessorKey: "paid",
        cell: (info: CellContext<TorderPayment, unknown>) => {
            info.getValue<number>();
        },
    },
    {
        header: i18n.t("label.payDate"),
        accessorKey: "paid_date",
        cell: (info: CellContext<TorderPayment, unknown>) => {
            dateFormat(info.getValue() as string);
        },
    },
];

export default orderPaymentsColumns;
