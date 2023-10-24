import { Cell } from "@tanstack/react-table";
import i18n from "@/utils/i18n";

export const serviceListColDefs = [
    {
        header: i18n.t("table.id"),
        accessorKey: "id",
        cell: (info: Cell<{ id: number }, number>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: i18n.t("table.service"),
        accessorKey: "service",
        cell: (info: Cell<{ id: string }, string>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: i18n.t("table.unit"),
        accessorKey: "unit",
        cell: (info: Cell<{ id: string }, string>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: i18n.t("table.uPrice"),
        accessorKey: "unit_price",
        cell: (info: Cell<{ id: string }, string>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: i18n.t("table.menu"),
        cell: (info: Cell<{ menu: string }, string>) => {
            return <></>;
        },
    },
];

export const unitListColDefs = [
    {
        header: i18n.t("table.id"),
        accessorKey: "id",
        cell: (info: Cell<{ id: number }, number>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: i18n.t("table.unit"),
        accessorKey: "unit_name",
        cell: (info: Cell<{ id: string }, string>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: i18n.t("table.menu"),
        cell: (info: Cell<{ menu: string }, string>) => {
            return <></>;
        },
    },
];

export type TunitListColDefs = typeof unitListColDefs;
export type TserviceListColDefs = typeof serviceListColDefs;
