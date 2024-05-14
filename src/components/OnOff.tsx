import type { FC } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { XCircleIcon } from "@heroicons/react/20/solid";

type Tprops = {
    access: "yes" | "no";
};

const OnOff: FC<Tprops> = ({ access }) => {
    return (
        <div className="size-8 w-full">
            {access === "yes" ? (
                <CheckCircleIcon className="text-green-600 size-full" />
            ) : (
                <XCircleIcon className="text-red-600 size-full" />
            )}
        </div>
    );
};

export default OnOff;
