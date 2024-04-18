import type { FC, ReactNode } from "react";
import { useSubmit } from "react-router-dom";
import { useRouterStore } from "@/configs/zustore";
import { capFirstLetter, genAction } from "@/lib/literals";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { WL_STATUS_TABLE } from "@/configs/utils/setting";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { statusColor } from "@/configs/utils/color";

type Tprops = {
    mLabel: ReactNode | string;
    data: TwlTableRow;
};

/**
 * @description this menu btn group component is highly designed for worklog status change usage
 * @param param0
 * @returns
 */
const WLStatusBtn: FC<Tprops> = ({ mLabel, data }) => {
    const submit = useSubmit();
    const currentRouter = useRouterStore((state) => state.currentRouter);

    const handleClick = async (wlid: string, status: string) => {
        submit(
            { req: "wlStatus", wlid, status },
            {
                method: "PUT",
                action: genAction(currentRouter),
            }
        );
    };

    const menuContent = (() => {
        if (data.wl_status === "unpaid" || data.wl_status === "completed") {
            return null;
        }
        return WL_STATUS_TABLE.map((item, index) => {
            if (item.toLocaleLowerCase() === data.wl_status.toLocaleLowerCase())
                return;

            return (
                <DropdownMenuItem
                    key={index}
                    className={`${statusColor[item].text} ${statusColor[item].fbg} ${statusColor[item].ftext}`}
                >
                    <div
                        onClick={() => {
                            handleClick(data.wlid, item);
                        }}
                        className="flex w-full items-center rounded-md px-2 text-md font-bold"
                    >
                        {capFirstLetter(item)}
                    </div>
                </DropdownMenuItem>
            );
        }).filter((item) => item !== null && item !== undefined);
    })();

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

export default WLStatusBtn;
