import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { TstaffWPayslip } from "../schema/staffSchema";
import { colorWithStaffUid } from "../utils/color";
import { BellAlertIcon } from "@heroicons/react/24/solid";
//import { TstaffRole } from "@/configs/types";
//import { capFirstLetter } from "@/lib/literals";
//import { staffColorMap } from "../utils/color";
import { Atel, Amail } from "@/components/aLinks";
import { ExpandBtn } from "@/components/table/tableBtn";
import HoverTips from "@/components/HoverTips";

/**
 * @description
 * @param header - id
 */
const staffColumns: ColumnDef<TstaffWPayslip>[] = [
    {
        id: "UID",
        header: i18n.t("label.uid"),
        accessorFn: (data: TstaffWPayslip) => data.uid,
        cell: (info: CellContext<TstaffWPayslip, unknown>) => {
            return (
                <ExpandBtn
                    row={info.row}
                    name={
                        <span
                            className={`${colorWithStaffUid(info.getValue<string>())}`}
                        >
                            {info.getValue<string>()}
                        </span>
                    }
                />
            );
        },
    },
    {
        header: i18n.t("label.name"),
        accessorFn: (data: TstaffWPayslip) =>
            data.first_name + " " + data.last_name,
        cell: (info: CellContext<TstaffWPayslip, unknown>) => {
            for (const payslip of info.row.original.payslips) {
                if (payslip.status?.toLocaleLowerCase() === "pending") {
                    return (
                        <div className="flex flex-row justify-center items-center">
                            <span>{info.getValue<string>()}</span>
                            <HoverTips
                                content={
                                    <BellAlertIcon className="h-5 w-5 text-red-500" />
                                }
                                tipsContent={i18n.t("tips.unfinishedPS")}
                            />
                        </div>
                    );
                }
            }

            return <span className="">{info.getValue<string>()}</span>;
        },
    },
    {
        header: i18n.t("label.phone1"),
        accessorKey: "phone",
        cell: (info: CellContext<TstaffWPayslip, unknown>) => (
            <Atel href={info.getValue<string>()} />
        ),
    },
    {
        header: i18n.t("label.email1"),
        accessorKey: "email",
        cell: (info: CellContext<TstaffWPayslip, unknown>) => (
            <Amail href={info.getValue<string>()} />
        ),
    },
    {
        header: i18n.t("label.address"),
        accessorFn: (data: TstaffWPayslip) =>
            data.address +
            ", " +
            data.suburb +
            ", " +
            data.city +
            ", " +
            data.postcode,
        cell: (info: CellContext<TstaffWPayslip, unknown>) => (
            <span>{info.getValue<string>()}</span>
        ),
    },
    /* {
        header: i18n.t("label.role"),
        accessorKey: "role",
        cell: (info: CellContext<TstaffWPayslip, unknown>) => {
            const style = staffColorMap[info.getValue<string>() as TstaffRole];
            return (
                <span className={`${style}`}>
                    {capFirstLetter(info.getValue<string>())}
                </span>
            );
        },
    }, */
    {
        id: "Menu",
        header: i18n.t("label.menu"),
        cell: () => <></>,
    },
];

export default staffColumns;
