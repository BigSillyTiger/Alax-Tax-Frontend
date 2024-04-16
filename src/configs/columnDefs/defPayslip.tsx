import i18n from "@/configs/i18n";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Tpayslip } from "../schema/payslipSchema";
import Badge from "@/components/Badge";
import { TstatusColor } from "../types";

const payslipColumns: ColumnDef<Tpayslip>[] = [
    {
        id: "psDisplay",
        header: i18n.t("label.checkPDF"),
        accessorKey: "psid",
        cell: () => <></>,
    },
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
        id: "psStatus",
        header: i18n.t("label.status"),
        accessorKey: "status",
        cell: (info: CellContext<Tpayslip, unknown>) => {
            return <Badge value={info.getValue() as TstatusColor} />;
        },
    },
    {
        header: i18n.t("label.thisPay"),
        accessorKey: "paid",
        cell: (info: CellContext<Tpayslip, unknown>) => {
            return <span>{info.getValue<number>()}</span>;
        },
    },
    { id: "PayslipDel", header: i18n.t("btn.del"), cell: () => <></> },
];

export default payslipColumns;
