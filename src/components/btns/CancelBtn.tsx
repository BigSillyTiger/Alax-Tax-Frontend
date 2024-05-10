import type { FC, ComponentPropsWithoutRef } from "react";
import { Button } from "../ui/button";

type Tprops = ComponentPropsWithoutRef<"button">;

/**
 * @description this btn is usually used as cancel btn
 * @param param0
 * @returns
 */
const CancelBtn: FC<Tprops> = ({
    type = "button",
    children,
    onClick,
    className,
    disabled,
    value,
    name,
}) => {
    return (
        <Button
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            className={`relative text-wrap rounded-md bg-slate-500 px-3 py-2 text-sm font-semibold text-slate-200 shadow-sm 
            border-2 border-slate-400
            ring-1 ring-inset ring-slate-400
            hover:text-slate-50
            hover:ring-slate-50
            hover:transition-all hover:duration-300 hover:ease-in-out
            ${className}`}
            onClick={onClick}
        >
            <div className="relative">{children}</div>
        </Button>
    );
};

export default CancelBtn;
