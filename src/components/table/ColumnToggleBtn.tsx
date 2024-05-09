import { Table } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
    DropdownMenuGroup,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";

type Tprops<T> = {
    table: Table<T>;
};

const ColumnToggleBtn = <T extends object>({ table }: Tprops<T>) => {
    const { t } = useTranslation();

    return (
        <DropdownMenu>
            {/* trigger */}
            <DropdownMenuTrigger className="outline-none ring-0 cursor-pointer">
                <div className="flex flex-row justify-center items-center px-2 py-1 border-2 border-indigo-700 rounded-lg bg-indigo-400 text-slate-50">
                    <ViewColumnsIcon
                        className="size-7 text-slate-50 mr-2"
                        aria-hidden="true"
                    />
                    {t("btn.toggleColumn")}
                </div>
            </DropdownMenuTrigger>
            {/* */}
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuCheckboxItem
                        checked={table.getIsAllColumnsVisible()}
                        onCheckedChange={table.getToggleAllColumnsVisibilityHandler()}
                    >
                        {t("btn.toggleAll")}
                    </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {table.getAllLeafColumns().map((column) => {
                        return (
                            <DropdownMenuItem
                                key={column.id}
                                className="px-1"
                                // stop menu option from closing after click
                                onSelect={(e) => e.preventDefault()}
                            >
                                <label className="flex flex-row justify-start items-centerw-full w-full h-full cursor-pointer">
                                    <input
                                        {...{
                                            type: "checkbox",
                                            checked: column.getIsVisible(),
                                            onChange:
                                                column.getToggleVisibilityHandler(),
                                        }}
                                        className="mr-2"
                                    />{" "}
                                    {column.columnDef.header?.toString() ??
                                        column.id}
                                </label>
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ColumnToggleBtn;
