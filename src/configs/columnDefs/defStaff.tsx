import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { colorWithStaffUid } from "../utils/color";
import { Atel, Amail } from "@/components/aLinks";
import { ExpandBtn } from "@/components/table/tableBtn";
import OnOff from "@/components/OnOff";
import { Tstaff } from "../schema/staffSchema";

/**
 * @description
 * @param header - id
 */
const useStaffColumnsDef = () => {
    const staffColumns: ColumnDef<Tstaff>[] = [
        {
            id: "Menu",
            header: i18n.t("label.menu"),
            cell: () => <></>,
        },
        {
            id: "UID",
            header: i18n.t("label.uid"),
            accessorKey: "uid",
            cell: (info: CellContext<Tstaff, unknown>) => {
                return (
                    <ExpandBtn
                        row={info.row}
                        name={
                            <span
                                className={`${colorWithStaffUid(info.getValue<string>()).text}`}
                            >
                                {info.getValue<string>()}
                            </span>
                        }
                    />
                );
            },
        },
        {
            header: i18n.t("label.name"),
            accessorFn: (data: Tstaff) =>
                data.first_name + " " + data.last_name,
            cell: (info: CellContext<Tstaff, unknown>) => {
                return (
                    <span className="text-wrap">{info.getValue<string>()}</span>
                );
            },
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
                <span className="text-wrap">{info.getValue<string>()}</span>
            ),
        },
        {
            id: "Access",
            header: i18n.t("label.access"),
            accessorFn: (data: Tstaff) => (data.access ? "Yes" : "No"),
            cell: (info: CellContext<Tstaff, unknown>) => (
                <OnOff
                    access={
                        info
                            .getValue<string>()
                            .toString()
                            .toLocaleLowerCase() as "yes" | "no"
                    }
                />
            ),
            meta: {
                filterVariant: "select",
            },
        },
    ];
    return staffColumns;
};

export default useStaffColumnsDef;
