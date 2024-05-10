import type { FC, ComponentPropsWithoutRef } from "react";

type Tprops = ComponentPropsWithoutRef<"div">;

/**
 * @description this btn is usually used as confirm btn
 * @param param0
 * @returns
 */
const NormalDivBtn: FC<Tprops> = ({ children, onClick, className }) => {
    return (
        <div
            className={`relative text-wrap rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-slate-200 shadow-sm 
        border-2 border-indigo-400
        ring-1 ring-inset ring-indigo-400
        hover:text-slate-50
        hover:ring-slate-50
        hover:transition-all hover:duration-300 hover:ease-in-out
        ${className}`}
            onClick={onClick}
        >
            <div className="relative">{children}</div>
        </div>
    );
};

export default NormalDivBtn;
