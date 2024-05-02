import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { TorderService } from "@/configs/schema/orderSchema";

const useOrderDescColumnsDef = () => {
    const orderDescColumns: ColumnDef<TorderService>[] = [
        {
            header: i18n.t("label.service"),
            accessorKey: "title",
            cell: (info: CellContext<TorderService, unknown>) => {
                return <span>{info.getValue<string>()}</span>;
            },
        },
        {
            header: i18n.t("label.desc"),
            accessorKey: "description",
            cell: (info: CellContext<TorderService, unknown>) => {
                return <span>{info.getValue<string>()}</span>;
            },
        },
        {
            header: i18n.t("label.qty"),
            accessorKey: "qty",
            cell: (info: CellContext<TorderService, unknown>) => {
                return <span>{info.getValue<number>()}</span>;
            },
        },
        {
            header: i18n.t("label.unit"),
            accessorKey: "unit",
            cell: (info: CellContext<TorderService, unknown>) => {
                return <span>{info.getValue<number>()}</span>;
            },
        },
        {
            header: i18n.t("label.uPrice"),
            accessorKey: "unit_price",
            cell: (info: CellContext<TorderService, unknown>) => {
                return <span>{info.getValue<number>()}</span>;
            },
        },
        {
            header: i18n.t("label.netto"),
            accessorKey: "netto",
            cell: (info: CellContext<TorderService, unknown>) => {
                return <span>{info.getValue<number>()}</span>;
            },
        },
    ];
    return orderDescColumns;
};

export default useOrderDescColumnsDef;
