import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { Torder } from "@/configs/schema/orderSchema";
import { dateFormatAU } from "@/utils/utils";

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
            return <span>{dateFormatAU(info.getValue() as string)}</span>;
        },
    },
];

export default orderPaymentsColumns;
