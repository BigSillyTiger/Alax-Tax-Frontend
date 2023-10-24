import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { Tclient } from "@/utils/schema/clientSchema";

/**
 * @description
 * @param header - id
 */
const clientColumns: ColumnDef<Tclient>[] = [
    {
        header: i18n.t("table.details"), // Details
        cell: () => {
            <></>;
        },
    },
    {
        header: i18n.t("table.firstName"),
        accessorFn: (data: Tclient) => data.first_name,
        cell: (info: CellContext<Tclient, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("table.lastName"),
        accessorKey: "last_name",
        cell: (info: CellContext<Tclient, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("table.phone"),
        accessorKey: "phone",
        cell: (info: CellContext<Tclient, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("table.email"),
        accessorKey: "email",
        cell: (info: CellContext<Tclient, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("table.address"),
        accessorKey: "address",
        cell: (info: CellContext<Tclient, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("table.pc"),
        accessorKey: "postcode",
        cell: (info: CellContext<Tclient, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("table.menu"),
        cell: (info: CellContext<Tclient, unknown>) => <></>,
    },
];

export default clientColumns;
