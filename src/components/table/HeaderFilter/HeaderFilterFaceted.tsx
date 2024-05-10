import { Column, RowData } from "@tanstack/react-table";
import React from "react";

declare module "@tanstack/react-table" {
    //allows us to define custom properties for our columns
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: "text" | "range" | "select";
    }
}

type Tprops<T> = {
    column: Column<T, unknown>;
};

const DebouncedInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
    const [value, setValue] = React.useState(initialValue);

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <input
            {...props}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
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

    return filterVariant === "range" ? (
        <div>
            <div className="flex space-x-2">
                <DebouncedInput
                    type="number"
                    min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
                    max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
                    value={(columnFilterValue as [number, number])?.[0] ?? ""}
                    onChange={(value) =>
                        column.setFilterValue((old: [number, number]) => [
                            value,
                            old?.[1],
                        ])
                    }
                    placeholder={`Min ${
                        column.getFacetedMinMaxValues()?.[0] !== undefined
                            ? `(${column.getFacetedMinMaxValues()?.[0]})`
                            : ""
                    }`}
                    className="w-24 border shadow rounded"
                />
                <DebouncedInput
                    type="number"
                    min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
                    max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
                    value={(columnFilterValue as [number, number])?.[1] ?? ""}
                    onChange={(value) =>
                        column.setFilterValue((old: [number, number]) => [
                            old?.[0],
                            value,
                        ])
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
    ) : filterVariant === "select" ? (
        <select
            onChange={(e) => column.setFilterValue(e.target.value)}
            value={columnFilterValue?.toString()}
        >
            <option value="">All</option>
            {sortedUniqueValues.map((value) => (
                //dynamically generated select options from faceted values feature
                <option value={value} key={value}>
                    {value}
                </option>
            ))}
        </select>
    ) : (
        <>
            {/* Autocomplete suggestions from faceted values feature */}
            <datalist id={column.id + "list"}>
                {sortedUniqueValues.map((value: any) => (
                    <option value={value} key={value} />
                ))}
            </datalist>
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? "") as string}
                onChange={(value) => column.setFilterValue(value)}
                placeholder={`Search... (${
                    column.getFacetedUniqueValues().size
                })`}
                className="w-36 border shadow rounded"
                list={column.id + "list"}
            />
            <div className="h-1" />
        </>
    );
};

export default HeaderFilterFaceted;
