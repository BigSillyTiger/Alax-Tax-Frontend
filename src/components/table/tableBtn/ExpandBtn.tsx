import type { Row } from "@tanstack/react-table";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";

type Tprops<T> = {
    row: Row<T>;
    name: string | ReactNode;
};

const ExpandBtn = <T,>({ row, name }: Tprops<T>) => {
    return row.getCanExpand() ? (
        <button
            className="cursor-pointer flex flex-row justify-center items-center w-full"
            onClick={(e) => {
                e.preventDefault();
                row.getToggleExpandedHandler()();
            }}
        >
            {name}
            {row.getIsExpanded() ? (
                <MinusIcon className="h-6 w-6 text-indigo-600" />
            ) : (
                <PlusIcon className="h-6 w-6 text-indigo-600" />
            )}
        </button>
    ) : (
        <div className="w-full">{name}</div>
    );
};

export default ExpandBtn;
