import type { FC, ComponentPropsWithoutRef } from "react";
import { Button } from "../ui/button";

type Tprops = ComponentPropsWithoutRef<"button">;

/**
 * @description this btn is usually used as delete btn
 *              - red-400
 *              - slate-50
 * @param param0
 * @returns
 */
const DeleteBtn: FC<Tprops> = ({
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
            className={`relative rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-slate-200 shadow-sm 
            border-2 border-red-400
            ring-1 ring-inset ring-red-400
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

export default DeleteBtn;
