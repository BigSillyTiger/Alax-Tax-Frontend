import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { colorWithStaffUid } from "@/configs/utils/color";
import { FC } from "react";
import { useAdminStore } from "@/configs/zustore";
import { NameBadge } from "../Badge";
import { ROLES } from "@/configs/utils/staff";

type Tprops = { uid: string; name: string; content: string | null };

/**
 * @description using popover to show the wl note content
 *              - display plain badge
 *                  -   if no content
 *                  -   if current user is not manager, and current admin uid does not match uid passed in
 *              - display popover badge if not the situations above
 * @param param0
 * @returns
 */
const Badgepop: FC<Tprops> = ({ uid, name, content }) => {
    const color = colorWithStaffUid(uid);
    const currentAdmin = useAdminStore((state) => state.currentAdmin);
    const isManager =
        useAdminStore((state) => state.currentAdmin).role === ROLES.manager;
    const uidMatch = !isManager ? currentAdmin.uid === uid : true;

    return content && uidMatch ? (
        <Popover>
            <PopoverTrigger
                className={`rounded-full border-2 font-bold py-1 px-2 
            ${color.bg} ${color.border} ${color.text} flex flex-row justify-center items-center gap-x-1`}
            >
                <ExclamationCircleIcon className="size-8 text-amber-600" />
                <span className="pr-1">{uid + ": " + name}</span>
            </PopoverTrigger>
            <PopoverContent>{content}</PopoverContent>
        </Popover>
    ) : (
        <NameBadge name={name} uid={uid} />
    );
};

export default Badgepop;
