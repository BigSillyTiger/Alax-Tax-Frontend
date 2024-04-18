import type { FC } from "react";
import { useTranslation } from "react-i18next";
import {
    BellIcon,
    ClipboardDocumentListIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useGlobalAlertStore } from "@/configs/zustore";
import { routerPaths } from "@/configs/utils/router";

/**
 * @description AlertBell component Display the number of:
 *              - pending payslips
 *              - unconfirmed worklogs
 * @returns
 */
const AlertBell: FC = () => {
    const [t] = useTranslation();
    const navigate = useNavigate();

    const unPayslip = useGlobalAlertStore((state) => state.unPayslip).filter(
        (item) => item.status === "pending"
    );

    const unWorklog = useGlobalAlertStore((state) => state.unWorklog).filter(
        (item) => item.wl_status === "unconfirmed"
    );

    const totalCount = unPayslip.length + unWorklog.length;

    const Bell = () => (
        <div className="flex flex-row justify-center items-center">
            <span className="sr-only">{t("sr.notificationBell")}</span>
            {totalCount !== 0 ? (
                <>
                    <BellAlertIcon
                        className="size-6 animate-bell-swing text-red-500"
                        aria-hidden="true"
                    />
                    {totalCount !== 0 && (
                        <sup className="text-red-500 pl-1">{totalCount}</sup>
                    )}
                </>
            ) : (
                <BellIcon className="size-6 text-gray-400" />
            )}
        </div>
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none ring-0">
                <Bell />
            </DropdownMenuTrigger>
            {totalCount ? (
                <DropdownMenuContent>
                    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
                    {unWorklog.length ? (
                        <DropdownMenuItem
                            onClick={() => navigate(routerPaths.workLogs)}
                        >
                            <ClipboardDocumentListIcon className="size-6 mr-1 text-red-500" />
                            {t("label.workLogs") + ": "}
                            <b>{unWorklog.length}</b>
                        </DropdownMenuItem>
                    ) : null}
                    {unPayslip.length ? (
                        <DropdownMenuItem
                            onClick={() => navigate(routerPaths.staff)}
                        >
                            <CurrencyDollarIcon className="size-6 mr-1 text-red-500" />
                            {t("label.payslip") + ": "}
                            <b>{unPayslip.length}</b>
                        </DropdownMenuItem>
                    ) : null}
                </DropdownMenuContent>
            ) : null}
        </DropdownMenu>
    );
};

export default AlertBell;
