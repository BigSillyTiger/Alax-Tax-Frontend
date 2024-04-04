import type { FC } from "react";
import { DayPicker } from "react-day-picker";
//import "react-day-picker/dist/style.css";
import "./datepickerstyle.css";
import styles from "./datepicker.module.css";
import { useDayRangeStore, useStaffWLStore } from "@/configs/zustore";
import { atStaff } from "@/configs/atoms";
import { useAtom } from "jotai";
import { auToISO } from "@/utils/utils";

/**
 * @description job assignment day picker
 * @returns
 */
const RangedDayPicker: FC = () => {
    const dayRange = useDayRangeStore((state) => state.dayRange);
    const setDayRange = useDayRangeStore((state) => state.setDayRange);
    const staffWL = useStaffWLStore((state) => state.staffWL);
    const [staff] = useAtom(atStaff);
    const swl = staffWL.filter(
        (log) => log.fk_uid === staff.uid && log.wl_status === "confirmed"
    );

    // convert date string to yyyy-mm-dd format
    const dates = swl.map((item) => auToISO(item.wl_date));

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

                fromDate={new Date(dates[dates.length - 1])}
                toDate={new Date(dates[0])}
                mode="range"
                defaultMonth={new Date(dates[dates.length - 1])}
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
