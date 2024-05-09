import { ColumnDef, CellContext } from "@tanstack/react-table";
import i18n from "@/configs/i18n";
import { TstaffWPayslip } from "../schema/staffSchema";
import { colorWithStaffUid } from "../utils/color";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import { Atel, Amail } from "@/components/aLinks";
import { ExpandBtn } from "@/components/table/tableBtn";
import HoverTips from "@/components/HoverTips";

/**
 * @description
 * @param header - id
 */
const useStaffColumnsDef = () => {
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
                                className={`${colorWithStaffUid(info.getValue<string>()).text}`}
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
                                    tipsContent={i18n.t("tips.unfinishedPS")}
                                    delay={0}
                                >
                                    <BellAlertIcon className="pl-2 size-7 animate-bell-swing text-red-500" />
                                </HoverTips>
                            </div>
                        );
                    }
                }

                return (
                    <span className="text-wrap">{info.getValue<string>()}</span>
                );
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
                <span className="text-wrap">{info.getValue<string>()}</span>
            ),
        },
        {
            id: "Menu",
            header: i18n.t("label.menu"),
            cell: () => <></>,
        },
    ];
    return staffColumns;
};

export default useStaffColumnsDef;
