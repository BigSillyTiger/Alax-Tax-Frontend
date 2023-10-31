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
import { useNavigate } from "react-router-dom";
import { Tclient } from "@/utils/schema/clientSchema";
import MenuBtn from "@/components/menuBtn/tMenuBtn";
import {
    CTable,
    CTHead,
    CTBody,
    Pagination,
    SearchBar,
    sortingIcon,
} from "@/components/table";
import CTh from "@/components/table/CTh";
import HeaderFilter from "@/components/table/headerFilter";

type TtableProps = {
    data: Tclient[];
    columns: any;
    clickEdit: (open: Tclient) => void;
    clickDel: (open: Tclient) => void;
};

const ClientTable: FC<TtableProps> = ({
    data,
    columns,
    clickEdit,
    clickDel,
}) => {
    const [globalFilter, setGlobalFilter] = useState("");
    const deferredGF = useDeferredValue(globalFilter);
    const [sorting, setSorting] = useState([]);
    const nevigate = useNavigate();

    const opMenu = [
        {
            label: "Edit",
            icon: <PencilIcon />,
            clickFn: (v: Tclient) => {
                clickEdit(v);
            },
        },
        {
            label: "Delete",
            icon: <TrashIcon />,
            clickFn: (v: Tclient) => {
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
                <CTh key={header.id} className="py-3" scope="col">
                    <button onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                        {sortingIcon(header.column.getIsSorted())}
                    </button>
                    {header.column.getCanFilter() ? (
                        <HeaderFilter column={header.column} table={table} />
                    ) : null}
                </CTh>
            ))}
        </tr>
    ));

    const tableBody = table.getRowModel().rows.length
        ? table.getRowModel().rows.map((row: Row<Tclient>, i: number) => (
              <tr
                  key={row.id}
                  className={i % 2 === 0 ? undefined : "bg-gray-100"}
              >
                  {row.getVisibleCells().map((cell: any) => {
                      //console.log("-> cell details: ", cell);
                      /* nevigate to details page */
                      if (cell.column.id === "Details") {
                          return (
                              <td
                                  key={cell.id}
                                  className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
                              >
                                  <button
                                      onClick={(e) => {
                                          e.preventDefault();
                                          return nevigate(
                                              "/clients/" +
                                                  row.original.client_id,
                                              { replace: false }
                                          );
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
                                  {/* <button
                                      onClick={(e) => {
                                          clickEdit({ ...row.original });
                                      }}
                                  >
                                      <EllipsisVerticalIcon
                                          className="h-6 w-6 text-indigo-500"
                                          aria-hidden="true"
                                      />
                                  </button> */}
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
        <div className="container">
            {/* search bar */}
            <SearchBar
                value={globalFilter}
                onChange={setGlobalFilter}
                className="my-3"
            />

            <CTable className="h-[65vh]">
                <CTHead className="sticky z-20 bg-indigo-300">
                    {tableHeader}
                </CTHead>
                <CTBody>{tableBody}</CTBody>
            </CTable>

            {/* pagination */}
            <Pagination table={table} />
        </div>
    );
};

export default ClientTable;
