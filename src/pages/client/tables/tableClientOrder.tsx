import React, { Fragment, useState, useDeferredValue } from "react";
import type { FC } from "react";
import {
    useReactTable,
    flexRender,
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
    Cell,
    ColumnDef,
} from "@tanstack/react-table";
import {
    EllipsisVerticalIcon,
    DocumentTextIcon,
    TrashIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";
import Pagination from "@/components/table/pagination";
import SearchBar from "@/components/table/searchBar";
import { sortingIcon } from "@/components/table/config";
import { Torder, TorderWithDesc } from "@/utils/schema/orderSchema";
import MenuBtn from "@/components/menuBtn/tMenuBtn";
import OrderDescTable from "./tableOrderDesc";
import orderDescColumns from "./defOrderDesc";

type TtableProps = {
    data: TorderWithDesc[];
    columns: any;
    clickEdit: (open: TorderWithDesc) => void;
    clickDel: (open: TorderWithDesc) => void;
    getRowCanExpand: (row: any) => boolean;
};

const ClientOrderTable: FC<TtableProps> = ({
    data,
    columns,
    clickEdit,
    clickDel,
    getRowCanExpand,
}) => {
    const [globalFilter, setGlobalFilter] = useState("");
    const deferredGF = useDeferredValue(globalFilter);
    const [sorting, setSorting] = useState([]);
    //const nevigate = useNavigate();

    const opMenu = [
        {
            label: "Edit",
            icon: <PencilIcon />,
            clickFn: (v: TorderWithDesc) => {
                clickEdit(v);
            },
        },
        {
            label: "Delete",
            icon: <TrashIcon />,
            clickFn: (v: TorderWithDesc) => {
                clickDel(v);
            },
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getRowCanExpand, // for expanding row
        state: { globalFilter: deferredGF, sorting },
        onSortingChange: setSorting as OnChangeFn<SortingState>,
        // not sure what is this used for
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
                <th
                    key={header.id}
                    scope="col"
                    colSpan={header.colSpan}
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 capitalize text-center"
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
        ? table
              .getRowModel()
              .rows.map((row: Row<TorderWithDesc>, i: number) => {
                  return (
                      <Fragment key={row.id}>
                          <tr
                              className={
                                  i % 2 === 0 ? undefined : "bg-gray-100"
                              }
                          >
                              {row.getVisibleCells().map((cell: any) => {
                                  if (cell.column.id === "Menu") {
                                      return (
                                          <td
                                              key={cell.id}
                                              className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
                                          >
                                              <MenuBtn
                                                  mLabel={
                                                      <EllipsisVerticalIcon
                                                          className="h-6 w-6 text-indigo-500"
                                                          aria-hidden="true"
                                                      />
                                                  }
                                                  mList={opMenu}
                                                  mItem={row.original}
                                              />
                                          </td>
                                      );
                                  }
                                  return (
                                      <td
                                          key={cell.id}
                                          className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 text-center"
                                      >
                                          {flexRender(
                                              cell.column.columnDef.cell,
                                              cell.getContext()
                                          )}
                                      </td>
                                  );
                              })}
                          </tr>
                          {row.getIsExpanded() && (
                              <tr>
                                  {/* 2nd row is a custom 1 cell row */}
                                  <td colSpan={row.getVisibleCells().length}>
                                      <OrderDescTable
                                          data={row.original.order_desc}
                                          columns={orderDescColumns}
                                          clickEdit={() => {
                                              return;
                                          }}
                                          clickDel={() => {
                                              return;
                                          }}
                                      />
                                  </td>
                              </tr>
                          )}
                      </Fragment>
                  );
              })
        : null;

    return (
        <div className="container">
            {/* search bar */}
            <SearchBar
                value={globalFilter}
                onChange={setGlobalFilter}
                className="my-3"
            />

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

export default ClientOrderTable;
