import { CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { TwlTableRow } from "../schema/workSchema";
//import { minusAB } from "@/utils/calculations";
import { calWorkTime } from "@/utils/utils";
import { wlStatusColorMap } from "../utils";
import { TwlStatus } from "@/utils/types";

const wlColumns = [
    {
        id: "details",
        header: i18n.t("label.details"), // Details
        columns: [
            {
                id: "wlID",
                header: i18n.t("label.wlID"),
                accessorKey: "wlid",
                cell: (info: CellContext<TwlTableRow, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
            {
                id: "uid",
                header: i18n.t("label.uid"),
                accessorKey: "fk_uid",
                cell: (info: CellContext<TwlTableRow, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
            {
                id: "name",
                header: i18n.t("label.name"),
                accessorFn: (data: TwlTableRow) =>
                    data.first_name + " " + data.last_name,
                cell: (info: CellContext<TwlTableRow, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
            {
                id: "oid",
                header: i18n.t("label.idOrder"),
                accessorKey: "fk_oid",
                cell: (info: CellContext<TwlTableRow, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
            {
                id: "orderAddress",
                header: i18n.t("label.addrJob"),
                accessorFn: (data: TwlTableRow) =>
                    data.address +
                    ", " +
                    data.suburb +
                    ", " +
                    data.city +
                    ", " +
                    data.state +
                    ", " +
                    data.postcode,
                cell: (info: CellContext<TwlTableRow, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
        ],
    },
    {
        id: "workStatus",
        header: i18n.t("label.workDetail"),
        columns: [
            {
                id: "workDate",
                header: i18n.t("label.workDate"),
                accessorKey: "wl_date",
                cell: (info: CellContext<TwlTableRow, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
            {
                id: "startTime",
                header: i18n.t("label.timeStart"),
                accessorKey: "s_time",
                cell: (info: CellContext<TwlTableRow, unknown>) => (
                    <span className="font-bold text-lg text-indigo-600">
                        {info.getValue<string>()}
                    </span>
                ),
            },
            {
                id: "endTime",
                header: i18n.t("label.timeEnd"),
                accessorKey: "e_time",
                cell: (info: CellContext<TwlTableRow, unknown>) => (
                    <span className="font-bold text-lg text-indigo-600">
                        {info.getValue<string>()}
                    </span>
                ),
            },
            {
                id: "breakTime",
                header: i18n.t("label.timeBreak"),
                accessorKey: "b_hour",
                cell: (info: CellContext<TwlTableRow, unknown>) => (
                    <span className="font-bold text-lg text-amber-600">
                        {info.getValue<string>()}
                    </span>
                ),
            },
            {
                id: "workTime",
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
                id: "wlStatus",
                header: i18n.t("label.status"),
                accessorKey: "wl_status",
                cell: (info: CellContext<TwlTableRow, unknown>) => (
                    <span
                        className={`border-2 text-center px-2 py-1 rounded-full font-bold ${wlStatusColorMap[info.getValue<string>() as TwlStatus]}`}
                    >
                        {info.getValue<string>()}
                    </span>
                ),
            },
        ],
    },
    {
        id: "Menu",
        header: i18n.t("label.menu"),
        //cell: (info: CellContext<TwlTableRow, string>) => <></>,
    },
];

export default wlColumns;
