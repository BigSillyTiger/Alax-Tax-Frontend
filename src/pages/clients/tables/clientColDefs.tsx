import { Cell } from "@tanstack/react-table";
import i18n from "@/utils/i18n";

/**
 * @description
 * @param header - id
 */
const clientColumns = [
    {
        header: i18n.t("table.details"), // Details
        cell: (info: Cell<{ details: string }, string>) => {
            return <></>;
        },
    },
    {
        header: i18n.t("table.firstName"),
        accessorKey: "first_name",
        cell: (info: Cell<{ first_name: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: i18n.t("table.lastName"),
        accessorKey: "last_name",
        cell: (info: Cell<{ last_name: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: i18n.t("table.phone"),
        accessorKey: "phone",
        cell: (info: Cell<{ phone: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: i18n.t("table.email"),
        accessorKey: "email",
        cell: (info: Cell<{ email: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: i18n.t("table.address"),
        accessorKey: "address",
        cell: (info: Cell<{ address: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: i18n.t("table.pc"),
        accessorKey: "postcode",
        cell: (info: Cell<{ postcode: string }, string>) => (
            <span>{info.getValue()}</span>
        ),
    },
    {
        header: i18n.t("table.menu"),
        cell: (info: Cell<{ menu: string }, string>) => {
            return <></>;
        },
    },
];

export default clientColumns;
