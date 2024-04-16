import type { FC, ComponentPropsWithoutRef, MouseEventHandler } from "react";
import CloseBtn from "./CloseBtn";
import { Button } from "../ui/button";

type Tprops = ComponentPropsWithoutRef<"button"> & {
    name: string;
    onDelete: MouseEventHandler<HTMLButtonElement>;
};

const DateBtn: FC<Tprops> = ({ name, onClick, onDelete }) => {
    return (
        <div
            className={`bg-blue-100 text-indigo-400 hover:bg-blue-500 hover:text-white font-semibold  py-2 px-2 hover:border-transparent rounded flex items-center justify-around w-full cursor-pointer`}
        >
            <Button onClick={onClick} className="text-base grow">
                {name}
            </Button>
            <CloseBtn
                onClick={onDelete}
                xStyle="size-6 text-gray-400 hover:text-slate-100"
            />
        </div>
    );
};

export default DateBtn;
