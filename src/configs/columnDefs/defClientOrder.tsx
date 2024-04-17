import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { Torder } from "@/configs/schema/orderSchema";
import { minusAB } from "@/lib/calculations";
import Badge from "@/components/Badge";
import { TstatusColor } from "../types";
import { dateFormat } from "@/lib/time";
import { ExpandBtn, OrderStatusBtn } from "@/components/table/tableBtn";

const clientOrderColumns: ColumnDef<Torder>[] = [
    {
        id: "Details",
        header: i18n.t("label.details"), // Details
        columns: [
            {
                id: "orderID",
                header: i18n.t("label.idOrder"),
                accessorKey: "oid",
                cell: (info: CellContext<Torder, string>) => (
                    <ExpandBtn row={info.row} name={info.getValue<string>()} />
                ),
            },
            {
                header: i18n.t("label.address"),
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
                cell: (info: CellContext<Torder, string>) => {
                    return (
                        <OrderStatusBtn
                            mLabel={
                                <Badge
                                    value={info.getValue() as TstatusColor}
                                />
                            }
                            data={info.row.original as Torder}
                        />
                    );
                },
            },
            {
                header: "Order Date",
                accessorKey: "created_date",
                cell: (info: CellContext<Torder, string>) => {
                    return <span>{dateFormat(info.getValue(), "au")}</span>;
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
                    <span>
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

export default clientOrderColumns;
