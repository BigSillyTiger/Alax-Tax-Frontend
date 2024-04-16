import type { ComponentType } from "react";
import { useState, useDeferredValue, Fragment } from "react";
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getExpandedRowModel,
} from "@tanstack/react-table";
import type { OnChangeFn, SortingState, Row } from "@tanstack/react-table";
import Pagination from "./pagination";
import SearchBar from "./searchBar";
import { sortingIcon } from "./config";
import { MenuBtn, OrderStatusBtn, DetailBtn, ExpandBtn } from "./tableBtn";
import HeaderFilter from "./headerFilter";
import { CTable, CTBody, CTHead, CTh } from ".";
import { TwlTableRow } from "@/configs/schema/workSchema";
import TimeBtn from "@/pageComponents/TimeBtn";
import { TmenuOptions } from "@/configs/types";
import { defaultMenuOptions } from "@/configs/utils/modal";
import { Torder } from "@/configs/schema/orderSchema";
import WLStatusBtn from "./tableBtn/WLStatusBtn";
import { Tclient } from "@/configs/schema/clientSchema";
import PSDelBtn from "./tableBtn/PSDelBtn";
import { Tpayslip } from "@/configs/schema/payslipSchema";

type Tprops<T> = {
    data: T[];
    columns: any;
    // specific options
    // for menu btn open modal: edit & del & payment
    menuOptions?: TmenuOptions;
    setData?: (data: T) => void;
    // for search bar
    search?: boolean;
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
    search,
    hFilter,
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

    const table = useReactTable({
        data,
        columns,
        getRowCanExpand, // for expanding row
        state: { globalFilter: deferredGF, sorting },
        onSortingChange: setSorting as OnChangeFn<SortingState>,
        // not sure what is this onGlobalFilterChange used for
        // the filter still works very well without this
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(), // for expanding row
    });

    const tableHeader = table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
                <CTh
                    key={header.id}
                    scope="col"
                    className={`${cnTh}`}
                    colSpan={header.colSpan}
                >
                    <button onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                        {sortingIcon(header.column.getIsSorted())}
                    </button>
                    {hFilter && header.column.getCanFilter() ? (
                        <HeaderFilter column={header.column} table={table} />
                    ) : null}
                </CTh>
            ))}
        </tr>
    ));

    const tableBody = table.getRowModel().rows.length
        ? table.getRowModel().rows.map((row: Row<T>, i: number) => (
              <Fragment key={row.id}>
                  <tr className={i % 2 === 0 ? undefined : "bg-gray-100"}>
                      {row.getVisibleCells().map((cell) => {
                          /* nevigate to client details page only*/
                          if (cell.column.id === "ClientDetails") {
                              return (
                                  <td
                                      key={cell.id}
                                      className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
                                  >
                                      <DetailBtn
                                          data={row.original as Tclient}
                                      />
                                  </td>
                              );
                          } else if (cell.column.id === "orderID") {
                              /* expand btn is with this */
                              return (
                                  <td
                                      key={cell.id}
                                      className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 flex items-center justify-center"
                                  >
                                      {flexRender(
                                          cell.column.columnDef.cell,
                                          cell.getContext()
                                      )}
                                      &nbsp;
                                      <ExpandBtn row={row} />
                                  </td>
                              );
                          } else if (cell.column.id === "UID") {
                              /* expand btn is with this */
                              return (
                                  <td
                                      key={cell.id}
                                      className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 flex items-center justify-center"
                                  >
                                      {flexRender(
                                          cell.column.columnDef.cell,
                                          cell.getContext()
                                      )}
                                      &nbsp;
                                      <ExpandBtn row={row} />
                                  </td>
                              );
                          } else if (cell.column.id === "Menu" && setData) {
                              return (
                                  <td
                                      key={cell.id}
                                      className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
                                  >
                                      <MenuBtn
                                          {...menuOptions}
                                          setData={setData}
                                          mItem={row.original}
                                      />
                                  </td>
                              );
                          } else if (
                              cell.column.id === "PayslipDel" &&
                              setData
                          ) {
                              return (
                                  <td
                                      key={cell.id}
                                      className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
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
                          } else if (cell.column.id === "orderStatus") {
                              return (
                                  <td
                                      key={cell.id}
                                      className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 text-center z-0"
                                  >
                                      <OrderStatusBtn
                                          mLabel={flexRender(
                                              cell.column.columnDef.cell,
                                              cell.getContext()
                                          )}
                                          data={row.original as Torder}
                                      />
                                  </td>
                              );
                          } else if (cell.column.id === "wlStatus") {
                              return (
                                  <td
                                      key={cell.id}
                                      className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 text-center z-0"
                                  >
                                      <WLStatusBtn
                                          mLabel={flexRender(
                                              cell.column.columnDef.cell,
                                              cell.getContext()
                                          )}
                                          data={row.original as TwlTableRow}
                                      />
                                  </td>
                              );
                          } else if (cell.column.id === "startTime") {
                              return (
                                  <td
                                      key={cell.id}
                                      className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 text-center z-0"
                                  >
                                      <TimeBtn
                                          type="start"
                                          data={row.original as TwlTableRow}
                                      />
                                  </td>
                              );
                          } else if (cell.column.id === "endTime") {
                              return (
                                  <td
                                      key={cell.id}
                                      className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 text-center z-0"
                                  >
                                      <TimeBtn
                                          type="end"
                                          data={row.original as TwlTableRow}
                                      />
                                  </td>
                              );
                          } else if (cell.column.id === "breakTime") {
                              return (
                                  <td
                                      key={cell.id}
                                      className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 text-center z-0"
                                  >
                                      <TimeBtn
                                          type="break"
                                          data={row.original as TwlTableRow}
                                      />
                                  </td>
                              );
                          } else if (cell.column.id === "workTime") {
                              return (
                                  <td
                                      key={cell.id}
                                      className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 text-center z-0"
                                  >
                                      <TimeBtn
                                          type="total"
                                          data={row.original as TwlTableRow}
                                      />
                                  </td>
                              );
                          }
                          return (
                              <td
                                  key={cell.id}
                                  className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
                              >
                                  {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                  )}
                              </td>
                          );
                      })}
                  </tr>
                  {getRowCanExpand && SubTable && row.getIsExpanded() && (
                      <tr>
                          <td colSpan={row.getVisibleCells().length}>
                              {/* 2nd row is a custom 1 cell row */}
                              <SubTable data={row.original} />
                          </td>
                      </tr>
                  )}
              </Fragment>
          ))
        : null;

    return (
        <div className="container">
            {/* search bar */}
            {search && (
                <SearchBar
                    value={globalFilter}
                    onChange={setGlobalFilter}
                    className={`${cnSearch}`}
                />
            )}

            {/* <div className="overflow-auto w-full">
                <table className="table-fixed min-w-full divide-y divide-gray-300">
                    <thead className="w-full">{tableHeader}</thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {tableBody}
                    </tbody>
                </table>
            </div> */}
            <CTable className={`${cnTable}`}>
                <CTHead className={`${cnHead}`}>{tableHeader}</CTHead>
                <CTBody className={`${cnBody}`}>{tableBody}</CTBody>
            </CTable>

            {/* pagination */}
            <Pagination table={table} />
        </div>
    );
};

export default PTable;
