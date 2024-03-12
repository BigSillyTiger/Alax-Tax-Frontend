import type { FC } from "react";
import { DayPicker } from "react-day-picker";
//import "react-day-picker/dist/style.css";
import "./datepickerstyle.css";
import styles from "./datepicker.module.css";
import { useJobAssignStore } from "@/configs/zustore";

const DatePicker: FC = () => {
    const selectedDate = useJobAssignStore((state) => state.selectedDate);
    const setDate = useJobAssignStore((state) => state.setDate);
    const currentWorkLogs = useJobAssignStore((state) => state.currentWorkLogs);
    const scheduledDays = currentWorkLogs.map((wl) => new Date(wl.wl_date));
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

export default DatePicker;
