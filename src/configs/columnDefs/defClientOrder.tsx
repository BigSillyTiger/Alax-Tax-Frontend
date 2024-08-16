import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { TorderWithClient } from "@/configs/schema/orderSchema";
import { StatusBadge } from "@/components/Badge";
import { TstatusColor } from "../types";
import { dateFormat, isDateExpired } from "@/lib/time";
import { ExpandBtn, OrderStatusBtn } from "@/components/table/tableBtn";
import { rangeFilterFn } from "./filterFn";
import { formMoney } from "@/lib/literals";

const useClientOrderColumnsDef = () => {
    const clientOrderColumns: ColumnDef<TorderWithClient>[] = [
        {
            id: "Menu",
            header: i18n.t("label.menu"),
        },
        {
            id: "Details",
            header: i18n.t("label.details"), // Details
            columns: [
                {
                    id: "orderID",
                    header: i18n.t("label.idOrder"),
                    accessorKey: "oid",
                    cell: (info: CellContext<TorderWithClient, string>) => (
                        <ExpandBtn
                            row={info.row}
                            name={info.getValue<string>()}
                        />
                    ),
                },
                {
                    id: "orderStatus",
                    header: i18n.t("label.status"),
                    accessorKey: "status",
                    cell: (info: CellContext<TorderWithClient, string>) => {
                        return (
                            <OrderStatusBtn
                                mLabel={
                                    <StatusBadge
                                        value={info.getValue() as TstatusColor}
                                    />
                                }
                                data={info.row.original as TorderWithClient}
                            />
                        );
                    },
                    meta: {
                        filterVariant: "select",
                    },
                },
                {
                    id: "orderCreatedDate",
                    header: i18n.t("label.createdDate"),
                    accessorKey: "created_date",
                    cell: (info: CellContext<TorderWithClient, string>) => {
                        const isExpired = isDateExpired(
                            info.row.original.q_date ?? "",
                            info.row.original.q_valid
                        );
                        return (
                            <span
                                className={`${isExpired ? "text-red-500" : ""}`}
                            >
                                {dateFormat(info.getValue(), "au")}
                            </span>
                        );
                    },
                },
                {
                    id: "orderNote",
                    header: i18n.t("label.orderNote"),
                    accessorKey: "note",
                    cell: (info: CellContext<TorderWithClient, string>) => {
                        return <span>{info.getValue()}</span>;
                    },
                },
            ],
        },
        {
            id: "feeStatus",
            header: i18n.t("label.feeStatus"),
            columns: [
                {
                    id: "Gst",
                    header: i18n.t("label.gst"),
                    accessorKey: "gst",
                    cell: (info: CellContext<TorderWithClient, number>) => (
                        <span>{formMoney(info.getValue())}</span>
                    ),
                    filterFn: rangeFilterFn,
                    meta: {
                        filterVariant: "range",
                    },
                },
                {
                    header: i18n.t("label.net"),
                    accessorKey: "net",
                    cell: (info: CellContext<TorderWithClient, number>) => (
                        <span>{formMoney(info.getValue())}</span>
                    ),
                    filterFn: rangeFilterFn,
                    meta: {
                        filterVariant: "range",
                    },
                },
                {
                    header: i18n.t("label.total"),
                    accessorKey: "total",
                    cell: (info: CellContext<TorderWithClient, number>) => (
                        <span>{formMoney(info.getValue())}</span>
                    ),
                    filterFn: rangeFilterFn,
                    meta: {
                        filterVariant: "range",
                    },
                },

                /* {
                    header: i18n.t("label.balance"),
                    accessorFn: (data: TorderWithClient) =>
                        minusAB(data.total, data.paid),
                    cell: (info: CellContext<TorderWithClient, number>) => {
                        const balance = minusAB(
                            info.row.original.total,
                            info.row.original.paid
                        );
                        return (
                            <div
                                className={`${balance ? moneyColors.unpaid : moneyColors.finished} text-base font-bold flex justify-center items-center`}
                            >
                                {balance ? (
                                    formMoney(balance)
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
                }, */
            ],
        },
    ];
    return clientOrderColumns;
};

export default useClientOrderColumnsDef;
