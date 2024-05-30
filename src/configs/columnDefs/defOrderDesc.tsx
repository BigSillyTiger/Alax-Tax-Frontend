import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { TorderService } from "@/configs/schema/orderSchema";
import { rangeFilterFn } from "./filterFn";
import { formMoney } from "@/lib/literals";

const useOrderDescColumnsDef = () => {
    const orderDescColumns: ColumnDef<TorderService>[] = [
        {
            header: i18n.t("label.index"),
            accessorFn: (_, index) => index,
            cell: (info: CellContext<TorderService, unknown>) => {
                return <span>{info.row.index + 1}</span>;
            },
        },
        {
            header: i18n.t("label.service"),
            accessorKey: "title",
            cell: (info: CellContext<TorderService, unknown>) => {
                return (
                    <span className="text-wrap">{info.getValue<string>()}</span>
                );
            },
        },
        {
            header: i18n.t("label.desc"),
            accessorKey: "description",
            cell: (info: CellContext<TorderService, unknown>) => {
                return (
                    <span className="text-wrap">{info.getValue<string>()}</span>
                );
            },
        },
        {
            header: i18n.t("label.qty"),
            accessorKey: "qty",
            cell: (info: CellContext<TorderService, unknown>) => {
                return <span>{info.getValue<number>()}</span>;
            },
            filterFn: rangeFilterFn,
            meta: {
                filterVariant: "range",
            },
        },
        {
            header: i18n.t("label.unit"),
            accessorKey: "unit",
            cell: (info: CellContext<TorderService, unknown>) => {
                return <span>{info.getValue<number>()}</span>;
            },
            filterFn: rangeFilterFn,
            meta: {
                filterVariant: "range",
            },
        },
        {
            header: i18n.t("label.uPrice"),
            accessorKey: "unit_price",
            cell: (info: CellContext<TorderService, unknown>) => {
                return <span>{formMoney(info.getValue<number>())}</span>;
            },
            filterFn: rangeFilterFn,
            meta: {
                filterVariant: "range",
            },
        },
        {
            header: i18n.t("label.netto"),
            accessorKey: "netto",
            cell: (info: CellContext<TorderService, unknown>) => {
                return <span>{formMoney(info.getValue<number>())}</span>;
            },
            filterFn: rangeFilterFn,
            meta: {
                filterVariant: "range",
            },
        },
    ];
    return orderDescColumns;
};

export default useOrderDescColumnsDef;
