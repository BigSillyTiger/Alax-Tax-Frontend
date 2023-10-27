import { Cell, ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { TorderDesc } from "@/utils/schema/orderSchema";

const orderDescColumns: ColumnDef<TorderDesc>[] = [
    {
        header: i18n.t("label.rank"),
        accessorKey: "ranking",
        cell: (info: CellContext<TorderDesc, unknown>) => {
            return <span>{info.getValue<number>()}</span>;
        },
    },
    {
        header: i18n.t("label.desc"),
        accessorKey: "description",
        cell: (info: CellContext<TorderDesc, unknown>) => {
            return <span>{info.getValue<string>()}</span>;
        },
    },
    {
        header: i18n.t("label.qty"),
        accessorKey: "qty",
        cell: (info: CellContext<TorderDesc, unknown>) => {
            return <span>{info.getValue<number>()}</span>;
        },
    },
    {
        header: i18n.t("label.unit"),
        accessorKey: "unit",
        cell: (info: CellContext<TorderDesc, unknown>) => {
            return <span>{info.getValue<number>()}</span>;
        },
    },
    {
        header: i18n.t("label.uPrice"),
        accessorKey: "unit_price",
        cell: (info: CellContext<TorderDesc, unknown>) => {
            return <span>{info.getValue<number>()}</span>;
        },
    },
    {
        header: i18n.t("label.netto"),
        accessorKey: "netto",
        cell: (info: CellContext<TorderDesc, unknown>) => {
            return <span>{info.getValue<number>()}</span>;
        },
    },
];

export default orderDescColumns;