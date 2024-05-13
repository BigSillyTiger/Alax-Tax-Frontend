import type { FC } from "react";
import { Input } from "../ui/input";

type Tprops = {
    value: string;
    className?: string;
};

const WorkInput: FC<Tprops> = ({ value, className = "w-full" }) => {
    const [h, m] = value.split(":");
    const color =
        "w-full text-3xl text-lime-700 text-center focus-visible:ring-0";

    return (
        <div
            className={`flex flex-row justify-center items-center border-2 border-[rgba(101,163,13,0.2)] rounded-lg ${className}`}
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
            <span className={`text-3xl font-normal text-lime-700 px-0.5`}>
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

export default WorkInput;
