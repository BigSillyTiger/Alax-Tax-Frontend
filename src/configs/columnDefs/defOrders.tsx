import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { Torder } from "../schema/orderSchema";
import { minusAB } from "@/lib/calculations";
import { dateFormat } from "@/lib/time";
import { Atel } from "@/components/aLinks";
import { StatusBadge } from "@/components/Badge";
import { TstatusColor } from "../types";
import { ExpandBtn, OrderStatusBtn } from "@/components/table/tableBtn";
import { moneyColors } from "../utils/color";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const useOrderColumnsDef = () => {
    const orderColumns: ColumnDef<Torder>[] = [
        {
            id: "details",
            header: i18n.t("label.details"), // Details
            columns: [
                {
                    id: "orderID",
                    header: i18n.t("label.idOrder"),
                    accessorKey: "oid",
                    cell: (info: CellContext<Torder, unknown>) => (
                        <ExpandBtn
                            row={info.row}
                            name={info.getValue<string>()}
                        />
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
                        <span className="text-wrap">
                            {info.getValue<string>()}
                        </span>
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
                        <span className="text-wrap">{info.getValue()}</span>
                    ),
                },
                {
                    id: "orderStatus",
                    header: i18n.t("label.status"),
                    accessorKey: "status",
                    cell: (info: CellContext<Torder, unknown>) => {
                        return (
                            <OrderStatusBtn
                                mLabel={
                                    <StatusBadge
                                        value={info.getValue() as TstatusColor}
                                    />
                                }
                                data={info.row.original as Torder}
                            />
                        );
                    },
                    meta: {
                        filterVariant: "select",
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
                        <span className="text-base">{info.getValue()}</span>
                    ),
                },
                {
                    id: "Gst",
                    header: i18n.t("label.gst"),
                    accessorKey: "gst",
                    cell: (info: CellContext<Torder, number>) => (
                        <span className="text-base">{info.getValue()}</span>
                    ),
                },
                {
                    id: "Paid",
                    header: i18n.t("label.paid"),
                    accessorKey: "paid",
                    cell: (info: CellContext<Torder, string>) => (
                        <span className="text-base">{info.getValue()}</span>
                    ),
                },
                {
                    header: i18n.t("label.balance"),
                    accessorKey: "balance",
                    cell: (info: CellContext<Torder, string>) => {
                        const balance = minusAB(
                            info.row.original.total,
                            info.row.original.paid
                        );
                        return (
                            <span
                                className={`${balance ? moneyColors.unpaid : moneyColors.finished} text-base font-bold flex justify-center items-center`}
                            >
                                {balance ? (
                                    balance
                                ) : (
                                    <CheckCircleIcon className="size-10" />
                                )}
                            </span>
                        );
                    },
                },
            ],
        },
        {
            id: "Menu",
            header: i18n.t("label.menu"),
            //cell: (info: CellContext<Torder, string>) => <></>,
        },
    ];
    return orderColumns;
};

export default useOrderColumnsDef;
