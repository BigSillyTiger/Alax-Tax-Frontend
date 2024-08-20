import type { FC, ReactNode } from "react";
import { useSubmit } from "react-router-dom";
import { useRouterStore } from "@/configs/zustore";
import { capFirstLetter, genAction } from "@/lib/literals";
import { ORDER_STATUS } from "@/configs/utils/setting";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { statusColor } from "@/configs/utils/color";
import { TclientService } from "@/configs/schema/serviceSchema";

type Tprops = {
    mLabel: ReactNode | string;
    data: TclientService;
};

// this menu btn group component is highly designed for order status change usage
const ServiceStatusBtn: FC<Tprops> = ({ mLabel, data }) => {
    const submit = useSubmit();
    const currentRouter = useRouterStore((state) => state.currentRouter);

    const handleClick = async (csid: string, status: string) => {
        submit(
            { req: "ServiceStatus", csid, status },
            {
                method: "PUT",
                action:
                    currentRouter === "client"
                        ? genAction(currentRouter, data.fk_cid)
                        : genAction(currentRouter),
            }
        );
    };

    const menuContent = ORDER_STATUS.map((item, index) => {
        if (item.toLocaleLowerCase() === data.status.toLocaleLowerCase())
            return;

        return (
            <DropdownMenuItem
                key={index}
                className={`${statusColor[item].text} ${statusColor[item].fbg} ${statusColor[item].ftext}`}
            >
                <div
                    onClick={() => {
                        //e.preventDefault();
                        handleClick(data.csid, item);
                    }}
                    className="flex w-full items-center rounded-md px-2 text-md font-bold"
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

export default ServiceStatusBtn;
