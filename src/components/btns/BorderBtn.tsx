import type { FC, ComponentPropsWithoutRef } from "react";
import { Button } from "../ui/button";

type Tprops = ComponentPropsWithoutRef<"button">;

const BorderBtn: FC<Tprops> = ({ children, onClick, className }) => {
    return (
        <Button
            type="button"
            className={`rounded-md border-2 border-indigo-600 bg-indigo-400 px-3 py-2 text-sm font-semibold text-slate-50 shadow-sm ring-1 ring-inset hover:bg-slate-50 hover:text-indigo-600 ease-in-out ${className}`}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default BorderBtn;
