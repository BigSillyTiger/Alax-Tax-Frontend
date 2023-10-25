import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { TorderWithDesc } from "@/utils/schema/orderSchema";
import { dateFormat } from "@/utils/utils";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { statusList, tableItemsId } from "@/configs/statusList";

const setColor = (value: string) => {
    switch (value) {
        case statusList.pending:
            return "bg-amber-200 text-amber-800";
        case statusList.processing:
            return "bg-cyan-200 text-cyan-800";
        case statusList.closed:
            return "bg-red-200 text-red-800";
        case statusList.completed:
            return "bg-green-200 text-green-800";
    }
};

const clientOrderColumns: ColumnDef<TorderWithDesc>[] = [
    {
        header: i18n.t("label.details"), // Details
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
                header: i18n.t("label.orderId"),
                accessorKey: "order_id",
                cell: (info: CellContext<TorderWithDesc, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                header: i18n.t("label.address"),
                accessorKey: "order_address",
                cell: (info: CellContext<TorderWithDesc, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                id: tableItemsId.status,
                header: i18n.t("label.status"),
                accessorKey: "order_status",
                cell: (info: CellContext<TorderWithDesc, string>) => {
                    const value = info.getValue();
                    return (
                        <span
                            className={`rounded-md ring-1 ring-inset font-bold py-1 px-2 ${setColor(
                                value
                            )}
                            `}
                        >
                            {value}
                        </span>
                    );
                },
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
        header: i18n.t("label.feeStatus"),
        columns: [
            {
                header: i18n.t("label.total"),
                accessorKey: "total",
                cell: (info: CellContext<TorderWithDesc, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                header: i18n.t("label.paid"),
                accessorKey: "paid",
                cell: (info: CellContext<TorderWithDesc, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                header: i18n.t("label.balance"),
                accessorKey: "balance",
                cell: (info: CellContext<TorderWithDesc, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
        ],
    },
    {
        header: i18n.t("label.menu"),
        //cell: (info: CellContext<TorderWithDesc, string>) => <></>,
    },
];

export default clientOrderColumns;
