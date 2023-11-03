import React from "react";
import type { Row } from "@tanstack/react-table";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

type Tprops<T> = {
    row: Row<T>;
};

const ExpandBtn = <T,>({ row }: Tprops<T>) => {
    return row.getCanExpand() ? (
        <button
            className="cursor-pointer"
            onClick={(e) => {
                e.preventDefault();
                row.getToggleExpandedHandler()();
            }}
        >
            {row.getIsExpanded() ? (
                <MinusIcon className="h-6 w-6 text-indigo-600" />
            ) : (
                <PlusIcon className="h-6 w-6 text-indigo-600" />
            )}
        </button>
    ) : (
        <>"🔵"</>
    );
};

export default ExpandBtn;
