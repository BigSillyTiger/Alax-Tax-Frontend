import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { TorderWithDesc } from "@/configs/schema/orderSchema";
import { dateFormat } from "@/utils/utils";
import { minusAB } from "@/utils/calculations";

const setColor = (value: string) => {
    switch (value) {
        case i18n.t("label.pending"):
            return "bg-yellow-200 text-yellow-700 ring-yellow-700";
        case i18n.t("label.processing"):
            return "bg-cyan-200 text-cyan-700 ring-cyan-700";
        case i18n.t("label.closed"):
            return "bg-red-200 text-red-700 ring-red-700";
        case i18n.t("label.completed"):
            return "bg-green-200 text-green-700 ring-green-700";
    }
};

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
                    const value = info.getValue();
                    return (
                        <span
                            className={`rounded-md ring-1 ring-inset font-bold py-1 px-2 ${setColor(
                                value
                            )}
                            `}
                        >
                            {value}
                        </span>
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
                header: i18n.t("label.due"),
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
