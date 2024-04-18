import { useAtom } from "jotai";
import genOptions from "./genOptions";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { atModalOpen } from "@/configs/atoms";
import { TmenuOptions } from "@/configs/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Tprops<T> = TmenuOptions & {
    mItem: T;
    setData: (data: T) => void;
};

const MenuBtn = <T,>({
    mItem,
    edit = false,
    del = false,
    pay = false,
    invoice = false,
    quotation = false,
    assign = false,
    payslip = false,
    setData,
}: Tprops<T>) => {
    const [, setModalOpen] = useAtom(atModalOpen);

    const mList = genOptions({
        edit,
        del,
        pay,
        invoice,
        quotation,
        assign,
        payslip,
        setModalOpen,
        setData,
    });

    const menuContent = mList.map((item, index) => {
        return (
            <DropdownMenuItem key={index}>
                {
                    <div
                        onClick={() => {
                            item.clickFn(mItem);
                        }}
                        className="flex w-full items-center rounded-md px-2 text-sm font-bold"
                    >
                        <div className="mr-2 size-5">{item.icon}</div>
                        {item.label}
                    </div>
                }
            </DropdownMenuItem>
        );
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none ring-0 cursor-pointer">
                <EllipsisVerticalIcon
                    className="size-7 text-indigo-500"
                    aria-hidden="true"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent>{menuContent}</DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MenuBtn;
