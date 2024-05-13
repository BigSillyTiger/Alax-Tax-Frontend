import type { FC } from "react";
import { Input } from "../ui/input";

type Tprops = {
    value: string;
    className?: string;
    id?: string;
};

const BreakInputRO: FC<Tprops> = ({
    value,
    id = "breakInputRo",
    className = "w-full",
}) => {
    const [h, m] = value.split(":");
    const color =
        "w-full text-3xl text-amber-600 text-center focus-visible:ring-0";

    return (
        <div
            id={id}
            className={`flex flex-row justify-center items-center border-2 border-[rgba(245,158,11,0.2)] rounded-lg ${className}`}
        >
            <Input
                type="number"
                min="0"
                max="24"
                step="1"
                maxLength={2}
                readOnly
                value={h}
                className={`${color} text-right`}
            />
            <span className={`text-3xl font-normal text-amber-600 px-0.5`}>
                :
            </span>
            <Input
                type="number"
                min="0"
                max="59"
                step="1"
                maxLength={2}
                readOnly
                value={m}
                className={`${color} text-left`}
            />
        </div>
    );
};

export default BreakInputRO;
