import { FC } from "react";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
//import "react-day-picker/dist/style.css";
import "./datepickerstyle.css";

type Tprops = {
    value: Date | undefined;
    onChange: SelectSingleEventHandler;
};

const DatePicker: FC<Tprops> = ({ value, onChange }) => {
    return (
        <DayPicker
            showOutsideDays
            mode="single"
            selected={value}
            onSelect={onChange}
        />
    );
};

export default DatePicker;
