import { Cell, ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { TorderDesc } from "@/utils/schema/orderSchema";

const orderDescColumns: ColumnDef<TorderDesc>[] = [
    {
        header: i18n.t("table.rank"),
        accessorKey: "ranking",
        cell: (info: CellContext<TorderDesc, unknown>) => {
            return <span>{info.getValue<number>()}</span>;
        },
    },
    {
        header: i18n.t("table.desc"),
        accessorKey: "description",
        cell: (info: CellContext<TorderDesc, unknown>) => {
            return <span>{info.getValue<string>()}</span>;
        },
    },
    {
        header: i18n.t("table.qty"),
        accessorKey: "qty",
        cell: (info: CellContext<TorderDesc, unknown>) => {
            return <span>{info.getValue<number>()}</span>;
        },
    },
    {
        header: i18n.t("table.unit"),
        accessorKey: "unit",
        cell: (info: CellContext<TorderDesc, unknown>) => {
            return <span>{info.getValue<number>()}</span>;
        },
    },
    {
        header: i18n.t("table.uPrice"),
        accessorKey: "unit_price",
        cell: (info: CellContext<TorderDesc, unknown>) => {
            return <span>{info.getValue<number>()}</span>;
        },
    },
    {
        header: i18n.t("table.netto"),
        accessorKey: "netto",
        cell: (info: CellContext<TorderDesc, unknown>) => {
            return <span>{info.getValue<number>()}</span>;
        },
    },
];

export default orderDescColumns;
