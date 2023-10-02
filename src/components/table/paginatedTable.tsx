import React, { FC, useState, useDeferredValue } from "react";
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    //type
    OnChangeFn,
    SortingState,
    Row,
    Cell,
    ColumnDef,
} from "@tanstack/react-table";
import {
    Bars3CenterLeftIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";

import Pagination from "./pagination";
import SearchBar from "./searchBar";
import { sortingIcon } from "./config";
import { TclientView } from "@/configs/schema/client";

type TtableProps = {
    data: TclientView[];
    //columns: ColumnDef<TclientView>;
    columns: any;
    clickDetails: (open: TclientView | null) => void;
    clickEdit: (open: TclientView) => void;
};

const PaginatedTable: FC<TtableProps> = ({
    data,
    columns,
    clickDetails,
    clickEdit,
}) => {
    const [globalFilter, setGlobalFilter] = useState("");
    const deferredGF = useDeferredValue(globalFilter);
    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter: deferredGF, sorting },
        onSortingChange: setSorting as OnChangeFn<SortingState>,
        // not sure what is this used for
        // the filter still works very well without this
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const tableHeader = table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
                <th
                    key={header.id}
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 capitalize"
                    onClick={header.column.getToggleSortingHandler()}
                >
                    <button>
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                        {sortingIcon(header.column.getIsSorted())}
                    </button>
                </th>
            ))}
        </tr>
    ));

    const tableBody = table.getRowModel().rows.length
        ? table.getRowModel().rows.map((row: Row<TclientView>, i: number) => (
              <tr
                  key={row.id}
                  className={i % 2 === 0 ? undefined : "bg-gray-100"}
              >
                  {row.getVisibleCells().map((cell: any) => {
                      //console.log("-> cell details: ", cell);
                      if (cell.column.id === "Details") {
                          return (
                              <td
                                  key={cell.id}
                                  className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
                              >
                                  <button
                                      onClick={(e) => {
                                          clickDetails(row.original);
                                      }}
                                  >
                                      <DocumentTextIcon
                                          className="h-6 w-6 text-indigo-500"
                                          aria-hidden="true"
                                      />
                                  </button>
                              </td>
                          );
                      } else if (cell.column.id === "Menu") {
                          return (
                              <td
                                  key={cell.id}
                                  className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
                              >
                                  <button
                                      onClick={(e) => {
                                          clickEdit({ ...row.original });
                                      }}
                                  >
                                      <Bars3CenterLeftIcon
                                          className="h-6 w-6 text-indigo-500"
                                          aria-hidden="true"
                                      />
                                  </button>
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
          ))
        : null;

    return (
        <div className="container">
            {/* search bar */}
            <SearchBar value={globalFilter} onChange={setGlobalFilter} />

            <div className="overflow-auto w-full">
                {/* table */}
                <table className="table-fixed min-w-full divide-y divide-gray-300">
                    <thead className="w-full">{tableHeader}</thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {tableBody}
                    </tbody>
                </table>
            </div>

            {/* pagination */}
            <Pagination table={table} />
        </div>
    );
};

export default PaginatedTable;
