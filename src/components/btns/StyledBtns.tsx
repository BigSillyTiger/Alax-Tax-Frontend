import type { ComponentPropsWithoutRef, FC } from "react";
import { Button } from "../ui/button";

type Tprops = ComponentPropsWithoutRef<"button">;

const StyledBtn1: FC<Tprops> = ({
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
            className={`relative text-wrap rounded-mdpx-3 py-2 text-md
            bg-indigo-600 font-semibold text-slate-50 shadow-sm 
            border-0 ring-1 ring-inset ring-indigo-300 overflow-hidden
            before:content-['']
            before:absolute
            before:top-0 before:left-0
            before:w-full before:h-full
            before:rounded-md
            before:bg-[linear-gradient(90deg,#4f46e5_20.8%,#d946ef_94.3%)]
            before:scale-x-0 before:origin-[0_50%]
            before:hover:scale-x-100
            before:transition-all
            before:duration-300
            before:pointer-events-none
            transition-all duration-300 ease-out hover:ease-in
            active:scale-95
            ${className}`}
            onClick={onClick}
        >
            <div className="relative">{children}</div>
        </Button>
    );
};

const StyledBtn2: FC<Tprops> = ({
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
            className={`relative text-wrap rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-slate-200 shadow-sm border-0 ring-1 ring-inset ring-indigo-300

            after:contents-['']
            after:absolute
            after:w-[96%] after:h-[96%]
            before:top-0 before:left-0
            after:bg-indigo-500
            after:rounded-full
            after:-z-10
            after:hover:blur-md
            after:hover:transition-all after:hover:duration-300 
            after:hover:ease-in-out
            hover:text-slate-50
            hover:transition-all hover:duration-300 hover:ease-in-out
            active:scale-95
            ${className}`}
            onClick={onClick}
        >
            <div className="relative">{children}</div>
        </Button>
    );
};

const StyledBtn3: FC<Tprops> = ({
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
            className={`relative text-wrap rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-slate-200 shadow-sm 
            border-2 border-red-400
            ring-1 ring-inset ring-red-400
            hover:text-slate-50
            hover:ring-slate-50
            hover:transition-all hover:duration-300 hover:ease-in-out
            active:scale-95
            ${className}`}
            onClick={onClick}
        >
            <div className="relative">{children}</div>
        </Button>
    );
};

export { StyledBtn1, StyledBtn2, StyledBtn3 };
