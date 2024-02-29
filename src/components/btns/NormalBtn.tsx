import type { FC, ComponentPropsWithoutRef } from "react";

type Tprops = ComponentPropsWithoutRef<"button"> & {
    name: string;
};

const NormalBtn: FC<Tprops> = ({ name, onClick, className }) => {
    return (
        <button
            type="button"
            className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset hover:bg-indigo-700 ${className}`}
            onClick={onClick}
        >
            {name}
        </button>
    );
};

export default NormalBtn;
