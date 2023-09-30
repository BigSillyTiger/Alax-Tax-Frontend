import { Cell } from "@tanstack/react-table";

const clientColumns = [
    {
        header: "Name",
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
        header: "Email",
        accessorKey: "email",
        cell: (info: Cell<{ email: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: "Address",
        accessorKey: "address",
        cell: (info: Cell<{ address: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: "Postcode",
        accessorKey: "postcode",
        cell: (info: Cell<{ postcode: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
];

export default clientColumns;
