import type { FC } from "react";
import { DayPicker } from "react-day-picker";
//import "react-day-picker/dist/style.css";
import "./datepickerstyle.css";
import styles from "./datepicker.module.css";
import { useJobAssignStore } from "@/configs/zustore";
import { daypickerCSS } from "@/configs/utils/color";

/**
 * @description job assignment day picker
 * @returns
 */
const JADayPicker: FC = () => {
    const selectedDate = useJobAssignStore((state) => state.selectedDate);
    const setDate = useJobAssignStore((state) => state.setDate);
    const currentWLUnion = useJobAssignStore((state) => state.currentWLUnion);
    const scheduledDays = currentWLUnion.map((wl) => new Date(wl.wl_date));

    return (
        <div className={styles.reactDatepicker}>
            <style>{daypickerCSS}</style>
            <DayPicker
                showOutsideDays
                showWeekNumber
                fixedWeeks
                /* captionLayout="dropdown-buttons"
                fromYear={2010}
                toYear={2100} */
                weekStartsOn={1}
                firstWeekContainsDate={4}
                mode="single"
                required
                selected={selectedDate}
                onSelect={(day) => setDate(day as Date)}
                // define custom modifiers - scheduled
                modifiers={{ scheduled: scheduledDays }}
                // assign custom class names to the modifiers
                modifiersClassNames={{
                    //selected: "my-scheduled",
                    today: "my-today",
                    scheduled: "my-scheduled",
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

export default JADayPicker;
