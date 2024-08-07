import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { Tclient } from "@/configs/schema/clientSchema";
import { Atel, Amail } from "@/components/aLinks";
import { DetailBtn } from "@/components/table/tableBtn";

/**
 * @description
 * @param header - id
 */
const useClientColumnsDef = () => {
    const clientColumns: ColumnDef<Tclient>[] = [
        {
            header: i18n.t("label.menu"),
            cell: () => <></>,
        },
        {
            header: i18n.t("label.idClient"),
            accessorFn: (data: Tclient) => data.cid,
            cell: (info: CellContext<Tclient, unknown>) => (
                //<span>{info.getValue<string>()}</span>
                <DetailBtn
                    data={info.row.original as Tclient}
                    name={info.getValue<string>()}
                />
            ),
        },

        {
            header: i18n.t("label.name"),
            accessorFn: (data: Tclient) =>
                data.first_name + " " + data.last_name,
            cell: (info: CellContext<Tclient, unknown>) => (
                <span className="text-wrap">{info.getValue<string>()}</span>
            ),
        },
        {
            header: i18n.t("label.phone1"),
            accessorKey: "phone",
            cell: (info: CellContext<Tclient, unknown>) => (
                <Atel href={info.getValue<string>()} />
            ),
        },
        {
            header: i18n.t("label.email1"),
            accessorKey: "email",
            cell: (info: CellContext<Tclient, unknown>) => (
                <Amail href={info.getValue<string>()} />
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
                <span className="text-wrap">{info.getValue<string>()}</span>
            ),
        },
    ];
    return clientColumns;
};

export default useClientColumnsDef;
