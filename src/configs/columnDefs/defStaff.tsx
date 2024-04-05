import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { Tstaff } from "../schema/staffSchema";
import { colorWithStaffUid, staffColorMap } from "../utils";
import { TstaffRole } from "@/configs/types";
import { capFirstLetter } from "@/lib/literals";
import { Atel, Amail } from "@/components/aLinks";

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
        cell: (info: CellContext<Tstaff, unknown>) => {
            return (
                <span
                    className={`${colorWithStaffUid(info.getValue<string>())}`}
                >
                    {info.getValue<string>()}
                </span>
            );
        },
    },
    {
        header: i18n.t("label.name"),
        accessorFn: (data: Tstaff) => data.first_name + " " + data.last_name,
        cell: (info: CellContext<Tstaff, unknown>) => (
            <span className="">{info.getValue<string>()}</span>
        ),
    },
    {
        header: i18n.t("label.phone1"),
        accessorKey: "phone",
        cell: (info: CellContext<Tstaff, unknown>) => (
            <Atel href={info.getValue<string>()} />
        ),
    },
    {
        header: i18n.t("label.email1"),
        accessorKey: "email",
        cell: (info: CellContext<Tstaff, unknown>) => (
            <Amail href={info.getValue<string>()} />
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
        cell: (info: CellContext<Tstaff, unknown>) => {
            const style = staffColorMap[info.getValue<string>() as TstaffRole];
            return (
                <span className={`${style}`}>
                    {capFirstLetter(info.getValue<string>())}
                </span>
            );
        },
    },
    {
        header: i18n.t("label.menu"),
        cell: () => <></>,
    },
];

export default staffColumns;
