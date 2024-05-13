import { Table } from "@tanstack/react-table";
import type { ReactNode } from "react";

type Tprops<T> = {
    className?: string;
    children: ReactNode[] | ReactNode;
    table: Table<T>;
};

const CTable = <T extends object>({
    className,
    children,
    table,
}: Tprops<T>) => {
    return (
        <div className={`overflow-auto w-full ${className}`}>
            <table
                className="min-w-full divide-y divide-gray-300"
                style={{
                    width: table.getCenterTotalSize(),
                }}
            >
                {children}
            </table>
        </div>
    );
};

export default CTable;
