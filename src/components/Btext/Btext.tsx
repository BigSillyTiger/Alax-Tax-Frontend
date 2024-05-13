import type { ComponentPropsWithoutRef } from "react";

const Btext = ({ className, children }: ComponentPropsWithoutRef<"b">) => {
    return <b className={`text-zinc-500 text-lg ${className}`}>{children}</b>;
};

export default Btext;
