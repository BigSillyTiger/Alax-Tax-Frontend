import type { FC, ReactNode } from "react";

type Tprops = {
    sFieldset?: string;
    sLegend?: string;
    title?: string | ReactNode;
    children: ReactNode[] | ReactNode;
};

const Fieldset: FC<Tprops> = ({ sFieldset, sLegend, title, children }) => {
    return (
        <fieldset
            className={`px-4 py-2 border-2 border-indigo-200 bg-slate-50 rounded-lg ${sFieldset}`}
        >
            {title && (
                <legend
                    className={`ml-2 px-2 text-indigo-500 text-lg font-bold ${sLegend}`}
                >
                    {title}
                </legend>
            )}
            {children}
        </fieldset>
    );
};

export default Fieldset;
