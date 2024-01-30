import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { Tstaff } from "../schema/staffSchema";

/**
 * @description
 * @param header - id
 */
const staffColumns: ColumnDef<Tstaff>[] = [
    {
        header: i18n.t("label.details"), // Details
        cell: () => {
            <></>;
        },
    },
    {
        header: i18n.t("label.uid"),
        accessorFn: (data: Tstaff) => data.uid,
        cell: (info: CellContext<Tstaff, unknown>) => (
            <span>{info.getValue<number>()}</span>
        ),
    },
    {
        header: i18n.t("label.firstName"),
        accessorFn: (data: Tstaff) => data.first_name,
        cell: (info: CellContext<Tstaff, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("label.lastName"),
        accessorKey: "last_name",
        cell: (info: CellContext<Tstaff, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("label.phone1"),
        accessorKey: "phone",
        cell: (info: CellContext<Tstaff, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("label.email1"),
        accessorKey: "email",
        cell: (info: CellContext<Tstaff, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("label.address"),
        accessorFn: (data: Tstaff) =>
            data.address +
            ", " +
            data.suburb +
            ", " +
            data.city +
            ", " +
            data.postcode,
        cell: (info: CellContext<Tstaff, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("label.role"),
        accessorKey: "role",
        cell: (info: CellContext<Tstaff, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("label.menu"),
        cell: () => <></>,
    },
];

export default staffColumns;
