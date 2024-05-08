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
    //table,
    header,
    //columnResizeMode = "onChange", B-resize
}: Tprops<T>) => {
    return (
        <th
            className={`relative whitespace-nowrap px-2 text-sm font-semibold text-gray-900 capitalize text-center border-indigo-200 border-2 ${className}`}
            scope={scope}
            colSpan={header.colSpan}
            onClick={onClick}
            style={{
                width: header.getSize(),
            }}
        >
            {children}

            {/* resizer block B-resize */}
            {/* <div
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
                                  table.getState().columnSizingInfo.deltaOffset
                              }px)`
                            : "",
                }}
            /> */}
        </th>
    );
};

export default CTh;
