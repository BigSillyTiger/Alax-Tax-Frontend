import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const clientColumns = [
    columnHelper.accessor("full_name", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Name",
    }),
    columnHelper.accessor("phone", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Phone",
    }),
    columnHelper.accessor("email", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Email",
    }),
    columnHelper.accessor("address", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Address",
    }),
];
