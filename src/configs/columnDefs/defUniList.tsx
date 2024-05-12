import { Cell } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { rangeFilterFn } from "./filterFn";

export const serviceListColDefs = [
    {
        header: i18n.t("label.menu"),
        cell: () => {
            return <></>;
        },
    },
    {
        header: i18n.t("label.id"),
        accessorKey: "id",
        cell: (info: Cell<{ id: number }, number>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: i18n.t("label.service"),
        accessorKey: "service",
        cell: (info: Cell<{ id: string }, string>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: i18n.t("label.unit"),
        accessorKey: "unit",
        cell: (info: Cell<{ id: string }, string>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: i18n.t("label.uPrice"),
        accessorKey: "unit_price",
        cell: (info: Cell<{ id: string }, string>) => {
            return <span>{info.getValue()}</span>;
        },
        filterFn: rangeFilterFn,
        meta: {
            filterVariant: "range",
        },
    },
];

export const unitListColDefs = [
    {
        header: i18n.t("label.menu"),
        cell: () => {
            return <></>;
        },
    },
    {
        header: i18n.t("label.id"),
        accessorKey: "id",
        cell: (info: Cell<{ id: number }, number>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: i18n.t("label.unit"),
        accessorKey: "unit_name",
        cell: (info: Cell<{ id: string }, string>) => {
            return <span>{info.getValue()}</span>;
        },
    },
];

export type TunitListColDefs = typeof unitListColDefs;
export type TserviceListColDefs = typeof serviceListColDefs;
