import type { ComponentPropsWithoutRef, FC } from "react";
import { Input } from "../ui/input";

type Tprops = ComponentPropsWithoutRef<"input"> & {
    isValid?: boolean;
};

const TimeInput: FC<Tprops> = ({
    id,
    value,
    onChange,
    className,
    isValid = true,
    readOnly,
}) => {
    let cssStyle = "";

    cssStyle = isValid
        ? "ring-2 ring-indigo-100 text-indigo-500 border-yellow-300"
        : "ring-2 ring-red-100 focus-visible:ring-red-500 text-red-500";

    return (
        <Input
            id={id}
            type="time"
            step="60"
            readOnly={readOnly}
            value={value}
            onChange={onChange}
            className={`text-bold text-3xl text-center m-2 p-2 ${cssStyle} ${className}`}
        />
    );
};

export default TimeInput;
