import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { TorderWithDesc } from "@/utils/schema/orderSchema";
import { dateFormat } from "@/utils/utils";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

const setColor = (value: string) => {
    switch (value) {
        case i18n.t("label.pending"):
            return "bg-yellow-200 text-yellow-700 ring-yellow-700";
        case i18n.t("label.processing"):
            return "bg-cyan-200 text-cyan-700 ring-cyan-700";
        case i18n.t("label.closed"):
            return "bg-red-200 text-red-700 ring-red-700";
        case i18n.t("label.completed"):
            return "bg-green-200 text-green-700 ring-green-700";
    }
};

const clientOrderColumns: ColumnDef<TorderWithDesc>[] = [
    {
        id: "details",
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
                            }}
                            // why this not working?
                            //onClick={row.getToggleExpandedHandler}
                            className="cursor-pointer"
                        >
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
                id: "status",
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
        id: "feeStatus",
        header: i18n.t("label.feeStatus"),
        columns: [
            {
                header: i18n.t("label.total"),
                accessorKey: "order_total",
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
        id: "menu",
        header: i18n.t("label.menu"),
        //cell: (info: CellContext<TorderWithDesc, string>) => <></>,
    },
];

export default clientOrderColumns;
