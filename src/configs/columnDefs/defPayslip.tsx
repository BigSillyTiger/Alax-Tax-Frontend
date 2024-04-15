import i18n from "@/configs/i18n";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Tpayslip } from "../schema/payslipSchema";

const payslipColumns: ColumnDef<Tpayslip>[] = [
    {
        header: i18n.t("label.id"),
        accessorKey: "psid",
        cell: (info: CellContext<Tpayslip, unknown>) => {
            return <span>{info.getValue<string>()}</span>;
        },
    },
    {
        header: i18n.t("label.start"),
        accessorKey: "s_date",
        cell: (info: CellContext<Tpayslip, unknown>) => {
            return <span>{info.getValue<string>()}</span>;
        },
    },
    {
        header: i18n.t("label.end"),
        accessorKey: "e_date",
        cell: (info: CellContext<Tpayslip, unknown>) => {
            return <span>{info.getValue<string>()}</span>;
        },
    },
    {
        header: i18n.t("label.hr"),
        accessorKey: "hr",
        cell: (info: CellContext<Tpayslip, unknown>) => {
            return <span>{info.getValue<number>()}</span>;
        },
    },
    {
        header: i18n.t("label.status"),
        accessorKey: "status",
        cell: (info: CellContext<Tpayslip, unknown>) => {
            return <span>{info.getValue<string>()}</span>;
        },
    },
    {
        header: i18n.t("label.thisPay"),
        accessorKey: "paid",
        cell: (info: CellContext<Tpayslip, unknown>) => {
            return <span>{info.getValue<number>()}</span>;
        },
    },
    { id: "Menu", header: i18n.t("label.menu"), cell: () => <></> },
];

export default payslipColumns;
