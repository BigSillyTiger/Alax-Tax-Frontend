import React from "react";
import type { FC, ReactNode, HTMLAttributes } from "react";

type Tprops = {
    className?: string;
    children: ReactNode[] | ReactNode;
    scope?: string;
    colSpan?: number;
    onClick?: (event: unknown) => void;
};

const CTh: FC<Tprops> = ({ className, children, scope, colSpan, onClick }) => {
    return (
        <th
            className={`whitespace-nowrap px-2 py-3.5 text-sm font-semibold text-gray-900 capitalize text-center border-indigo-200 border-2 ${className}`}
            scope={scope}
            colSpan={colSpan}
            onClick={onClick}
        >
            {children}
        </th>
    );
};

export default CTh;
