import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { Torder } from "@/configs/schema/orderSchema";
import { dateFormat } from "@/utils/utils";
import { minusAB } from "@/utils/calculations";
import OrderStatus from "@/components/OrderStatus";

const clientOrderColumns: ColumnDef<Torder>[] = [
    {
        id: "details",
        header: i18n.t("label.details"), // Details
        columns: [
            {
                id: "orderID",
                header: i18n.t("label.orderId"),
                accessorKey: "oid",
                cell: (info: CellContext<Torder, string>) => (
                    <span>{info.getValue()}</span>
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
                id: "status",
                header: i18n.t("label.status"),
                accessorKey: "status",
                cell: (info: CellContext<Torder, string>) => {
                    return (
                        <OrderStatus value={info.getValue() as TorderStatus} />
                    );
                },
            },
            {
                header: "Order Date",
                accessorKey: "created_date",
                cell: (info: CellContext<Torder, string>) => {
                    return <span>{dateFormat(info.getValue())}</span>;
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
