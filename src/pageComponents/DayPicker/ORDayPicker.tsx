import { useEffect, type FC } from "react";
import { DayPicker } from "react-day-picker";
//import "react-day-picker/dist/style.css";
import "./datepickerstyle.css";
import styles from "./datepicker.module.css";
import { useOrderArrangementStore } from "@/configs/zustore/orderArrangeStore";
import { dateFormat } from "@/lib/time";

/**
 * @description job assignment day picker
 * @returns
 */
const ORDayPicker: FC = () => {
    const selectedDate = useOrderArrangementStore(
        (state) => state.selectedDate
    );
    const setDate = useOrderArrangementStore((state) => state.setDate);
    const orderArrangement = useOrderArrangementStore(
        (state) => state.orderArrangement
    );
    const setCurrentOA = useOrderArrangementStore(
        (state) => state.setCurrentOA
    );

    useEffect(() => {
        setCurrentOA(
            orderArrangement.find((order) => {
                return order.date === dateFormat(selectedDate);
            })!
        );
    }, [selectedDate, orderArrangement, setCurrentOA]);

    const scheduledDays = orderArrangement.map((order) => new Date(order.date));

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

    // the daypicker is set to required, so day is not undefined
    const handleClick = (day: Date | undefined) => {
        setDate(day as Date);
        setCurrentOA(
            orderArrangement.find((order) => {
                return order.date === dateFormat(day);
            })!
        );
    };

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
                mode="single"
                required
                selected={selectedDate}
                onSelect={handleClick}
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

export default ORDayPicker;
