import React from "react";
import type { FC, ReactNode } from "react";

type Tprops = {
    className?: string;
    children: ReactNode[] | ReactNode;
};

const CTHead: FC<Tprops> = ({ className, children }) => {
    return (
        <thead className={`w-full sticky top-0 bg-indigo-50 z-10 ${className}`}>
            {children}
        </thead>
    );
};

export default CTHead;
