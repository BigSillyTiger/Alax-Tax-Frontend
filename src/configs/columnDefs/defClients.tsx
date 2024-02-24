import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { Tclient } from "@/configs/schema/clientSchema";

/**
 * @description
 * @param header - id
 */
const clientColumns: ColumnDef<Tclient>[] = [
    {
        header: i18n.t("label.details"), // Details
        cell: () => {
            <></>;
        },
    },
    {
        header: i18n.t("label.idClient"),
        accessorFn: (data: Tclient) => data.cid,
        cell: (info: CellContext<Tclient, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },

    {
        header: i18n.t("label.name"),
        accessorFn: (data: Tclient) => data.first_name + " " + data.last_name,
        cell: (info: CellContext<Tclient, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("label.phone1"),
        accessorKey: "phone",
        cell: (info: CellContext<Tclient, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("label.email1"),
        accessorKey: "email",
        cell: (info: CellContext<Tclient, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("label.address"),
        accessorFn: (data: Tclient) =>
            data.address +
            ", " +
            data.suburb +
            ", " +
            data.city +
            ", " +
            data.postcode,
        cell: (info: CellContext<Tclient, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("label.pc"),
        accessorKey: "postcode",
        cell: (info: CellContext<Tclient, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("label.menu"),
        cell: () => <></>,
    },
];

export default clientColumns;
