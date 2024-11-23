import type { FC, ComponentPropsWithoutRef } from "react";

type Tprops = ComponentPropsWithoutRef<"div">;

const PageWrapper: FC<Tprops> = ({ children, className }) => {
    return (
        <div className={`cps-container border-0 py-2 ${className}`}>
            {children}
        </div>
    );
};

export default PageWrapper;
