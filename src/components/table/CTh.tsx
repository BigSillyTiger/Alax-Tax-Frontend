import { Bars3CenterLeftIcon } from "@heroicons/react/20/solid";
import { ColumnResizeMode, Header, Table } from "@tanstack/react-table";
import type { ReactNode } from "react";

type Tprops<T> = {
    className?: string;
    children: ReactNode[] | ReactNode;
    table: Table<T>;
    columnResizeMode?: ColumnResizeMode;
    header: Header<T, unknown>;
    scope?: string;
    onClick?: (event: unknown) => void;
};

const CTh = <T extends object>({
    className,
    children,
    scope,
    onClick,
    table,
    header,
    columnResizeMode = "onChange",
}: Tprops<T>) => {
    const isMenu = header.column.id === "Menu";
    const isAccess = header.column.id === "Access";
    const headerW = isMenu || isAccess ? "w-2" : "w-auto";
    const styleW =
        isMenu || isAccess
            ? {}
            : {
                  width: header.getSize(),
              };
    return (
        <th
            className={`relative whitespace-nowrap px-2 text-sm font-semibold text-gray-900 capitalize text-center border-collapse border-indigo-200 border-2 ${className} ${headerW}`}
            scope={scope}
            colSpan={header.colSpan}
            onClick={onClick}
            style={styleW}
        >
            {isMenu ? (
                <Bars3CenterLeftIcon className="size-6 text-slate-50" />
            ) : (
                children
            )}

            {/* resizer block */}
            {!isMenu && !isAccess && (
                <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`resizer ${
                        header.column.getIsResizing() ? "isResizing" : ""
                    }`}
                    style={{
                        transform:
                            columnResizeMode === "onEnd" &&
                            header.column.getIsResizing()
                                ? `translateX(${
                                      table.getState().columnSizingInfo
                                          .deltaOffset
                                  }px)`
                                : "",
                    }}
                />
            )}
        </th>
    );
};

export default CTh;
