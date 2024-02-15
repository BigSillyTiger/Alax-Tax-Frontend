import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { TtotalOrder } from "../schema/orderSchema";
import { minusAB } from "@/utils/calculations";
import { dateFormat } from "@/utils/utils";
import OrderStatus from "@/components/OrderStatus";
import { TorderStatus } from "@/utils/types";

const orderColumns: ColumnDef<TtotalOrder>[] = [
    {
        id: "details",
        header: i18n.t("label.details"), // Details
        columns: [
            {
                header: "Details",
                cell: () => {
                    return <></>;
                },
            },
            {
                header: i18n.t("label.idOrder"),
                accessorKey: "order_id",
                cell: (info: CellContext<TtotalOrder, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
            {
                header: i18n.t("label.client"),
                accessorFn: (data: TtotalOrder) =>
                    data.first_name + " " + data.last_name,
                accessorKey: "full_name",
                cell: (info: CellContext<TtotalOrder, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
            {
                header: i18n.t("label.idClient"),
                accessorKey: "fk_client_id",
                cell: (info: CellContext<TtotalOrder, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
            {
                header: i18n.t("label.phone1"),
                accessorKey: "phone",
                cell: (info: CellContext<TtotalOrder, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
            {
                header: i18n.t("label.orderDate"),
                accessorKey: "order_date",
                cell: (info: CellContext<TtotalOrder, unknown>) => (
                    <span>{dateFormat(info.getValue<string>())}</span>
                ),
            },
            {
                header: i18n.t("label.status"),
                accessorKey: "order_status",
                cell: (info: CellContext<TtotalOrder, unknown>) => {
                    return (
                        <OrderStatus value={info.getValue() as TorderStatus} />
                    );
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
                cell: (info: CellContext<TtotalOrder, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                id: "Gst",
                header: i18n.t("label.gst"),
                accessorKey: "order_gst",
                cell: (info: CellContext<TtotalOrder, number>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                id: "Paid",
                header: i18n.t("label.paid"),
                accessorKey: "order_paid",
                cell: (info: CellContext<TtotalOrder, string>) => (
                    <span>{info.getValue()}</span>
                ),
            },
            {
                header: i18n.t("label.balance"),
                accessorKey: "balance",
                cell: (info: CellContext<TtotalOrder, string>) => (
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

export default orderColumns;
