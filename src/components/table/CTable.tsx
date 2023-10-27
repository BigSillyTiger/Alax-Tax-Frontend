import React from "react";
import type { FC, ReactNode } from "react";

type Tprops = {
    className?: string;
    children: ReactNode[] | ReactNode;
};

const CTable: FC<Tprops> = ({ className, children }) => {
    return (
        <div className={`overflow-auto w-full ${className}`}>
            <table className="table-fixed min-w-full divide-y divide-gray-300">
                {children}
            </table>
        </div>
    );
};

export default CTable;
