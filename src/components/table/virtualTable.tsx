import React, { FC, useState, useDeferredValue } from "react";
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    //type
    OnChangeFn,
    SortingState,
} from "@tanstack/react-table";

import SearchBar from "./searchBar";

interface tableProp {
    data: any;
    columns: any;
}

const VirtualTable: FC<tableProp> = ({ data, columns }) => {
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
        getSortedRowModel: getSortedRowModel(),
    });

    const sortingIcon = (flag: string | false) => {
        return (
            {
                asc: " 🔼",
                desc: " 🔽",
            }[flag as string] ?? null
        );
    };

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
        ? table.getRowModel().rows.map((row: any, i: number) => (
              <tr
                  key={row.id}
                  className={i % 2 === 0 ? undefined : "bg-gray-100"}
              >
                  {row.getVisibleCells().map((cell: any) => (
                      <td
                          key={cell.id}
                          className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
                      >
                          {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                          )}
                      </td>
                  ))}
              </tr>
          ))
        : null;

    return (
        <div>
            {/* search bar */}
            <SearchBar value={globalFilter} onChange={setGlobalFilter} />

            <div
                className="container overflow-auto border border-dashed border-red-400 border-4 h-[600px]"
                /* style={{ height: "700px" }} */
            >
                {/* table */}
                <table className="table-fixed min-w-full divide-y divide-gray-300">
                    <thead className="w-full">{tableHeader}</thead>
                    <tbody className="w-full divide-y divide-gray-200 bg-white">
                        {tableBody}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VirtualTable;
