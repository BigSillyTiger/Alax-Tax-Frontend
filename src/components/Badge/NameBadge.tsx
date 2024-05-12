import { colorWithStaffUid } from "@/configs/utils/color";
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
    name: string;
    uid: string;
};

const NameBadge: FC<Tprops> = ({ name, uid }) => {
    const color = colorWithStaffUid(uid);

    return (
        <span
            className={`rounded-full border-2 font-bold py-1 px-2 
            ${color.bg} ${color.border} ${color.text} flex flex-row justify-center items-center gap-x-1`}
        >
            {uid + ": " + name}
        </span>
    );
};

export default NameBadge;
