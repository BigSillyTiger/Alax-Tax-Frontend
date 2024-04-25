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
            <span className={`text-md ${spanClass}`}>{children}</span>
        </div>
    );
};

export default SingleField;
