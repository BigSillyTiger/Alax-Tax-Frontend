import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { Torder } from "../schema/orderSchema";
import { minusAB } from "@/lib/calculations";
import { dateFormat } from "@/lib/time";
import { Atel } from "@/components/aLinks";
import Badge from "@/components/Badge";
import { TstatusColor } from "../types";

const orderColumns: ColumnDef<Torder>[] = [
    {
        id: "details",
        header: i18n.t("label.details"), // Details
        columns: [
            /* {
                header: "Details",
                cell: () => {
                    return <></>;
                },
            }, */
            {
                id: "orderID",
                header: i18n.t("label.idOrder"),
                accessorKey: "oid",
                cell: (info: CellContext<Torder, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
            {
                header: i18n.t("label.client"),
                accessorFn: (data: Torder) =>
                    data.client_info.first_name +
                    " " +
                    data.client_info.last_name,
                accessorKey: "full_name",
                cell: (info: CellContext<Torder, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
            {
                header: i18n.t("label.idClient"),
                accessorKey: "fk_cid",
                cell: (info: CellContext<Torder, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
            {
                header: i18n.t("label.phone1"),
                accessorFn: (data: Torder) => data.client_info.phone,
                accessorKey: "phone",
                cell: (info: CellContext<Torder, unknown>) => (
                    <Atel href={info.getValue<string>()} />
                ),
            },
            {
                header: i18n.t("label.orderDate"),
                accessorKey: "created_date",
                cell: (info: CellContext<Torder, unknown>) => (
                    <span>{dateFormat(info.getValue<string>(), "au")}</span>
                ),
            },
            {
                header: i18n.t("label.addrJob"),
                accessorFn: (data: Torder) =>
                    data.address +
                    ", " +
                    data.suburb +
                    ", " +
                    data.city +
                    ", " +
                    data.state +
                    ", " +
                    data.postcode,
                accessorKey: "address",
                cell: (info: CellContext<Torder, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                id: "orderStatus",
                header: i18n.t("label.status"),
                accessorKey: "status",
                cell: (info: CellContext<Torder, unknown>) => {
                    return <Badge value={info.getValue() as TstatusColor} />;
                },
            },
        ],
    },
    {
        id: "feeStatus",
        header: i18n.t("label.feeStatus"),
        columns: [
            {
                header: i18n.t("label.total"),
                accessorKey: "total",
                cell: (info: CellContext<Torder, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                id: "Gst",
                header: i18n.t("label.gst"),
                accessorKey: "gst",
                cell: (info: CellContext<Torder, number>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                id: "Paid",
                header: i18n.t("label.paid"),
                accessorKey: "paid",
                cell: (info: CellContext<Torder, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                header: i18n.t("label.balance"),
                accessorKey: "balance",
                cell: (info: CellContext<Torder, string>) => (
                    <span className="text-pink-500 text-base font-bold">
                        {minusAB(
                            info.row.original.total,
                            info.row.original.paid
                        )}
                    </span>
                ),
            },
        ],
    },
    {
        id: "Menu",
        header: i18n.t("label.menu"),
        //cell: (info: CellContext<Torder, string>) => <></>,
    },
];

export default orderColumns;
