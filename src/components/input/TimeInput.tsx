import type { ComponentPropsWithoutRef, FC } from "react";
import { Input } from "../ui/input";

type Tprops = ComponentPropsWithoutRef<"input"> & {
    type: "start" | "end" | "break" | "work";
    isValid?: boolean;
};

const TimeInput: FC<Tprops> = ({
    id,
    value,
    onChange,
    className,
    type,
    isValid = false,
}) => {
    let cssStyle = "";

    switch (type) {
        case "start":
        case "end":
            cssStyle = isValid
                ? "ring-2 ring-indigo-100 text-indigo-500 border-yellow-300"
                : "ring-2 ring-red-100 focus-visible:ring-red-500 text-red-500";
            break;
        case "break":
            cssStyle = isValid
                ? "ring-2 ring-[rgba(245,158,11,0.2)] text-amber-500"
                : "ring-2 ring-red-100 border-red-500 focus-visible:ring-red-500 text-red-500";
            break;
        case "work":
            cssStyle = "ring-2 ring-[rgba(101,163,13,0.2)] text-lime-600";
            break;
    }

    return (
        <Input
            id={id}
            type="time"
            step="60"
            readOnly={type === "work"}
            value={value}
            onChange={onChange}
            className={`text-bold text-3xl text-center m-2 p-2 ${cssStyle} ${className}`}
        />
    );
};

export default TimeInput;
