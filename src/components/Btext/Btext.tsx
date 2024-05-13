import type { ComponentPropsWithoutRef } from "react";

const Btext = ({ className, children }: ComponentPropsWithoutRef<"b">) => {
    return <b className={`text-sky-600 text-lg ${className}`}>{children}</b>;
};

export default Btext;
