import type { FC, ReactNode } from "react";

type Tprops = {
    className?: string;
    children: ReactNode[] | ReactNode;
};

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
