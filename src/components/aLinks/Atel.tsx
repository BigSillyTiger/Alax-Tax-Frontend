import { formNumberDigits } from "@/lib/literals";
import { FC, ComponentPropsWithoutRef } from "react";

type Tprops = ComponentPropsWithoutRef<"a">;

const Atel: FC<Tprops> = ({ href }) => {
    return (
        <a
            href={`tel:+${href}`}
            className="underline underline-offset-4 text-blue-500"
        >
            {href ? formNumberDigits(href) : ""}
        </a>
    );
};

export default Atel;
