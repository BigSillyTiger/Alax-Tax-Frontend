import { useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCtPaymentStore } from "@/configs/zustore";

const SelectBtn = () => {
    const yearAll = useCtPaymentStore((state) => state.yearAll).sort(
        (a, b) => parseInt(b) - parseInt(a)
    );

    const currentYear = useCtPaymentStore((state) => state.currentYear);
    const setCurrnetYear = useCtPaymentStore((state) => state.setCurrentYear);
    useEffect(() => {
        if (yearAll.length) {
            setCurrnetYear(yearAll[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yearAll]);

    if (yearAll.length === 0) return null;

    const menuContent = yearAll
        .map((item, index) => {
            return (
                <DropdownMenuItem key={index}>
                    <div
                        onClick={() => {
                            //e.preventDefault();
                            setCurrnetYear(item);
                        }}
                        className="flex w-full justify-center items-center rounded-md px-2 text-md font-bold"
                    >
                        {item}
                    </div>
                </DropdownMenuItem>
            );
        })
        .filter((item) => item !== null && item !== undefined);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none ring-0 cursor-pointer">
                {currentYear}
            </DropdownMenuTrigger>
            {menuContent ? (
                <DropdownMenuContent>{menuContent}</DropdownMenuContent>
            ) : null}
        </DropdownMenu>
    );
};

export default SelectBtn;
