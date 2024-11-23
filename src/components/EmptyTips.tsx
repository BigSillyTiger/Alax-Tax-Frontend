import type { FC, ComponentPropsWithoutRef } from "react";

type Tprops = ComponentPropsWithoutRef<"div">;

const EmptyTips: FC<Tprops> = ({ children }) => {
    return (
        <div className="text-slate-500 text-xl font-medium text-center">
            {children}
        </div>
    );
};

export default EmptyTips;
