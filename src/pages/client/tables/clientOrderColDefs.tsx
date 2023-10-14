import { Cell } from "@tanstack/react-table";

const clientOrderColumns = [
    {
        header: "Order ID",
        accessorKey: "order_id",
        cell: (info: Cell<{ order_id: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: "Address",
        accessorKey: "order_address",
        cell: (info: Cell<{ order_address: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: "Status",
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
    {
        header: "Order ID",
        accessorKey: "order_id",
        cell: (info: Cell<{ order_id: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
];

export default clientOrderColumns;
