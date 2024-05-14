import { linearLargeBG } from "@/configs/utils/color";
import type { ComponentPropsWithoutRef, FC } from "react";

type Tprops = ComponentPropsWithoutRef<"div">;

const SubtableCard: FC<Tprops> = ({ className, children, onClick }) => {
    return (
        <div
            className={`
            relative  py-2 mt-3 mb-2 mx-10
            ring-0 ring-opacity-25 rounded-lg p-3 
            ${linearLargeBG}
            drop-shadow-lg
            ${className}
            after:contents-[''] after:bg-indigo-100
            after:size-6 after:absolute
            after:-top-2 after:left-20
            after:-z-10
            after:rotate-45`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default SubtableCard;
