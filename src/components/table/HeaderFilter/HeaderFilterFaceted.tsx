import { Column } from "@tanstack/react-table";
import React from "react";
import DebouncedInput from "./DebouncedInput";
import { useTranslation } from "react-i18next";
import SelectFilter from "./SelectFilter";

type Tprops<T> = {
    column: Column<T, unknown>;
};

const HeaderFilterFaceted = <T extends object>({ column }: Tprops<T>) => {
    const { t } = useTranslation();
    const { filterVariant } = column.columnDef.meta ?? {};
    const columnFilterValue = column.getFilterValue();

    const sortedUniqueValues = React.useMemo(() => {
        const facetedUniqueValues = column.getFacetedUniqueValues();
        return filterVariant === "range"
            ? []
            : Array.from(facetedUniqueValues.keys()).sort().slice(0, 5000);
    }, [column, filterVariant]);

    switch (filterVariant) {
        // this is malfunction
        case "range":
            return (
                <div>
                    <div className="flex space-x-2">
                        <DebouncedInput
                            type="number"
                            min={Number(
                                column.getFacetedMinMaxValues()?.[0] ?? ""
                            )}
                            max={Number(
                                column.getFacetedMinMaxValues()?.[1] ?? ""
                            )}
                            value={
                                (columnFilterValue as [number, number])?.[0] ??
                                ""
                            }
                            onChange={(value) =>
                                column.setFilterValue(
                                    (old: [number, number]) => [value, old?.[1]]
                                )
                            }
                            placeholder={`Min ${
                                column.getFacetedMinMaxValues()?.[0] !==
                                undefined
                                    ? `(${column.getFacetedMinMaxValues()?.[0]})`
                                    : ""
                            }`}
                            className="w-24 border shadow rounded"
                        />
                        <DebouncedInput
                            type="number"
                            min={Number(
                                column.getFacetedMinMaxValues()?.[0] ?? ""
                            )}
                            max={Number(
                                column.getFacetedMinMaxValues()?.[1] ?? ""
                            )}
                            value={
                                (columnFilterValue as [number, number])?.[1] ??
                                ""
                            }
                            onChange={(value) =>
                                column.setFilterValue(
                                    (old: [number, number]) => [old?.[0], value]
                                )
                            }
                            placeholder={`Max ${
                                column.getFacetedMinMaxValues()?.[1]
                                    ? `(${column.getFacetedMinMaxValues()?.[1]})`
                                    : ""
                            }`}
                            className="w-24 border shadow rounded"
                        />
                    </div>
                    <div className="h-1" />
                </div>
            );
        case "select":
            return <SelectFilter column={column} values={sortedUniqueValues} />;

        // text(fuzzy) search
        default:
            return (
                <>
                    {/* text */}
                    {/* Autocomplete suggestions from faceted values feature */}
                    <datalist id={column.id + "list"}>
                        {sortedUniqueValues.map(
                            (value: string, index: number) => (
                                <option value={value} key={value + index} />
                            )
                        )}
                    </datalist>
                    <DebouncedInput
                        type="text"
                        value={(columnFilterValue ?? "") as string}
                        onChange={(value) => column.setFilterValue(value)}
                        placeholder={`${t("placeholder.search")} (${column.getFacetedUniqueValues().size})`}
                        list={column.id + "list"}
                    />
                    <div className="h-1" />
                </>
            );
    }
};

export default HeaderFilterFaceted;
