import type { ComponentPropsWithoutRef, FC } from "react";

type Tprops = ComponentPropsWithoutRef<"tbody">;

const CTBody: FC<Tprops> = ({ className, children }) => {
    return (
        <tbody
            className={`divide-y divide-gray-200 bg-slate-50 z-10 ${className}`}
        >
            {children}
        </tbody>
    );
};

export default CTBody;
