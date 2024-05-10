import type { FC, ComponentPropsWithoutRef } from "react";
import { Button } from "../ui/button";

type Tprops = ComponentPropsWithoutRef<"button">;

/**
 * @description this btn is usually used as cancel btn
 *              - sky-500
 *              - slate-50
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
            className={`relative rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm border-0 ring-1 ring-inset ring-indigo-300 overflow-hidden
            before:border
            before:border-indigo-200
            before:content-['']
            before:absolute
            before:top-0 before:left-0
            before:w-full before:h-full
            before:rounded-md
            before:bg-[linear-gradient(60deg,#f8fafc_20.8%,#0ea5e9_94.3%)]
            before:hover:scale-x-100
            before:scale-x-0 before:origin-[0_50%]
            before:transition-all
            before:duration-300
            before:pointer-events-none
            transition-all duration-300 ease-out hover:ease-in
            ${className}`}
            onClick={onClick}
        >
            <div className="relative">{children}</div>
        </Button>
    );
};

export default CancelBtn;
