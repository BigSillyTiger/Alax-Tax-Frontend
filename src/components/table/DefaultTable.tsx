import type { ComponentType } from "react";
import { useState, useDeferredValue, Fragment } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getSortedRowModel,
    getExpandedRowModel,
    flexRender,
} from "@tanstack/react-table";
import type {
    OnChangeFn,
    SortingState,
    Row,
    ColumnDef,
    ColumnResizeMode,
    ColumnFiltersState,
} from "@tanstack/react-table";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import ColumnToggleBtn from "./ColumnToggleBtn";
import { CTable, CTBody, CTHead } from ".";
import { TmenuOptions } from "@/configs/types";
import { defaultMenuOptions } from "@/configs/utils/modal";
import { MenuBtn, PSDelBtn } from "./tableBtn";
import { Tpayslip } from "@/configs/schema/payslipSchema";

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
    // for column toggle
    const [columnVisibility, setColumnVisibility] = useState({});
    // for column resize
    const [columnResizeMode] = useState<ColumnResizeMode>("onChange");
    // for column filter
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        // for column resize, but this will cause ctbody render before mount issue
        columnResizeMode,
        getRowCanExpand, // for expanding row
        state: {
            columnFilters, // for column filter
            globalFilter: deferredGF,
            sorting,
            columnVisibility, // for column toggle
        },
        onColumnFiltersChange: setColumnFilters, // for column filter
        onSortingChange: setSorting as OnChangeFn<SortingState>,
        // not sure what is this onGlobalFilterChange used for
        // the filter still works very well without this
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedRowModel: getFacetedRowModel(), // client-side faceting
        getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
        getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(), // for expanding row
        onColumnVisibilityChange: setColumnVisibility, // for column toggle
    });

    const tableBody = table.getRowModel().rows.length
        ? table.getRowModel().rows.map((row: Row<T>, i: number) => (
              <Fragment key={row.id}>
                  <tr
                      className={`${i % 2 === 0 ? "bg-slate-50" : "bg-gray-200"} `}
                  >
                      {row.getVisibleCells().map((cell) => {
                          if (cell.column.id === "Menu" && setData) {
                              return (
                                  <td
                                      key={cell.id}
                                      className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
                                  >
                                      <div className="flex justify-center items-center">
                                          <MenuBtn
                                              {...menuOptions}
                                              setData={setData}
                                              mItem={row.original}
                                          />
                                      </div>
                                  </td>
                              );
                          } else if (
                              cell.column.id === "PayslipDel" &&
                              setData
                          ) {
                              return (
                                  <td
                                      key={cell.id}
                                      className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 flex justify-center items-center z-0"
                                      style={{
                                          width: cell.column.getSize(),
                                      }}
                                  >
                                      <PSDelBtn
                                          data={row.original as Tpayslip}
                                          setData={
                                              setData as (
                                                  data: Tpayslip
                                              ) => void
                                          }
                                      />
                                  </td>
                              );
                          }
                          return (
                              <td
                                  key={cell.id}
                                  className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 text-center z-0"
                              >
                                  {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                  )}
                              </td>
                          );
                      })}
                  </tr>
                  {getRowCanExpand &&
                      getRowCanExpand(row) &&
                      SubTable &&
                      row.getIsExpanded() && (
                          <tr>
                              <td colSpan={row.getVisibleCells().length}>
                                  {/* 2nd row is a custom 1 cell row */}
                                  <SubTable data={row.original} />
                              </td>
                          </tr>
                      )}
              </Fragment>
          ))
        : "";

    return (
        <div className="container flex flex-col">
            <div className="flex flex-col sm:flex-row my-2 gap-y-2">
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

            <CTable className={`${cnTable}`} table={table}>
                <CTHead
                    className={`${cnHead}`}
                    table={table}
                    hFilter={hFilter}
                    cnTh={cnTh}
                />
                <CTBody className={`${cnBody}`}>{tableBody}</CTBody>
            </CTable>

            {/* pagination */}
            <Pagination table={table} />
        </div>
    );
};

export default PTable;
