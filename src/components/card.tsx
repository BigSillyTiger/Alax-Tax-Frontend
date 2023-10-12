import React, { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";

type Tprops = {
    className: string;
    children: ReactNode[] | ReactNode;
};

const Card: FC<Tprops> = ({ className, children }) => {
    return (
        <div
            className={`overflow-hidden shadow ring-1 ring-indigo-600 ring-opacity-25 sm:rounded-lg p-3 ${className}`}
        >
            {children}
        </div>
    );
};

export default Card;
