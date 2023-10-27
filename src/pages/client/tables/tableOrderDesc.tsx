import React, { useState, useDeferredValue } from "react";
import type { FC } from "react";
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
} from "@tanstack/react-table";
import type { OnChangeFn, SortingState, Row } from "@tanstack/react-table";
import {
    EllipsisVerticalIcon,
    TrashIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";
import { TorderDesc } from "@/utils/schema/orderSchema";
import MenuBtn from "@/components/menuBtn/tMenuBtn";
import Card from "@/components/card";
import {
    CTable,
    CTHead,
    CTBody,
    Pagination,
    SearchBar,
    sortingIcon,
} from "@/components/table";
import CTh from "@/components/table/CTh";

type TtableProps = {
    data: TorderDesc[];
    columns: any;
    clickEdit: (open: TorderDesc) => void;
    clickDel: (open: TorderDesc) => void;
};

const OrderDescTable: FC<TtableProps> = ({
    data,
    columns,
    clickEdit,
    clickDel,
}) => {
    const [globalFilter, setGlobalFilter] = useState("");
    const deferredGF = useDeferredValue(globalFilter);
    const [sorting, setSorting] = useState([]);

    const opMenu = [
        {
            label: "Edit",
            icon: <PencilIcon />,
            clickFn: (v: TorderDesc) => {
                clickEdit(v);
            },
        },
        {
            label: "Delete",
            icon: <TrashIcon />,
            clickFn: (v: TorderDesc) => {
                clickDel(v);
            },
        },
    ];

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
                <CTh
                    key={header.id}
                    scope="col"
                    onClick={header.column.getToggleSortingHandler()}
                >
                    <button>
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
        ? table.getRowModel().rows.map((row: Row<TorderDesc>, i: number) => (
              <tr
                  key={row.id}
                  className={i % 2 === 0 ? undefined : "bg-gray-100"}
              >
                  {row.getVisibleCells().map((cell: any) => {
                      //console.log("-> cell details: ", cell);
                      /* nevigate to details page */
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
        <Card className="container ring-violet-600 bg-green-50">
            {/* search bar */}
            <SearchBar value={globalFilter} onChange={setGlobalFilter} />

            <CTable>
                <CTHead>{tableHeader}</CTHead>
                <CTBody>{tableBody}</CTBody>
            </CTable>

            {/* pagination */}
            <Pagination table={table} />
        </Card>
    );
};

export default OrderDescTable;