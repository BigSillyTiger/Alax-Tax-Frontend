import i18n from "@/configs/i18n";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Tpayslip } from "../schema/payslipSchema";
import { StatusBadge } from "@/components/Badge";
import { TstatusColor } from "../types";
import { PSDisplayBtn, PSStatusBtn } from "@/components/table/tableBtn";

const usePaySlipColumnsDef = () => {
    const payslipColumns: ColumnDef<Tpayslip>[] = [
        {
            header: i18n.t("label.id"),
            accessorKey: "psid",
            cell: (info: CellContext<Tpayslip, unknown>) => {
                return (
                    <PSDisplayBtn
                        payslip={info.row.original as Tpayslip}
                        name={info.getValue<string>()}
                    />
                );
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
                return <span>${info.getValue<number>()}/H</span>;
            },
        },
        {
            id: "psStatus",
            header: i18n.t("label.status"),
            accessorKey: "status",
            cell: (info: CellContext<Tpayslip, unknown>) => (
                <PSStatusBtn
                    mLabel={
                        <StatusBadge value={info.getValue() as TstatusColor} />
                    }
                    data={info.row.original as Tpayslip}
                />
            ),
        },
        {
            header: i18n.t("label.thisPay"),
            accessorKey: "paid",
            cell: (info: CellContext<Tpayslip, unknown>) => {
                return <span>${info.getValue<number>()}</span>;
            },
        },
        { id: "PayslipDel", header: i18n.t("btn.del"), cell: () => <></> },
    ];
    return payslipColumns;
};

export default usePaySlipColumnsDef;
