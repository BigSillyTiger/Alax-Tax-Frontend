import type { FC } from "react";
import Card from "@/components/card";
import { usePayslipStore } from "@/configs/zustore";
import { useTranslation } from "react-i18next";
import {
    CalendarDaysIcon,
    CurrencyDollarIcon,
    NewspaperIcon,
} from "@heroicons/react/24/outline";
import { convertWorkHour, plusAB, timesAB } from "@/lib/calculations";
import { calWorkTime } from "@/lib/time";
import { useAtom } from "jotai";
import { atStaff } from "@/configs/atoms";

const WorkCard: FC = () => {
    const [t] = useTranslation();
    const [staff] = useAtom(atStaff);
    const staffWL = usePayslipStore((state) => state.staffWL);
    const dayRange = usePayslipStore((state) => state.dayRange);
    const totalWH = staffWL.reduce(
        (acc, cur) =>
            plusAB(
                acc,
                convertWorkHour(calWorkTime(cur.s_time, cur.e_time, cur.b_hour))
            ),
        0
    );
    const pay = timesAB(totalWH, staff.hr);

    const DateRange = () => (
        <section className="grid grid-cols-7 gap-2">
            <section className="col-span-1 row-span-2 flex justify-center items-center">
                <CalendarDaysIcon />
            </section>
            <section className="col-span-3 flex flex-col justify-center items-center">
                <label className="italic text-indigo-400 text-sm">
                    {t("label.start")}
                </label>
                <p className="text-lg rounded-lg p-2">
                    {dayRange?.from?.toDateString()}
                </p>
            </section>
            <section className="col-span-3 flex flex-col justify-center items-center">
                <label className="italic text-indigo-400 text-sm">
                    {t("label.end")}
                </label>
                <p className="text-lg rounded-lg p-2">
                    {dayRange?.to?.toDateString()}
                </p>
            </section>
        </section>
    );

    const Work = () => (
        <section className="grid grid-cols-7 gap-2 border-t-2 border-indigo-400 border-dashed pt-4">
            <section className="col-span-1 row-span-2 flex justify-center items-center">
                <NewspaperIcon />
            </section>
            <section className="col-span-6 flex flex-col justify-center items-center">
                <label className="italic text-indigo-400 text-sm">
                    {t("label.confirmedWU")}
                </label>
                <p className="rounded-lg p-2 text-xl">{totalWH}</p>
            </section>
        </section>
    );

    const Pay = () => (
        <section className="grid grid-cols-7 gap-2 border-t-2 border-indigo-400 border-dashed pt-4">
            <section className="col-span-1 row-span-2 flex justify-center items-center">
                <CurrencyDollarIcon />
            </section>
            <section className="col-span-6 flex flex-col justify-center items-center">
                <label className="italic text-indigo-400 text-sm">
                    {t("label.thisPay")}
                </label>
                <p className="rounded-lg p-2 text-xl">${pay}</p>
            </section>
        </section>
    );

    return (
        <Card>
            {(!dayRange?.from || !dayRange?.to) && (
                <p>{t("tips.noSelectedDayRange")}</p>
            )}
            {dayRange?.from && dayRange?.to ? (
                <section className="">
                    <DateRange />
                    <Work />
                    <Pay />
                </section>
            ) : (
                <></>
            )}
        </Card>
    );
};

export default WorkCard;
