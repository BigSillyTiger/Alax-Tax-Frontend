import { ChangeEvent, useState, type FC } from "react";
import { Input } from "../ui/input";

type Tprops = {
    value: string;
    isValid?: boolean;
    onChange: (value: string) => void;
    id?: string;
    className?: string;
};

const BreakInput: FC<Tprops> = ({
    value,
    onChange,
    isValid = true,
    id = "breakInput",
    className = "w-full",
}) => {
    const [hours, setHours] = useState(value.substring(0, 2) || "00");
    const [minutes, setMinutes] = useState(value.substring(3, 5) || "00");
    const color = isValid
        ? "w-full text-3xl text-amber-600 text-center focus-visible:ring-amber-500 focus-visible:ring-2"
        : "w-full text-3xl text-red-600 text-center focus-visible:ring-red-500 focus-visible:ring-2";
    const handleHChange = (e: ChangeEvent<HTMLInputElement>) => {
        const ori = e.target.value.replace(/\D/g, "");
        const oriL = ori.length;
        if (oriL === 0) {
            setHours("00");
            onChange(`00:${minutes.padStart(2, "0")}`);
            return;
        } else if (oriL === 1) {
            setHours(0 + ori);
            onChange(`0${ori}:${minutes.padStart(2, "0")}`);
            return;
        } else {
            setHours(ori.slice(-2));
            onChange(`${ori.slice(-2)}:${minutes.padStart(2, "0")}`);
            return;
        }
    };
    const handleMChange = (e: ChangeEvent<HTMLInputElement>) => {
        const ori = e.target.value.replace(/\D/g, "");
        const oriL = ori.length;
        if (oriL === 0) {
            setMinutes("00");
            onChange(`${hours.padStart(2, "0")}:00`);
            return;
        } else if (oriL === 1) {
            setMinutes(0 + ori);
            onChange(`${hours.padStart(2, "0")}:0${ori}`);
            return;
        } else if (oriL >= 2 && Number(ori.slice(-2)) <= 59) {
            setMinutes(ori.slice(-2));
            onChange(`${hours.padStart(2, "0")}:${ori.slice(-2)}`);
            return;
        } else {
            setMinutes("59");
            onChange(`${hours.padStart(2, "0")}:${59}`);
            return;
        }
    };

    return (
        <div
            id={id}
            className={`flex flex-row justify-center items-center border-2 ${isValid ? "border-[rgba(245,158,11,0.2)]" : "border-red-100"} rounded-lg ${className}`}
        >
            <Input
                type="text"
                value={hours}
                className={`${color} text-right`}
                onChange={handleHChange}
            />
            <span
                className={`text-3xl font-normal ${isValid ? "text-amber-600" : "text-red-600"} px-0.5`}
            >
                :
            </span>
            <Input
                type="text"
                value={minutes}
                className={`${color} text-left`}
                onChange={handleMChange}
            />
        </div>
    );
};

export default BreakInput;
