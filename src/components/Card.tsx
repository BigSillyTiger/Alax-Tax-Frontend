import type { ComponentPropsWithoutRef, FC } from "react";

type Tprops = ComponentPropsWithoutRef<"div">;

const Card: FC<Tprops> = ({ className, children, onClick }) => {
    return (
        <div
            className={`shadow outline-none ring-1 ring-indigo-600 ring-opacity-25 rounded-lg p-3 bg-slate-50 ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
