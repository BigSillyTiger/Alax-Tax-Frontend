import { Cell } from "@tanstack/react-table";
import i18n from "@/utils/i18n";

const clientOrderColumns = [
    {
        header: i18n.t("table.details"), // Details
        columns: [
            {
                header: i18n.t("table.orderId"),
                accessorKey: "order_id",
                cell: (info: Cell<{ order_id: string }, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                header: i18n.t("table.address"),
                accessorKey: "order_address",
                cell: (info: Cell<{ order_address: string }, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                header: i18n.t("table.status"),
                accessorKey: "order_status",
                cell: (info: Cell<{ order_status: string }, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                header: "Order Date",
                accessorKey: "order_date",
                cell: (info: Cell<{ order_date: string }, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
        ],
    },
    {
        header: i18n.t("table.feeStatus"),
        columns: [
            {
                header: i18n.t("table.total"),
                accessorKey: "total",
                cell: (info: Cell<{ total: string }, string>) => <></>,
            },
            {
                header: i18n.t("table.paid"),
                accessorKey: "paid",
                cell: (info: Cell<{ paid: string }, string>) => <></>,
            },
            {
                header: i18n.t("table.balance"),
                accessorKey: "balance",
                cell: (info: Cell<{ balance: string }, string>) => <></>,
            },
        ],
    },
];

export default clientOrderColumns;
