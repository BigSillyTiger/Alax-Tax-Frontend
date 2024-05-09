import type { FC, ComponentPropsWithoutRef } from "react";
import { Button } from "../ui/button";

type Tprops = ComponentPropsWithoutRef<"button">;

const NormalBtn: FC<Tprops> = ({ children, onClick, className }) => {
    return (
        <Button
            type="button"
            className={`relative rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-slate-50 shadow-sm ring-1 ring-inset overflow-hidden
            before:hover:scale-x-100
            before:content-['']
            before:absolute
            before:top-0 before:left-0
            before:w-full before:h-full
            before:rounded-md
            before:bg-[linear-gradient(60deg,#7c3aed_10.8%,#0ea5e9_94.3%)]
            before:scale-x-0 before:origin-[0_50%]
            before:transition-all
            before:duration-300
            hover:text-lg
            transition-all duration-300 ease-out hover:ease-in
            ${className}`}
            onClick={onClick}
        >
            <div className="relative">{children}</div>
        </Button>
    );
};

export default NormalBtn;
