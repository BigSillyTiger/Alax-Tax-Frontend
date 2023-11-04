import { Cell, ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { TorderDesc } from "@/configs/schema/orderSchema";

const orderDescColumns: ColumnDef<TorderDesc>[] = [
    {
        header: i18n.t("label.service"),
        accessorKey: "title",
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
