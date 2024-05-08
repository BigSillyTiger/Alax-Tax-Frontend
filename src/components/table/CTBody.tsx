import { flexRender, Row, Table } from "@tanstack/react-table";
import { ComponentType, Fragment } from "react";
import { MenuBtn, PSDelBtn } from "./tableBtn";
import { Tpayslip } from "@/configs/schema/payslipSchema";
import { TmenuOptions } from "@/configs/types";

type Tprops<T> = {
    className?: string;
    table: Table<T>;
    setData?: (data: T) => void;
    subTable?: ComponentType<{ data: T }>;
    getRowCanExpand?: (row: Row<T>) => boolean;
    menuOptions?: TmenuOptions;
};

const CTBody = <T extends object>({
    className,
    table,
    setData,
    subTable: SubTable,
    getRowCanExpand,
    menuOptions,
}: Tprops<T>) => {
    const tableBody = table.getRowModel().rows.length
        ? table.getRowModel().rows.map((row: Row<T>, i: number) => (
              <Fragment key={row.id}>
                  <tr className={i % 2 === 0 ? undefined : "bg-gray-100"}>
                      {row.getVisibleCells().map((cell) => {
                          if (cell.column.id === "Menu" && setData) {
                              return (
                                  <td
                                      key={cell.id}
                                      className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 flex justify-center items-center z-0"
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
        <tbody
            className={`divide-y divide-gray-200 bg-slate-50 z-10 ${className}`}
        >
            {tableBody}
        </tbody>
    );
};

export default CTBody;
