import React from "react";
import type { FC, ReactNode } from "react";

type Tprops = {
    className?: string;
    children: ReactNode[] | ReactNode;
};

const CTHead: FC<Tprops> = ({ className = "bg-indigo-50", children }) => {
    return <thead className={`w-full top-0 ${className}`}>{children}</thead>;
};

export default CTHead;
