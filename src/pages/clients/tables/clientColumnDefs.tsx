import { Cell } from "@tanstack/react-table";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";

const clientColumns = [
    {
        header: "Details",
        cell: (info: Cell<{ details: string }, string>) => {
            return <></>;
        },
    },
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
    {
        header: "Menu",
        cell: (info: Cell<{ menu: string }, string>) => {
            return <></>;
        },
    },
];

export default clientColumns;
