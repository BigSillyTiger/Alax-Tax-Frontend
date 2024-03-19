import type { ComponentPropsWithoutRef } from "react";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { atModalOpen, atWorkLogTableRow } from "@/configs/atoms";
import { mOpenOps, timeBtnStyleMap } from "@/configs/utils";
import { TtimeBtnStyles } from "@/utils/types";
import { t } from "i18next";
import { calWorkTime } from "@/utils/utils";

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
            case "start":
                return data.s_time;
            case "end":
                return data.e_time;
            case "break":
                return data.b_time;
            case "total":
                return calWorkTime(data.s_time, data.e_time, data.b_time);
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
