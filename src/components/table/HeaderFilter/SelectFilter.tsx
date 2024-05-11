import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectValue,
    SelectItem,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { Column } from "@tanstack/react-table";
import { capFirstLetter } from "@/lib/literals";
import { statusColor } from "@/configs/utils/color";

type Tprops<T> = {
    column: Column<T, unknown>;
    values: string[];
};

const SelectFilter = <T extends object>({ column, values }: Tprops<T>) => {
    const { t } = useTranslation();
    const all = t("btn.all");

    const options = values.map((value) => {
        const v = value.toLocaleLowerCase() as keyof typeof statusColor;
        return (
            //dynamically generated select options from faceted values feature
            <SelectItem
                value={value}
                key={value}
                className={`${statusColor[v].text} ${statusColor[v].fbg} ${statusColor[v].ftext}`}
            >
                {capFirstLetter(value)}
            </SelectItem>
        );
    });

    return (
        <Select
            onValueChange={(e) => {
                e === "all"
                    ? column.setFilterValue("")
                    : column.setFilterValue(e);
            }}
            defaultValue="all"
        >
            <SelectTrigger className="w-full h-6 mt-1">
                <SelectValue placeholder={t("btn.choose")} />
            </SelectTrigger>
            <SelectContent>
                {/* all */}
                <SelectGroup className="border-b-2 border-indigo-200 border-dashed">
                    <SelectItem value={"all"} key={all} className="">
                        {all}
                    </SelectItem>
                </SelectGroup>
                {/* others */}
                <SelectGroup>{options}</SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectFilter;
