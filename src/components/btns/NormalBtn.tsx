import type { FC, ComponentPropsWithoutRef } from "react";
import { Button } from "../ui/button";

type Tprops = ComponentPropsWithoutRef<"button">;

const NormalBtn: FC<Tprops> = ({ children, onClick, className }) => {
    return (
        <Button
            type="button"
            className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset hover:bg-indigo-700 ${className}`}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default NormalBtn;
