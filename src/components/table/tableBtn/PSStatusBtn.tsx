import type { FC, ReactNode } from "react";
import { useSubmit } from "react-router-dom";
import { useRouterStore } from "@/configs/zustore";
import { capFirstLetter, genAction } from "@/lib/literals";
import { PS_STATUS_TABLE } from "@/configs/utils/setting";
import { Tpayslip } from "@/configs/schema/payslipSchema";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Tprops = {
    mLabel: ReactNode | string;
    data: Tpayslip;
};

/**
 * @description this menu btn group component is highly designed for worklog status change usage
 * @param param0
 * @returns
 */
const PSStatusBtn: FC<Tprops> = ({ mLabel, data }) => {
    const submit = useSubmit();
    const currentRouter = useRouterStore((state) => state.currentRouter);

    const handleClick = async (psid: string, status: string) => {
        submit(
            { req: "psStatus", psid, status },
            {
                method: "PUT",
                action: genAction(currentRouter),
            }
        );
    };

    const menuContent = PS_STATUS_TABLE.map((item, index) => {
        if (item.toLocaleLowerCase() === data.status.toLocaleLowerCase())
            return;
        return (
            <DropdownMenuItem key={index}>
                <div
                    onClick={() => {
                        handleClick(data.psid, item);
                    }}
                    className="flex w-full items-center rounded-md px-2 text-sm font-bold"
                >
                    {capFirstLetter(item)}
                </div>
            </DropdownMenuItem>
        );
    }).filter((item) => item !== null && item !== undefined);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none ring-0 cursor-pointer">
                {mLabel}
            </DropdownMenuTrigger>
            {menuContent ? (
                <DropdownMenuContent>{menuContent}</DropdownMenuContent>
            ) : null}
        </DropdownMenu>
    );
};

export default PSStatusBtn;
