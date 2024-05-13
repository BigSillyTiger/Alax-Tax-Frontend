import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { Torder } from "@/configs/schema/orderSchema";
import { minusAB } from "@/lib/calculations";
import { StatusBadge } from "@/components/Badge";
import { TstatusColor } from "../types";
import { dateFormat } from "@/lib/time";
import { ExpandBtn, OrderStatusBtn } from "@/components/table/tableBtn";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { moneyColors } from "../utils/color";
import { rangeFilterFn } from "./filterFn";

const useClientOrderColumnsDef = () => {
    const clientOrderColumns: ColumnDef<Torder>[] = [
        {
            id: "Menu",
            header: i18n.t("label.menu"),
            //cell: (info: CellContext<Torder, string>) => <></>,
        },
        {
            id: "Details",
            header: i18n.t("label.details"), // Details
            columns: [
                {
                    id: "orderID",
                    header: i18n.t("label.idOrder"),
                    accessorKey: "oid",
                    cell: (info: CellContext<Torder, string>) => (
                        <ExpandBtn
                            row={info.row}
                            name={info.getValue<string>()}
                        />
                    ),
                },
                {
                    header: i18n.t("label.address"),
                    accessorFn: (data: Torder) =>
                        data.address +
                        ", " +
                        data.suburb +
                        ", " +
                        data.city +
                        ", " +
                        data.state +
                        ", " +
                        data.postcode,
                    accessorKey: "address",
                    cell: (info: CellContext<Torder, string>) => (
                        <span className="text-wrap">{info.getValue()}</span>
                    ),
                },
                {
                    id: "orderStatus",
                    header: i18n.t("label.status"),
                    accessorKey: "status",
                    cell: (info: CellContext<Torder, string>) => {
                        return (
                            <OrderStatusBtn
                                mLabel={
                                    <StatusBadge
                                        value={info.getValue() as TstatusColor}
                                    />
                                }
                                data={info.row.original as Torder}
                            />
                        );
                    },
                    meta: {
                        filterVariant: "select",
                    },
                },
                {
                    header: "Order Date",
                    accessorFn: (data: Torder) => dateFormat(data.created_date),
                    cell: (info: CellContext<Torder, string>) => {
                        return <span>{dateFormat(info.getValue(), "au")}</span>;
                    },
                },
            ],
        },
        {
            id: "feeStatus",
            header: i18n.t("label.feeStatus"),
            columns: [
                {
                    header: i18n.t("label.total"),
                    accessorKey: "total",
                    cell: (info: CellContext<Torder, string>) => (
                        <span>{info.getValue()}</span>
                    ),
                    filterFn: rangeFilterFn,
                    meta: {
                        filterVariant: "range",
                    },
                },
                {
                    id: "Gst",
                    header: i18n.t("label.gst"),
                    accessorKey: "gst",
                    cell: (info: CellContext<Torder, number>) => (
                        <span>{info.getValue()}</span>
                    ),
                    filterFn: rangeFilterFn,
                    meta: {
                        filterVariant: "range",
                    },
                },
                {
                    id: "Paid",
                    header: i18n.t("label.paid"),
                    accessorKey: "paid",
                    cell: (info: CellContext<Torder, string>) => (
                        <span>{info.getValue()}</span>
                    ),
                    filterFn: rangeFilterFn,
                    meta: {
                        filterVariant: "range",
                    },
                },
                {
                    header: i18n.t("label.balance"),
                    accessorFn: (data: Torder) =>
                        minusAB(data.total, data.paid),
                    cell: (info: CellContext<Torder, string>) => {
                        const balance = minusAB(
                            info.row.original.total,
                            info.row.original.paid
                        );
                        return (
                            <div
                                className={`${balance ? moneyColors.unpaid : moneyColors.finished} text-base font-bold flex justify-center items-center`}
                            >
                                {balance ? (
                                    balance
                                ) : (
                                    <CheckCircleIcon className="size-9" />
                                )}
                            </div>
                        );
                    },
                    filterFn: rangeFilterFn,
                    meta: {
                        filterVariant: "range",
                    },
                },
            ],
        },
    ];
    return clientOrderColumns;
};

export default useClientOrderColumnsDef;
