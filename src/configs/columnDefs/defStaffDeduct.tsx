import { CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { Tdeduction } from "../schema/workSchema";

const useStaffDeductColumnsDef = () => {
    const staffDeductColumns = [
        {
            id: "wlID",
            header: i18n.t("label.wlid"),
            accessorKey: "fk_wlid",
            cell: (info: CellContext<Tdeduction, unknown>) => (
                <span>{info.getValue<string>()}</span>
            ),
        },
        {
            id: "deductNote",
            header: i18n.t("label.note"),
            accessorKey: "note",
            cell: (info: CellContext<Tdeduction, unknown>) => (
                <span className="max-w-15dvw text-wrap">
                    {info.getValue<string>()}
                </span>
            ),
        },
        {
            id: "deductAmount",
            header: i18n.t("label.amount"),
            accessorKey: "amount",
            cell: (info: CellContext<Tdeduction, unknown>) => (
                <span className="font-bold text-lg text-slate-50 bg-red-400 border-2 border-red-600 rounded-lg px-2 py-1">
                    ${info.getValue<number>()}
                </span>
            ),
        },
    ];
    return staffDeductColumns;
};

export default useStaffDeductColumnsDef;
