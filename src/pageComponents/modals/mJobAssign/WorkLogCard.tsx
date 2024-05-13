import SingleField from "@/components/SingleField";
import UserIcon from "@/components/UserIcon";
import { Amail, Atel } from "@/components/aLinks";
import Card from "@/components/Card";
import { TassignedWork } from "@/configs/schema/workSchema";
import { useJobAssignStore } from "@/configs/zustore";
import { calWorkTime } from "@/lib/time";
import {
    CalendarDaysIcon,
    EnvelopeIcon,
    IdentificationIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import { StatusBadge } from "@/components/Badge";
import { useTranslation } from "react-i18next";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, ComponentPropsWithoutRef, useState } from "react";
import { linearLargeBG } from "@/configs/utils/color";
import Label from "@/components/Label";
import { BreakInputRO, TimeInput } from "@/components/input";
import WorkInput from "@/components/input/WorkInput";

type Tprops<T extends TassignedWork> = ComponentPropsWithoutRef<"div"> & {
    item: T;
};

const WorkLogCard = <T extends TassignedWork>({
    item,
    className,
}: Tprops<T>) => {
    const { t } = useTranslation();
    const [totalWH] = useState(
        calWorkTime(item.s_time, item.e_time, item.b_hour)
    );
    const currentWLUnion = useJobAssignStore((state) => state.currentWLUnion);
    const setWorkLogs = useJobAssignStore((state) => state.setWorkLogs);
    const selectedDate = useJobAssignStore((state) => state.selectedDate);

    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newWL = currentWLUnion.map((wl) => {
            if (wl.fk_oid === item.fk_oid) {
                return {
                    ...wl,
                    assigned_work: wl.assigned_work.map((aw) => {
                        if (
                            aw.fk_uid === item.fk_uid &&
                            aw.wl_date === item.wl_date
                        ) {
                            return {
                                ...aw,
                                [e.target.id]: e.target.value,
                            };
                        } else {
                            return aw;
                        }
                    }),
                };
            } else {
                return wl;
            }
        });
        setWorkLogs(newWL);
    };

    const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newWL = currentWLUnion.map((wl) => {
            if (wl.fk_oid === item.fk_oid) {
                return {
                    ...wl,
                    assigned_work: wl.assigned_work.map((aw) => {
                        if (
                            aw.fk_uid === item.fk_uid &&
                            aw.wl_date === item.wl_date
                        ) {
                            return {
                                ...aw,
                                wl_note: e.target.value,
                            };
                        } else {
                            return aw;
                        }
                    }),
                };
            } else {
                return wl;
            }
        });
        setWorkLogs(newWL);
    };

    return (
        /* self-11 content-8 */
        <Card
            className={`${className} mt-3 grid grid-cols-1 gap-x-4 sm:grid-cols-8 py-2 ${linearLargeBG}`}
        >
            {/* 3 col */}
            <div className="col-span-3 flex flex-col justify-start gap-y-1">
                <div className="col-span-full row-span-2">
                    <UserIcon
                        fName={item.first_name}
                        lName={item.last_name}
                        size="xl"
                    />
                </div>
                <p className="col-span-full row-span-1 text-xl font-extrabold text-indigo-700 text-wrap">
                    {item.first_name + " " + item.last_name}
                </p>
                <SingleField
                    label={<IdentificationIcon />}
                    outClass=""
                    spanClass="text-bold text-indigo-500"
                >
                    {item.fk_uid}
                </SingleField>
                <SingleField
                    label={<PhoneIcon />}
                    outClass=""
                    spanClass="font-semibold"
                >
                    <Atel href={item.phone} />
                </SingleField>
                <SingleField
                    label={<EnvelopeIcon />}
                    outClass=""
                    spanClass="font-semibold"
                >
                    <Amail href={item.email} />
                </SingleField>
                <SingleField
                    label={<CalendarDaysIcon />}
                    outClass=""
                    spanClass="text-bold text-indigo-500"
                >
                    {selectedDate ? selectedDate.toDateString() : ""}
                </SingleField>
                <div>
                    <StatusBadge value={item.wl_status} />
                </div>
            </div>
            {/* 5 col */}
            <div className="col-span-5">
                {/* time area */}
                <Label htmlFor="timeCard">{t("label.workTime")}</Label>
                <Card
                    id="timeCard"
                    className="p-2 justify-evenly grid grid-cols-4 gap-x-2 gap-y-2"
                >
                    <div className="col-span-2 row-span-1">
                        <Label htmlFor="s_time" className="mx-2 font-normal">
                            {t("label.start")}
                        </Label>
                        <TimeInput
                            id="s_time"
                            readOnly
                            value={item.s_time ? item.s_time : "00:00"}
                            onChange={handleTimeChange}
                            className="w-[65%]"
                        />
                    </div>
                    <div className="col-span-2 row-span-1">
                        <Label htmlFor="e_time" className="mx-2 font-normal">
                            {t("label.end")}
                        </Label>
                        <TimeInput
                            id="e_time"
                            readOnly
                            value={item.e_time ? item.e_time : "00:00"}
                            onChange={handleTimeChange}
                            className="w-[65%]"
                        />
                    </div>
                    <div className="col-span-2 row-span-1">
                        <Label htmlFor="b_hour" className="mx-2 font-normal">
                            {t("label.break")}
                        </Label>
                        <BreakInputRO
                            id="b_hour"
                            value={item.b_hour}
                            className="w-[67%] ml-1.5"
                        />
                    </div>
                    <div className="col-span-2 row-span-1">
                        <Label
                            htmlFor="total_time"
                            className="mx-2 font-normal"
                        >
                            {t("label.workTime")}
                        </Label>
                        <WorkInput value={totalWH} className="w-[67%] ml-1.5" />
                    </div>
                </Card>
                {/* note area */}
                <div className="mt-1">
                    <label
                        htmlFor="wl_note"
                        className="mx-2 text-slate-500 font-bold"
                    >
                        {t("label.workNote")}
                    </label>
                    <Textarea
                        id="wl_note"
                        className="w-full"
                        value={item.wl_note ?? ""}
                        onChange={handleNoteChange}
                    />
                </div>
            </div>
        </Card>
    );
};

export default WorkLogCard;
