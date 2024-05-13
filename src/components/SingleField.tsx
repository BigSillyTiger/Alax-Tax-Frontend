import type { ComponentPropsWithoutRef, FC, ReactElement } from "react";

type Tprops = ComponentPropsWithoutRef<"div"> & {
    label: ReactElement | string;
    outClass?: string;
    spanClass?: string;
};

const SingleField: FC<Tprops> = ({
    label,
    children,
    outClass = "",
    spanClass = "",
}) => {
    return (
        <div className={`flex items-center ${outClass}`}>
            <div className="size-8 text-indigo-500 flex justify-center">
                {label}
                :&nbsp;
            </div>
            <div className={`w-full text-md text-wrap break-all ${spanClass}`}>
                {children}
            </div>
        </div>
    );
};

export default SingleField;
