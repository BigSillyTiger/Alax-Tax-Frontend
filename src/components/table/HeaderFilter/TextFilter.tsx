import { useTranslation } from "react-i18next";
import DebouncedInput from "./DebouncedInput";
import { Column } from "@tanstack/react-table";

type Tprops<T> = {
    column: Column<T, unknown>;
    values: string[];
    filterValue: string;
};

const TextFilter = <T extends object>({
    column,
    values,
    filterValue,
}: Tprops<T>) => {
    const { t } = useTranslation();

    return (
        <>
            {/* text */}
            {/* Autocomplete suggestions from faceted values feature */}
            <datalist id={column.id + "list"}>
                {values.map((value: string, index: number) => (
                    <option value={value} key={value + index} />
                ))}
            </datalist>
            <DebouncedInput
                type="text"
                value={(filterValue ?? "") as string}
                onChange={(value) => column.setFilterValue(value)}
                placeholder={`${t("placeholder.search")} (${column.getFacetedUniqueValues().size})`}
                list={column.id + "list"}
            />
            <div className="h-1" />
        </>
    );
};

export default TextFilter;
