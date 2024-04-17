import Card from "@/components/card";
import { atModalOpen } from "@/configs/atoms";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { TstatusColor } from "@/configs/types";
import { mOpenOps } from "@/configs/utils/modal";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";
import { statusColor } from "@/configs/utils/color";
import { joinAllValues } from "@/lib/utils";
import { useAtom } from "jotai";
import type { FC } from "react";

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
            className="cursor-pointer h-auto grid grid-cols-5 gap-y-2 border-2 border-indigo-300"
            onClick={onClick}
        >
            <div className="col-span-3">
                <p className="text-lg">
                    <b className="text-indigo-600">
                        {data.first_name + " " + data.last_name}
                    </b>
                    {" - " + data.fk_uid}
                </p>
            </div>
            <div className="col-span-2 italic">
                <p
                    className={`border-2 text-center rounded-lg font-bold ${joinAllValues(statusColor[data.wl_status as TstatusColor])}`}
                >
                    {data.wl_status}
                </p>
            </div>
            <div className="col-span-full">
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
        </Card>
    );
};

export default WorkCard;
