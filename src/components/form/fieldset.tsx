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
            className={`py-2 border-2 border-indigo-100 flex justify-evenly rounded-lg ${sFieldset}`}
        >
            {title && (
                <legend
                    className={`ml-2 px-2 text-indigo-500 text-bold ${sLegend}`}
                >
                    {title}
                </legend>
            )}
            {children}
        </fieldset>
    );
};

export default Fieldset;
