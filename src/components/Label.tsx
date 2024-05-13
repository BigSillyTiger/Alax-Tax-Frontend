import type { ComponentPropsWithoutRef, FC } from "react";

type Tprops = ComponentPropsWithoutRef<"label">;

const Label: FC<Tprops> = ({ htmlFor, children, className }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`mx-2 text-slate-500 font-bold ${className}`}
        >
            {children}
        </label>
    );
};

export default Label;
