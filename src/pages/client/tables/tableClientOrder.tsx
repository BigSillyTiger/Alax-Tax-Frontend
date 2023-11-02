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
import type { OnChangeFn, SortingState, Row } from "@tanstack/react-table";
import {
    EllipsisVerticalIcon,
    TrashIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";
import { TorderWithDesc } from "@/utils/schema/orderSchema";
import { MenuBtn, StatusBtn } from "@/components/tableBtn";
import OrderDescTable from "./tableOrderDesc";
import orderDescColumns from "./defOrderDesc";
import { tableItemsId } from "@/configs/statusList";
import {
    CTable,
    CTHead,
    CTBody,
    CTh,
    Pagination,
    SearchBar,
    sortingIcon,
} from "@/components/table";

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
        <tr key={headerGroup.id} className="z-20">
            {headerGroup.headers.map((header) => (
                <CTh
                    key={header.id}
                    className="py-3"
                    scope="col"
                    colSpan={header.colSpan}
                >
                    <button onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                        {sortingIcon(header.column.getIsSorted())}
                    </button>
                </CTh>
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
                                  if (cell.column.id === "menu") {
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
                                                  clickDel={clickDel}
                                                  clickEdit={clickEdit}
                                                  mItem={row.original}
                                              />
                                          </td>
                                      );
                                  } else if (
                                      cell.column.id === tableItemsId.status
                                  ) {
                                      return (
                                          <td
                                              key={cell.id}
                                              className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 text-center z-0"
                                          >
                                              {/* <button
                                                  onClick={() => {
                                                      console.log(
                                                          "-> click status"
                                                      );
                                                  }}
                                              >
                                                  {flexRender(
                                                      cell.column.columnDef
                                                          .cell,
                                                      cell.getContext()
                                                  )}
                                              </button> */}
                                              <StatusBtn
                                                  mLabel={flexRender(
                                                      cell.column.columnDef
                                                          .cell,
                                                      cell.getContext()
                                                  )}
                                                  current={
                                                      row.original.order_status
                                                  }
                                                  orId={row.original.order_id}
                                                  action={`/clients/${row.original.fk_client_id}`}
                                              />
                                          </td>
                                      );
                                  } else {
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
                                  }
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

            <CTable className="h-[55vh]">
                <CTHead className="sticky z-10 bg-indigo-300">
                    {tableHeader}
                </CTHead>
                <CTBody>{tableBody}</CTBody>
            </CTable>

            {/* pagination */}
            <Pagination table={table} />
        </div>
    );
};

export default ClientOrderTable;
