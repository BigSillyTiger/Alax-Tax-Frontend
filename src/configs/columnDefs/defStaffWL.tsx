import { CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { TwlTableRow } from "../schema/workSchema";
import { auToISO, calWorkTime, dateFormat } from "@/lib/time";
import { convertWorkHour, timesAB } from "@/lib/calculations";
import { rangeFilterFn } from "./filterFn";

/**
 * @description this column definition is for the staff work log table in payslip modal
 */
const useStaffWLColumns = () => {
    const staffWLColumns = [
        {
            id: "wlid",
            header: i18n.t("label.wlid"),
            accessorKey: "wlid",
            cell: (info: CellContext<TwlTableRow, unknown>) => (
                <span>{info.getValue<string>()}</span>
            ),
        },
        {
            id: "workDate",
            header: i18n.t("label.workDate"),
            accessorFn: (data: TwlTableRow) => {
                // the date passed in is already in AU format
                // but the table only accept ISO format
                return auToISO(data.wl_date);
            },
            cell: (info: CellContext<TwlTableRow, unknown>) => {
                return <span>{info.getValue<string>()}</span>;
            },
        },
        {
            id: "startTimeSR",
            header: i18n.t("label.timeStart"),
            accessorKey: "s_time",
            cell: (info: CellContext<TwlTableRow, unknown>) => (
                <span className="font-bold text-lg text-indigo-600">
                    {info.getValue<string>()}
                </span>
            ),
        },
        {
            id: "endTimeSR",
            header: i18n.t("label.timeEnd"),
            accessorKey: "e_time",
            cell: (info: CellContext<TwlTableRow, unknown>) => (
                <span className="font-bold text-lg text-indigo-600">
                    {info.getValue<string>()}
                </span>
            ),
        },
        {
            id: "breakTimeSR",
            header: i18n.t("label.timeBreak"),
            accessorKey: "b_hour",
            cell: (info: CellContext<TwlTableRow, unknown>) => (
                <span className="font-bold text-lg text-amber-600">
                    {info.getValue<string>()}
                </span>
            ),
        },
        {
            id: "workTimeSR",
            header: i18n.t("label.workTime"),
            accessorFn: (data: TwlTableRow) =>
                calWorkTime(data.s_time, data.e_time, data.b_hour),
            cell: (info: CellContext<TwlTableRow, unknown>) => (
                <span className="font-bold text-lg text-lime-700">
                    {info.getValue<string>()}
                </span>
            ),
        },
        {
            id: "salary",
            header: i18n.t("label.salary"),
            accessorFn: (data: TwlTableRow) =>
                timesAB(
                    convertWorkHour(
                        calWorkTime(data.s_time, data.e_time, data.b_hour)
                    ),
                    data.hr
                ),
            cell: (info: CellContext<TwlTableRow, unknown>) => (
                <span className="font-bold text-lg text-slate-50 bg-teal-500 border-2 border-teal-600 rounded-lg px-2 py-1">
                    ${info.getValue<string>()}
                </span>
            ),
            filterFn: rangeFilterFn,
            meta: {
                filterVariant: "range",
            },
        },
    ];
    return staffWLColumns;
};

export default useStaffWLColumns;
