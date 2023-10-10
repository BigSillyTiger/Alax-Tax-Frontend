import { Cell } from "@tanstack/react-table";

export const serviceListColDefs = [
    {
        header: "ID",
        accessorKey: "id",
        cell: (info: Cell<{ id: number }, number>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: "Service",
        accessorKey: "service",
        cell: (info: Cell<{ id: string }, string>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: "Unit",
        accessorKey: "unit",
        cell: (info: Cell<{ id: string }, string>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: "Unit Price",
        accessorKey: "unit_price",
        cell: (info: Cell<{ id: string }, string>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: "Menu",
        cell: (info: Cell<{ menu: string }, string>) => {
            return <></>;
        },
    },
];

export const unitListColDefs = [
    {
        header: "ID",
        accessorKey: "id",
        cell: (info: Cell<{ id: number }, number>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: "Unit",
        accessorKey: "unit_name",
        cell: (info: Cell<{ id: string }, string>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: "Menu",
        cell: (info: Cell<{ menu: string }, string>) => {
            return <></>;
        },
    },
];

export type TunitListColDefs = typeof unitListColDefs;
export type TserviceListColDefs = typeof serviceListColDefs;
