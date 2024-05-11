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

type Tprops<T> = {
    column: Column<T, unknown>;
    values: string[];
};

const SelectFilter = <T extends object>({ column, values }: Tprops<T>) => {
    const { t } = useTranslation();
    const all = t("btn.all");

    const options = values.map((value) => (
        //dynamically generated select options from faceted values feature
        <SelectItem value={value} key={value} className="">
            {capFirstLetter(value)}
        </SelectItem>
    ));

    options.unshift(
        <SelectItem value={"all"} key={all}>
            {all}
        </SelectItem>
    );

    return (
        <Select
            onValueChange={(e) => {
                e === "all"
                    ? column.setFilterValue("")
                    : column.setFilterValue(e);
            }}
        >
            <SelectTrigger className="w-full h-6 mt-1">
                <SelectValue placeholder={t("btn.choose")} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>{options}</SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectFilter;
