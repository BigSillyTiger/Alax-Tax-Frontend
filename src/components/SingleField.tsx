import type { FC, ReactElement } from "react";

type Tprops = {
    label: ReactElement | string;
    content: ReactElement | string;
    outClass?: string;
    spanClass?: string;
};

const SingleField: FC<Tprops> = ({
    label,
    content,
    outClass = "",
    spanClass = "",
}) => {
    return (
        <div className={`flex items-center ${outClass}`}>
            <div className="size-8 text-indigo-500 inline-flex">
                {label}
                :&nbsp;
            </div>
            <span className={`text-md ${spanClass}`}>{content}</span>
        </div>
    );
};

export default SingleField;
