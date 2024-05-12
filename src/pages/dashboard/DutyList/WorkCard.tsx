import Card from "@/components/Card";
import { atModalOpen } from "@/configs/atoms";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { TstatusColor } from "@/configs/types";
import { mOpenOps } from "@/configs/utils/modal";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";
import { colorWithStaffUid, statusColor } from "@/configs/utils/color";
import { joinAllValues } from "@/lib/utils";
import { useAtom } from "jotai";
import type { FC } from "react";
import { capFirstLetter } from "@/lib/literals";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

type Tprops = {
    data: TwlTableRow;
    clickAble?: boolean;
};

const WorkCard: FC<Tprops> = ({ data, clickAble = true }) => {
    const [, setModalOpen] = useAtom(atModalOpen);
    const setWlid = useTodayWLStore((state) => state.setWlid);

    const onClick = () => {
        if (!clickAble) return;
        setWlid(data.wlid);
        setModalOpen(mOpenOps.edit);
    };

    return (
        <Card
            className="cursor-pointer h-auto grid grid-cols-5 gap-y-2 border-indigo-300"
            onClick={onClick}
        >
            <div className="col-span-3">
                <p className="text-lg">
                    <b className="text-indigo-600 text-lg">
                        {data.first_name + " " + data.last_name}
                    </b>
                    {" - "}{" "}
                    <span className={`${colorWithStaffUid(data.fk_uid).text}`}>
                        {data.fk_uid}
                    </span>
                </p>
            </div>
            <div className="col-span-2 italic">
                <p
                    className={`border-2 text-center rounded-lg font-bold ${joinAllValues(statusColor[data.wl_status as TstatusColor])}`}
                >
                    {capFirstLetter(data.wl_status)}
                </p>
            </div>
            <div className="col-span-full text-lg">
                <p>
                    {data.address +
                        ", " +
                        data.suburb +
                        ", " +
                        data.city +
                        ", " +
                        data.state +
                        "," +
                        data.postcode}
                </p>
            </div>
            {data.wl_note && (
                <div className="col-span-full flex flex-row justify-start items-center border-t-2 border-dashed border-indigo-300 pt-2">
                    <ExclamationCircleIcon className="size-10 text-amber-600 mr-2" />
                    <span className="text-lg">{data.wl_note}</span>
                </div>
            )}
        </Card>
    );
};

export default WorkCard;
