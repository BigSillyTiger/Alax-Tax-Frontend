import { useEffect, useMemo, type FC } from "react";
import { DayPicker } from "react-day-picker";
//import "react-day-picker/dist/style.css";
import "./datepickerstyle.css";
import styles from "./datepicker.module.css";
import { usePayslipStore, useStaffWLStore } from "@/configs/zustore";
import { atStaff } from "@/configs/atoms";
import { useAtom } from "jotai";
import { auToISO, checkDateRange } from "@/lib/time";

/**
 * @description job assignment day picker
 * @returns
 */
const RangedDayPicker: FC = () => {
    const allStaffWL = useStaffWLStore((state) => state.allStaffWL);
    const dayRange = usePayslipStore((state) => state.dayRange);
    const setDayRange = usePayslipStore((state) => state.setDayRange);
    const staffWL = usePayslipStore((state) => state.staffWL);
    const setStaffWL = usePayslipStore((state) => state.setStaffWL);
    const setDeduction = usePayslipStore((state) => state.setDeduction);
    const [staff] = useAtom(atStaff);

    const [startD, endD, defaultD] = (() => {
        const swl = allStaffWL.filter(
            (log) => log.fk_uid === staff.uid && log.wl_status === "confirmed"
        );
        const dates = swl.map((item) => auToISO(item.wl_date));
        console.log("->  all date: ", dates);
        return [
            new Date(dates[dates.length - 1]),
            new Date(dates[0]),
            new Date(dates[dates.length - 1]),
        ];
    })();

    const newDeduct = useMemo(() => {
        return staffWL
            .map((wl) => {
                if (wl.deduction) {
                    return wl.deduction;
                }
            })
            .filter((wl) => wl !== undefined)[0];
    }, [staffWL]);

    const newStaffWL = useMemo(() => {
        return allStaffWL.filter(
            (s) =>
                s.fk_uid === staff.uid &&
                s.wl_status === "confirmed" &&
                checkDateRange(
                    dayRange?.from,
                    dayRange?.to,
                    new Date(auToISO(s.wl_date))
                )
        );
    }, [staff.uid, dayRange, allStaffWL]);

    useEffect(() => {
        setStaffWL(newStaffWL);
    }, [newStaffWL, setStaffWL]);

    useEffect(() => {
        newDeduct && setDeduction(newDeduct);
    }, [newDeduct, setDeduction]);

    const css = `
        .my-selected:not([disabled]) { 
            font-weight: bold; 
            border: 2px solid #4338ca;
        }
        .my-selected:hover:not([disabled]) { 
            border-color: #6366f1;
            color: #6366f1;
        }
        .my-today { 
            font-weight: bold;
            font-size: 140%; 
            color: #15803d;
        }
        .my-scheduled {
            font-weight: bold; 
            border: 2px solid #4338ca;
        }
        `;

    return (
        <div className={styles.reactDatepicker}>
            <style>{css}</style>
            <DayPicker
                showOutsideDays
                showWeekNumber
                fixedWeeks
                /* captionLayout="dropdown-buttons"
                fromYear={2010}
                toYear={2100} */
                weekStartsOn={1}
                firstWeekContainsDate={4}
                fromDate={startD}
                toDate={endD}
                mode="range"
                defaultMonth={defaultD}
                selected={dayRange}
                onSelect={setDayRange}
                // define custom modifiers - scheduled
                // modifiers={{ scheduled: scheduledDays }}
                // assign custom class names to the modifiers
                modifiersClassNames={{
                    //selected: "my-scheduled",
                    today: "my-today",
                    //scheduled: "my-scheduled",
                }}
                formatters={
                    {
                        // Add `W` prefix to week number
                        //formatWeekNumber: (weekNumber) => `W${weekNumber}`
                    }
                }
            />
        </div>
    );
};

export default RangedDayPicker;
