import { Cell } from "@tanstack/react-table";

const orderColumns = [
    {
        header: "Details",
        cell: () => {
            return <></>;
        },
    },
    {
        header: "Order ID",
        accessorKey: "order_id",
        cell: (info: Cell<{ order_id: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: "Client",
        accessorKey: "full_name",
        cell: (info: Cell<{ full_name: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: "Phone",
        accessorKey: "phone",
        cell: (info: Cell<{ phone: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: "Order Time",
        accessorKey: "order_time",
        cell: (info: Cell<{ order_time: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: "Order Status",
        accessorKey: "order_status",
        cell: (info: Cell<{ order_status: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: "Order Total",
        accessorKey: "order_total",
        cell: (info: Cell<{ order_total: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: "Order Type",
        accessorKey: "order_type",
        cell: (info: Cell<{ order_type: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: "Order Details",
        cell: () => {
            return <></>;
        },
    },
];

export default orderColumns;
