import type { ComponentType } from "react";
import { useState, useDeferredValue } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getExpandedRowModel,
} from "@tanstack/react-table";
import type {
    OnChangeFn,
    SortingState,
    Row,
    ColumnDef,
} from "@tanstack/react-table";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import ColumnToggleBtn from "./ColumnToggleBtn";
import { CTable, CTBody, CTHead } from ".";
import { TmenuOptions } from "@/configs/types";
import { defaultMenuOptions } from "@/configs/utils/modal";

type Tprops<T> = {
    data: T[];
    columns: ColumnDef<T>[];
    // specific options
    // for menu btn open modal: edit & del & payment
    menuOptions?: TmenuOptions;
    setData?: (data: T) => void;
    // for search bar
    search?: boolean;
    // for column toggle
    columnToggle?: boolean;
    // for header filter:
    hFilter?: boolean;
    // for sub table
    getRowCanExpand?: (row: Row<T>) => boolean;
    expandContent?: ComponentType<{ data: T }>;

    // for each components className
    cnSearch?: string;
    cnTable?: string;
    cnHead?: string;
    cnBody?: string;
    cnTh?: string;
};

/**
 *
 * @param data - [T] contains the data to be displayed in the table
 * @param columns -[T] columns definition
 * @param search - [boolean] to show search bar
 * @param hFilter - [boolean] to show header filter
 * @param getRowCanExpand - [function] to check if the row can be expanded
 * @param expandContent - [function] to get the content of the expanded row
 * @param cnSearch - [string] className for search bar
 * @param cnTable - [string] className for table
 * @param cnHead - [string] className for table header
 * @param cnBody - [string] className for table body
 * @param cnTh - [string] className for table table header
 * @param menuOptions - [TmenuOptions] for menu btn options
 * @param setData - [function] to set the data for the modal opened by menu btn options
 * @returns
 */
const PTable = <T extends object>({
    data,
    columns,
    menuOptions = defaultMenuOptions,
    setData,
    search = true,
    columnToggle = true,
    hFilter = true,
    getRowCanExpand,
    expandContent: SubTable,
    cnSearch,
    cnTable,
    cnHead,
    cnBody,
    cnTh,
}: Tprops<T>) => {
    const [globalFilter, setGlobalFilter] = useState("");
    const deferredGF = useDeferredValue(globalFilter);
    const [sorting, setSorting] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});

    const table = useReactTable({
        data,
        columns,
        getRowCanExpand, // for expanding row
        state: { globalFilter: deferredGF, sorting, columnVisibility },
        onSortingChange: setSorting as OnChangeFn<SortingState>,
        // not sure what is this onGlobalFilterChange used for
        // the filter still works very well without this
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(), // for expanding row
        // for column toggle
        onColumnVisibilityChange: setColumnVisibility,
    });

    return (
        <div className="container flex flex-col">
            <div className="flex flex-col sm:flex-row ">
                {/* search bar */}

                {search && (
                    <SearchBar
                        value={globalFilter}
                        onChange={setGlobalFilter}
                        className={`${cnSearch}`}
                    />
                )}

                {columnToggle && <ColumnToggleBtn table={table} />}
            </div>

            <CTable className={`${cnTable}`}>
                <CTHead
                    className={`${cnHead}`}
                    table={table}
                    hFilter={hFilter}
                    cnTh={cnTh}
                />
                <CTBody
                    className={`${cnBody}`}
                    table={table}
                    setData={setData}
                    subTable={SubTable}
                    menuOptions={menuOptions}
                />
            </CTable>

            {/* pagination */}
            <Pagination table={table} />
        </div>
    );
};

export default PTable;
