import { createColumnHelper, Cell } from "@tanstack/react-table";

/** @type import('@tanstack/react-table').conlumnDef<any>
 *  if the data structure is like:
 *  { "id": 1, "name": "xyz"}
 *  then the 'any' should be the type of the object's type above
 */

/* const columnHelper = createColumnHelper();
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
]; */

export const clientColumns = [
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
];
