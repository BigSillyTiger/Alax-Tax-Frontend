import { CellContext, ColumnDef } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { TwlTableRow } from "../schema/workSchema";
import { calWorkTime, dateFormat } from "@/lib/time";
import { TstatusColor, TtimeBtnStyles } from "@/configs/types";
import { StatusBadge } from "@/components/Badge";
import { TimeBtn } from "@/components/btns/";
import { WLStatusBtn } from "@/components/table/tableBtn";
import { colorWithStaffUid } from "../utils/color";
import HoverTips from "@/components/HoverTips";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const useWLConlumnsDef = () => {
    const wlColumns: ColumnDef<TwlTableRow>[] = [
        {
            id: "Menu",
            header: i18n.t("label.menu"),
            //cell: (info: CellContext<TwlTableRow, string>) => <></>,
        },
        {
            id: "details",
            header: i18n.t("label.details"), // Details
            columns: [
                {
                    id: "wlID",
                    header: i18n.t("label.wlid"),
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
                        <span
                            className={`${colorWithStaffUid(info.getValue<string>()).text}`}
                        >
                            {info.getValue<string>()}
                        </span>
                    ),
                },
                {
                    id: "name",
                    header: i18n.t("label.name"),
                    accessorFn: (data: TwlTableRow) =>
                        data.first_name + " " + data.last_name,
                    cell: (info: CellContext<TwlTableRow, unknown>) => {
                        return info.row.original.wl_note ? (
                            <div className="flex flex-row justify-center items-center">
                                <HoverTips
                                    tipsContent={info.row.original.wl_note}
                                    delay={0}
                                >
                                    <div className="flex flex-row gap-x-1 justify-center items-center">
                                        <ExclamationCircleIcon className="pl-2 size-8 text-amber-500" />
                                        <span>{info.getValue<string>()}</span>
                                    </div>
                                </HoverTips>
                            </div>
                        ) : (
                            <span className="text-wrap">
                                {info.getValue<string>()}
                            </span>
                        );
                    },
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
                        <span className="text-wrap">
                            {info.getValue<string>()}
                        </span>
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
                    accessorFn: (data: TwlTableRow) => dateFormat(data.wl_date),
                    cell: (info: CellContext<TwlTableRow, unknown>) => (
                        <span className="text-wrap">
                            {dateFormat(info.getValue<string>(), "au")}
                        </span>
                    ),
                },
                {
                    id: "wlStatus",
                    header: i18n.t("label.status"),
                    accessorKey: "wl_status",
                    cell: (info: CellContext<TwlTableRow, unknown>) => (
                        <WLStatusBtn
                            mLabel={
                                <StatusBadge
                                    value={info.getValue() as TstatusColor}
                                />
                            }
                            data={info.row.original as TwlTableRow}
                        />
                    ),
                    meta: {
                        filterVariant: "select",
                    },
                },
                {
                    id: "startTime",
                    header: i18n.t("label.timeStart"),
                    accessorKey: "s_time",
                    cell: (info: CellContext<TwlTableRow, unknown>) => (
                        <TimeBtn
                            type={info.cell.column.id as TtimeBtnStyles}
                            data={info.row.original as TwlTableRow}
                        />
                    ),
                },
                {
                    id: "endTime",
                    header: i18n.t("label.timeEnd"),
                    accessorKey: "e_time",
                    cell: (info: CellContext<TwlTableRow, unknown>) => (
                        <TimeBtn
                            type={info.cell.column.id as TtimeBtnStyles}
                            data={info.row.original as TwlTableRow}
                        />
                    ),
                },
                {
                    id: "breakTime",
                    header: i18n.t("label.timeBreak"),
                    accessorKey: "b_hour",
                    cell: (info: CellContext<TwlTableRow, unknown>) => (
                        <TimeBtn
                            type={info.cell.column.id as TtimeBtnStyles}
                            data={info.row.original as TwlTableRow}
                        />
                    ),
                },
                {
                    id: "workTime",
                    header: i18n.t("label.workHours"),
                    accessorFn: (data: TwlTableRow) =>
                        calWorkTime(data.s_time, data.e_time, data.b_hour),
                    cell: (info: CellContext<TwlTableRow, unknown>) => (
                        <TimeBtn
                            type={info.cell.column.id as TtimeBtnStyles}
                            data={info.row.original as TwlTableRow}
                        />
                    ),
                },
            ],
        },
    ];
    return wlColumns;
};

export default useWLConlumnsDef;
