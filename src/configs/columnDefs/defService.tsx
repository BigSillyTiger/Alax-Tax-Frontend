import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { Tservice } from "../schema/settingSchema";
import { rangeFilterFn } from "./filterFn";
import { formMoney } from "@/lib/literals";

const useServiceColumnsDef = () => {
    const serviceColumns: ColumnDef<Tservice>[] = [
        {
            id: "Index",
            header: i18n.t("label.index"),
            accessorFn: (_, index) => index,
            cell: (info: CellContext<Tservice, unknown>) => {
                return <span>{info.row.index + 1}</span>;
            },
        },
        {
            header: i18n.t("label.serviceName"),
            accessorKey: "name",
            cell: (info: CellContext<Tservice, unknown>) => {
                return <span>{info.getValue<string>()}</span>;
            },
        },
        {
            header: i18n.t("label.servicePrice"),
            accessorKey: "price",
            cell: (info: CellContext<Tservice, unknown>) => {
                return <span>{formMoney(info.getValue<number>())}</span>;
            },
            filterFn: rangeFilterFn,
            meta: {
                filterVariant: "range",
            },
        },
    ];
    return serviceColumns;
};

export default useServiceColumnsDef;
