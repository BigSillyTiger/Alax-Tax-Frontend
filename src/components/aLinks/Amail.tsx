import { ComponentPropsWithoutRef, FC } from "react";

type Tprops = ComponentPropsWithoutRef<"a">;

const Amail: FC<Tprops> = ({ href }) => {
    return (
        <a
            href={`mailto:+${href}`}
            className="w-full text-wrap break-words underline underline-offset-4 text-blue-500"
        >
            {href}
        </a>
    );
};

export default Amail;
