import React, { FC, useState } from "react";
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";

interface tableProp {
    globalFilter: any;
    data: any;
    columns: any;
}

const Table: FC<tableProp> = ({ globalFilter, data, columns }) => {
    const table = useReactTable({
        data,
        columns,
        state: { globalFilter },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const tableHeader = table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
                <th
                    key={header.id}
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 capitalize"
                >
                    {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )}
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
        <>
            <table className="min-w-full divide-y divide-gray-300">
                <thead>{tableHeader}</thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {tableBody}
                </tbody>
            </table>
            {/* pagination */}
            <div className="flex items-center justify-end mt-2 gap-2">
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                    className="p-2 bg-transparent"
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => {
                        table.previousPage();
                    }}
                    disabled={table.getCanNextPage()}
                    className="p-1 border border-gray-300 px-2 disabled:opacity-30"
                >
                    {"<"}
                </button>
                <button
                    onClick={() => {
                        table.nextPage();
                    }}
                    disabled={table.getCanPreviousPage()}
                    className="p-1 border border-gray-300 px-2 disabled:opacity-30"
                >
                    {">"}
                </button>
                {/* page count */}
                <span className="flex items-center gap-1">
                    <div>
                        <strong>Page</strong>
                    </div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1}
                        {" of "}
                        {table.getPageCount()}
                    </strong>
                </span>
            </div>
        </>
    );
};

export default Table;
