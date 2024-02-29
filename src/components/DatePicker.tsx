import { FC } from "react";
import { DayPicker } from "react-day-picker";
//import "react-day-picker/dist/style.css";
import "./datepickerstyle.css";
import { atSelectedDate } from "@/configs/atoms/atScheduleDate";
import { useAtom } from "jotai";

const DatePicker: FC = () => {
    const [selectedDate, setSelectedDate] = useAtom(atSelectedDate);
    return (
        <DayPicker
            showOutsideDays
            fixedWeeks
            mode="single"
            selected={selectedDate}
            onSelect={(day) => setSelectedDate(day as Date)}
        />
    );
};

export default DatePicker;
