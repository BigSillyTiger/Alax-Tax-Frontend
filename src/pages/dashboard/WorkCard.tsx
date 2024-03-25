import Card from "@/components/card";
import { atModalOpen } from "@/configs/atoms";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { mOpenOps, wlStatusColorMap } from "@/configs/utils";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";
import { useAtom } from "jotai";
import type { FC } from "react";

type Tprops = {
    data: TwlTableRow;
};

const WorkCard: FC<Tprops> = ({ data }) => {
    const [, setModalOpen] = useAtom(atModalOpen);
    const setWlid = useTodayWLStore((state) => state.setWlid);

    const onClick = () => {
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
                    className={`border-2 text-center rounded-lg font-bold ${wlStatusColorMap[data.wl_status]}`}
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
