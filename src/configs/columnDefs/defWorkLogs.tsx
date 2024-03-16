import { CellContext } from "@tanstack/react-table";
import i18n from "@/utils/i18n";
import { TwlTableRow } from "../schema/workSchema";
//import { minusAB } from "@/utils/calculations";
import { calWorkTime, dateFormatAU } from "@/utils/utils";

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
                    <span>{dateFormatAU(info.getValue<string>())}</span>
                ),
            },
            {
                id: "startTime",
                header: i18n.t("label.timeStart"),
                accessorKey: "s_time",
                cell: (info: CellContext<TwlTableRow, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
            {
                id: "endTime",
                header: i18n.t("label.timeEnd"),
                accessorKey: "e_time",
                cell: (info: CellContext<TwlTableRow, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
            {
                id: "breakTime",
                header: i18n.t("label.timeBreak"),
                accessorKey: "b_time",
                cell: (info: CellContext<TwlTableRow, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
            {
                id: "workTime",
                header: i18n.t("label.workTime"),
                accessorFn: (data: TwlTableRow) =>
                    calWorkTime(data.s_time, data.e_time, data.b_time),
                cell: (info: CellContext<TwlTableRow, unknown>) => (
                    <span>{info.getValue<string>()}</span>
                ),
            },
            {
                id: "wlStatus",
                header: i18n.t("label.wlStatus"),
                accessorKey: "wl_status",
                cell: (info: CellContext<TwlTableRow, unknown>) => (
                    <span>{info.getValue<string>()}</span>
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
