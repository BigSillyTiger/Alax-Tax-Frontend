import { Column } from "@tanstack/react-table";
import React from "react";
import SelectFilter from "./SelectFilter";
import TextFilter from "./TextFilter";
import RangeFilter from "./RangeFilter";

type Tprops<T> = {
    column: Column<T, unknown>;
};

const HeaderFilterFaceted = <T extends object>({ column }: Tprops<T>) => {
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
                <RangeFilter
                    column={column}
                    values={columnFilterValue as [number, number]}
                />
            );
        case "select":
            return <SelectFilter column={column} values={sortedUniqueValues} />;

        // text(fuzzy) search
        default:
            return (
                <TextFilter
                    column={column}
                    values={sortedUniqueValues}
                    filterValue={columnFilterValue as string}
                />
            );
    }
};

export default HeaderFilterFaceted;
