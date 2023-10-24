import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { TorderWithDesc } from "@/utils/schema/orderSchema";
import { dateFormat } from "@/utils/utils";

import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

const clientOrderColumns: ColumnDef<TorderWithDesc>[] = [
    {
        header: i18n.t("table.details"), // Details
        columns: [
            {
                id: "expander",
                header: () => null,
                cell: ({ row }) => {
                    return row.getCanExpand() ? (
                        <button
                            {...{
                                onClick: row.getToggleExpandedHandler(),
                                style: { cursor: "pointer" },
                            }}
                        >
                            {/* {row.getIsExpanded() ? "👇" : "👉"} */}
                            {row.getIsExpanded() ? (
                                <MinusIcon className="h-6 w-6" />
                            ) : (
                                <PlusIcon className="h-6 w-6" />
                            )}
                        </button>
                    ) : (
                        "🔵"
                    );
                },
            },
            {
                header: i18n.t("table.orderId"),
                accessorKey: "order_id",
                cell: (info: CellContext<TorderWithDesc, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                header: i18n.t("table.address"),
                accessorKey: "order_address",
                cell: (info: CellContext<TorderWithDesc, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                header: i18n.t("table.status"),
                accessorKey: "order_status",
                cell: (info: CellContext<TorderWithDesc, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                header: "Order Date",
                accessorKey: "order_date",
                cell: (info: CellContext<TorderWithDesc, string>) => {
                    return <span>{dateFormat(info.getValue())}</span>;
                },
            },
        ],
    },
    {
        header: i18n.t("table.feeStatus"),
        columns: [
            {
                header: i18n.t("table.total"),
                accessorKey: "total",
                cell: (info: CellContext<TorderWithDesc, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                header: i18n.t("table.paid"),
                accessorKey: "paid",
                cell: (info: CellContext<TorderWithDesc, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                header: i18n.t("table.balance"),
                accessorKey: "balance",
                cell: (info: CellContext<TorderWithDesc, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
        ],
    },
];

export default clientOrderColumns;
