import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { TorderWithDesc } from "@/configs/schema/orderSchema";
import { dateFormat } from "@/utils/utils";
import { minusAB } from "@/utils/calculations";
import OrderStatus from "@/components/OrderStatus";
import { TorderStatus } from "@/utils/types";

const clientOrderColumns: ColumnDef<TorderWithDesc>[] = [
    {
        id: "details",
        header: i18n.t("label.details"), // Details
        columns: [
            {
                id: "orderID",
                header: i18n.t("label.orderId"),
                accessorKey: "order_id",
                cell: (info: CellContext<TorderWithDesc, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                header: i18n.t("label.address"),
                accessorFn: (data: TorderWithDesc) =>
                    data.order_address +
                    ", " +
                    data.order_suburb +
                    ", " +
                    data.order_city +
                    ", " +
                    data.order_state +
                    ", " +
                    data.order_pc,
                accessorKey: "order_address",
                cell: (info: CellContext<TorderWithDesc, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                id: "status",
                header: i18n.t("label.status"),
                accessorKey: "order_status",
                cell: (info: CellContext<TorderWithDesc, string>) => {
                    return (
                        <OrderStatus value={info.getValue() as TorderStatus} />
                    );
                },
            },
            {
                header: "Order Date",
                accessorKey: "order_date",
                cell: (info: CellContext<TorderWithDesc, string>) => {
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
                accessorKey: "order_total",
                cell: (info: CellContext<TorderWithDesc, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                id: "Gst",
                header: i18n.t("label.gst"),
                accessorKey: "order_gst",
                cell: (info: CellContext<TorderWithDesc, number>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                id: "Paid",
                header: i18n.t("label.paid"),
                accessorKey: "order_paid",
                cell: (info: CellContext<TorderWithDesc, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                header: i18n.t("label.balance"),
                accessorKey: "balance",
                cell: (info: CellContext<TorderWithDesc, string>) => (
                    <span>
                        {minusAB(
                            info.row.original.order_total,
                            info.row.original.order_paid
                        )}
                    </span>
                ),
            },
        ],
    },
    {
        id: "Menu",
        header: i18n.t("label.menu"),
        //cell: (info: CellContext<TorderWithDesc, string>) => <></>,
    },
];

export default clientOrderColumns;
