import React from "react";
import type { FC } from "react";

type Tprops = {
    name: string;
    onClick: () => void;
    className?: string;
};

const NormalBtn: FC<Tprops> = ({ name, onClick, className }) => {
    return (
        <button
            type="button"
            className={`w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset hover:bg-indigo-700 ${className}`}
            onClick={(e) => {
                onClick();
            }}
        >
            {name}
        </button>
    );
};

export default NormalBtn;
