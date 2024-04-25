import { TstatusColor } from "@/configs/types";
import { statusColor } from "@/configs/utils/color";
import { joinAllValues } from "@/lib/utils";
import { capFirstLetter } from "@/lib/literals";
import type { FC } from "react";

/**
 * @description badge component,
 * @param color must contain:
 *              - bg color / 200
 *              - text color / 700
 *              - ring color / 500-600
 *              - e.g. text-slate-100 bg-lime-500 border-lime-600
 * @param value badge value / name
 * @returns
 */
type Tprops = {
    value: TstatusColor | undefined;
};

const StatusBadge: FC<Tprops> = ({ value }) => {
    if (!value) {
        return <></>;
    }
    return (
        <span
            className={`rounded-full border-2 font-bold py-1 px-2 
            ${joinAllValues(statusColor[value.toLowerCase() as TstatusColor])}`}
        >
            {capFirstLetter(value)}
        </span>
    );
};

export default StatusBadge;
