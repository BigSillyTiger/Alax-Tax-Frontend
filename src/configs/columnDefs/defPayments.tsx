import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { Torder } from "@/configs/schema/orderSchema";
import { dateFormat } from "@/lib/time";

const orderPaymentsColumns: ColumnDef<Torder>[] = [
    {
        header: i18n.t("label.id"),
        cell: ({ row }) => {
            return <span>{row.index + 1}</span>;
        },
    },
    {
        header: i18n.t("label.paid"),
        accessorKey: "paid",
        cell: (info: CellContext<Torder, unknown>) => {
            return <span>{info.getValue<number>()}</span>;
        },
    },
    {
        header: i18n.t("label.payDate"),
        accessorKey: "paid_date",
        cell: (info: CellContext<Torder, unknown>) => {
            return <span>{dateFormat(info.getValue() as string, "au")}</span>;
        },
    },
];

export default orderPaymentsColumns;
