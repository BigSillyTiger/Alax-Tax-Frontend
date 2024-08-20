import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { rangeFilterFn } from "./filterFn";
import { formMoney } from "@/lib/literals";
import { TorderService } from "../schema/orderServiceSchema";
import ServiceStatusBtn from "@/components/table/tableBtn/ServiceStatusBtn";
import { StatusBadge } from "@/components/Badge";
import { TstatusColor } from "../types";
import { dateFormat, formExpiryDate } from "@/lib/time";

const useOrderServiceColumnsDef = () => {
    const orderServiceColumns: ColumnDef<TorderService>[] = [
        {
            header: i18n.t("label.index"),
            accessorFn: (_, index) => index,
            cell: (info: CellContext<TorderService, unknown>) => {
                return <span>{info.row.index + 1}</span>;
            },
        },
        {
            header: i18n.t("label.serviceID"),
            accessorKey: "osid",
            cell: (info: CellContext<TorderService, unknown>) => {
                return (
                    <span className="text-wrap">{info.getValue<string>()}</span>
                );
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
            id: "serviceStatus",
            header: i18n.t("label.status"),
            accessorKey: "status",
            cell: (info: CellContext<TorderService, unknown>) => {
                return (
                    <ServiceStatusBtn
                        mLabel={
                            <StatusBadge
                                value={info.getValue() as TstatusColor}
                            />
                        }
                        data={info.row.original as TorderService}
                    />
                );
            },
            meta: {
                filterVariant: "select",
            },
        },
        {
            id: "createdDate",
            header: i18n.t("label.createdDate"),
            accessorKey: "created_date",
            cell: (info: CellContext<TorderService, unknown>) => {
                return (
                    <span>{dateFormat(info.getValue() as string, "au")}</span>
                );
            },
        },
        {
            id: "expiredDate",
            header: i18n.t("label.expiredDate"),
            accessorKey: "expiry_date",
            cell: (info: CellContext<TorderService, unknown>) => {
                return <span>{formExpiryDate(info.getValue() as string)}</span>;
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
            header: i18n.t("label.net"),
            accessorKey: "net",
            cell: (info: CellContext<TorderService, unknown>) => {
                return <span>{formMoney(info.getValue<number>())}</span>;
            },
            filterFn: rangeFilterFn,
            meta: {
                filterVariant: "range",
            },
        },
        {
            header: i18n.t("label.note"),
            accessorKey: "note",
            cell: (info: CellContext<TorderService, unknown>) => {
                return (
                    <span className="text-wrap">{info.getValue<string>()}</span>
                );
            },
        },
    ];
    return orderServiceColumns;
};

export default useOrderServiceColumnsDef;
