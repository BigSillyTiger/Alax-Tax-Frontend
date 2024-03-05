import { FC } from "react";
import { DayPicker } from "react-day-picker";
//import "react-day-picker/dist/style.css";
import "./datepickerstyle.css";
import { useJobAssignStore } from "@/configs/zustore";

const DatePicker: FC = () => {
    const selectedDate = useJobAssignStore((state) => state.selectedDate);
    const setDate = useJobAssignStore((state) => state.setDate);
    return (
        <DayPicker
            showOutsideDays
            fixedWeeks
            mode="single"
            selected={selectedDate}
            onSelect={(day) => setDate(day as Date)}
        />
    );
};

export default DatePicker;
