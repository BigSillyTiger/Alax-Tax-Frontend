import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { TclientService } from "../schema/serviceSchema";
import ServiceStatusBtn from "@/components/table/tableBtn/ServiceStatusBtn";
import { StatusBadge } from "@/components/Badge";
import { TstatusColor } from "../types";
import { dateFormat } from "@/lib/time";

const useClientServiceColumnsDef = () => {
    const clientServiceColumns: ColumnDef<TclientService>[] = [
        /* {
            id: "Menu",
            header: i18n.t("label.menu"),
        }, */

        {
            id: "csid",
            header: i18n.t("label.serviceID"),
            accessorKey: "csid",
            cell: (info: CellContext<TclientService, unknown>) => (
                <span className="text-wrap">{info.getValue<string>()}</span>
            ),
        },
        {
            id: "title",
            header: i18n.t("label.title"),
            accessorKey: "title",
            cell: (info: CellContext<TclientService, unknown>) => (
                <span className="text-wrap">{info.getValue<string>()}</span>
            ),
        },
        {
            id: "type",
            header: i18n.t("label.serviceType"),
            accessorKey: "service_type",
            cell: (info: CellContext<TclientService, unknown>) => (
                <span className="text-wrap">{info.getValue<string>()}</span>
            ),
        },
        {
            id: "productName",
            header: i18n.t("label.productName"),
            accessorKey: "product_name",
            cell: (info: CellContext<TclientService, unknown>) => (
                <span className="text-wrap">{info.getValue<string>()}</span>
            ),
        },
        {
            id: "serviceStatus",
            header: i18n.t("label.status"),
            accessorKey: "status",
            cell: (info: CellContext<TclientService, unknown>) => {
                return (
                    <ServiceStatusBtn
                        mLabel={
                            <StatusBadge
                                value={info.getValue() as TstatusColor}
                            />
                        }
                        data={info.row.original as TclientService}
                    />
                );
            },
            meta: {
                filterVariant: "select",
            },
        },
        {
            id: "createdDate",
            header: i18n.t("label.createdDate"),
            accessorKey: "created_date",
            cell: (info: CellContext<TclientService, unknown>) => (
                <span className="text-wrap">
                    {dateFormat(info.getValue<string>(), "au")}
                </span>
            ),
        },
        {
            id: "expiryDate",
            header: i18n.t("label.expiredDate"),
            accessorKey: "expiry_date",
            cell: (info: CellContext<TclientService, unknown>) => (
                <span className="text-wrap">{info.getValue<string>()}</span>
            ),
        },
        {
            id: "note",
            header: i18n.t("label.note"),
            accessorKey: "note",
            cell: (info: CellContext<TclientService, unknown>) => (
                <span className="text-wrap">{info.getValue<string>()}</span>
            ),
        },
    ];
    return clientServiceColumns;
};

export default useClientServiceColumnsDef;
