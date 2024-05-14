import type { FC, ComponentPropsWithoutRef, MouseEventHandler } from "react";
import CloseBtn from "./CloseBtn";

type Tprops = ComponentPropsWithoutRef<"button"> & {
    name: string;
    onDelete: MouseEventHandler<HTMLButtonElement>;
};

const DateBtn: FC<Tprops> = ({ name, onClick, onDelete }) => {
    return (
        <div
            className={`bg-blue-100 text-indigo-400 font-semibold  py-2 px-2
            rounded flex items-center justify-around w-full cursor-pointer
            hover:bg-blue-500
            hover:text-white hover:border-transparent
            hover:transition-all hover:duration-500 hover:ease-in-out
            active:scale-95
            `}
        >
            <button onClick={onClick} className="text-base grow">
                {name}
            </button>
            <CloseBtn
                onClick={onDelete}
                xStyle="size-6 text-gray-400 hover:text-slate-100"
            />
        </div>
    );
};

export default DateBtn;
