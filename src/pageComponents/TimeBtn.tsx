import type { ComponentPropsWithoutRef } from "react";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { atModalOpen, atWorkLogTableRow } from "@/configs/atoms";
import { mOpenOps } from "@/configs/utils/modal";
import { TtimeBtnStyles } from "@/configs/types";
import { t } from "i18next";
import { calWorkTime } from "@/lib/time";
import { timeBtnStyleMap } from "@/configs/utils/color";

type Tprops = ComponentPropsWithoutRef<"div"> & {
    data: TwlTableRow;
    type: TtimeBtnStyles;
};

const TimeBtn = ({ data, type }: Tprops) => {
    const [, setModalOpen] = useAtom(atModalOpen);
    const [, setWorkLog] = useAtom(atWorkLogTableRow);

    const onClick = () => {
        setWorkLog(data);
        setModalOpen(mOpenOps.edit);
    };

    const time = (() => {
        switch (type) {
            case "startTime":
                return data.s_time;
            case "endTime":
                return data.e_time;
            case "breakTime":
                return data.b_hour;
            case "workTime":
                return calWorkTime(data.s_time, data.e_time, data.b_hour);
            default:
                return t("label.startTime");
        }
    })();

    const style = () => {
        return time === "00:00"
            ? timeBtnStyleMap.default
            : timeBtnStyleMap[type];
    };

    return (
        <Button
            onClick={onClick}
            className={`font-bold text-lg border-2 ${style()}`}
        >
            {time}
        </Button>
    );
};

export default TimeBtn;
