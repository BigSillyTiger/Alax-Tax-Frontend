import type { FC, ComponentPropsWithoutRef } from "react";

type Tprops = ComponentPropsWithoutRef<"button"> & {
    name: string;
};

const DateBtn: FC<Tprops> = ({ name, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-blue-100 text-indigo-400 hover:bg-blue-500 hover:text-white font-semibold  py-2 px-4 hover:border-transparent rounded ${className}`}
        >
            <span className="">{name}</span>
        </button>
    );
};

export default DateBtn;
