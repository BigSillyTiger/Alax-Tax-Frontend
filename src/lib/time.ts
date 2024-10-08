import { DEFAULT_EXPIRY_DATE } from "@/configs/utils/setting";
import { format } from "date-fns";

export const genHHMM = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
};

/**
 * @description convert au date string to ISO format
 * @param date
 * @returns
 */
export const auToISO = (date: string) => {
    const parts = date.split("-");
    const y = parts[2];
    const m = parts[1];
    const d = parts[0];
    return `${y}-${m}-${d}`;
};

/**
 * @description the date stored in db is in ISO format: yyyy-MM-dd
 * @param date Date
 * @returns yyy-MM-dd is used for datepicker
 */
export const dateFormat = (
    date: Date | string | null | undefined,
    form: "au" | "iso" = "iso"
) => {
    if (date instanceof Date) {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
        const year = date.getFullYear().toString();

        return form === "au"
            ? `${day}-${month}-${year}`
            : `${year}-${month}-${day}`;
    } else if (typeof date === "string") {
        return form === "au"
            ? format(Date.parse(date), "dd-MM-yyyy")
            : format(Date.parse(date), "yyyy-MM-dd");
    } else {
        return "";
    }
};

export const hmsTohm = (time: string) => {
    //const [hour, minute] = time.split(":");
    //return `${hour}:${minute}`;
    return time.slice(0, 5);
};

export const calBreakTime = (
    restTime: string,
    nowTime: string,
    bHour: string
) => {
    restTime = restTime ?? "00:00";
    nowTime = nowTime ?? "00:00";
    bHour = bHour ?? "00:00";
    // Parse rest time
    const [restHour, restMinute] = restTime.split(":").map(Number);
    // Parse now time
    const [nowHour, nowMinute] = nowTime.split(":").map(Number);
    // Parse break hour
    const [breakHour, breakMinute] = bHour.split(":").map(Number);

    // Convert time strings to total minutes
    const restTotalMinutes = restHour * 60 + restMinute;
    const nowTotalMinutes = nowHour * 60 + nowMinute;
    const breakTotalMinutes = breakHour * 60 + breakMinute;

    // Calculate total work time in minutes
    const totalWorkMinutes =
        nowTotalMinutes - restTotalMinutes + breakTotalMinutes;

    // Convert total break time back to hh:mm format
    const workHour = Math.floor(totalWorkMinutes / 60);
    const workMinute = totalWorkMinutes % 60;
    return `${workHour.toString().padStart(2, "0")}:${workMinute.toString().padStart(2, "0")}`;
};

export const calWorkTime = (
    sTime: string | null,
    eTime: string | null,
    bHour: string | null
) => {
    sTime = sTime ?? "00:00";
    eTime = eTime ?? "00:00";
    bHour = bHour ?? "00:00";
    // Parse start time
    const [startHour, startMinute] = sTime.split(":").map(Number);
    // Parse end time
    const [endHour, endMinute] = eTime.split(":").map(Number);
    // Parse break time
    const [breakHour, breakMinute] = bHour.split(":").map(Number);

    // Convert time strings to total minutes
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    const breakTotalMinutes = breakHour * 60 + breakMinute;

    // Calculate total work time in minutes
    let totalWorkMinutes =
        endTotalMinutes - startTotalMinutes - breakTotalMinutes;

    // Handle cases where the break time is longer than the work time
    if (totalWorkMinutes < 0) {
        totalWorkMinutes = 0;
    }

    // Convert total work time back to hh:mm format
    const workHour = Math.floor(totalWorkMinutes / 60);
    const workMinute = totalWorkMinutes % 60;
    return `${workHour.toString().padStart(2, "0")}:${workMinute.toString().padStart(2, "0")}`;
};

export const isWorkHoursValid = (
    s_time: string,
    e_time: string,
    b_hour: string
) => {
    // Split the time strings into hours and minutes
    const [startHour, startMinute] = s_time.split(":").map(Number);
    const [endHour, endMinute] = e_time.split(":").map(Number);
    const [breakHour, breakMinute] = b_hour.split(":").map(Number);

    // Calculate total duration in minutes between start time and end time
    const totalDurationMinutes =
        (endHour - startHour) * 60 + (endMinute - startMinute);

    // Calculate break time in minutes
    const breakTimeMinutes = breakHour * 60 + breakMinute;

    // Check if break time is smaller than total duration
    return breakTimeMinutes < totalDurationMinutes;
};

/**
 * @description check if the day is between start and end
 * @param start
 * @param end
 * @param day
 */
export const checkDateRange = (
    start: Date | undefined,
    end: Date | undefined,
    day: Date
) => {
    if (!start || !end) {
        return false;
    }
    // Set time component of day to 00:00:00
    const dayWithoutTime = new Date(day);
    dayWithoutTime.setHours(0, 0, 0, 0);

    // Set time component of start and end to 00:00:00
    const startWithoutTime = new Date(start);
    startWithoutTime.setHours(0, 0, 0, 0);
    const endWithoutTime = new Date(end);
    endWithoutTime.setHours(0, 0, 0, 0);

    return (
        startWithoutTime <= dayWithoutTime && dayWithoutTime <= endWithoutTime
    );
};

/**
 * @description check if the date is expired
 * @param startDate
 * @param days
 * @returns
 */
export const isDateExpired = (startDate: string, days: number) => {
    // Convert the start date string to a Date object
    const startDateObj = new Date(startDate);

    // Calculate the expiry date
    const expiryDate = new Date(
        startDateObj.getTime() + days * 24 * 60 * 60 * 1000
    );

    // Get today's date
    const today = new Date();

    // Check if the expiry date is before today
    return expiryDate < today;
};

/**
 * @description calculate the expiry date
 * @param startDate
 * @param days
 * @returns
 */
export const calculateExpiryDate = (
    startDate: string,
    days: number
): string => {
    // Convert the start date string to a Date object
    const startDateObj = new Date(startDate);

    // Calculate the expiry date
    const expiryDate = new Date(
        startDateObj.getTime() + days * 24 * 60 * 60 * 1000
    );

    // Format the expiry date as 'yyyy-mm-dd'
    const year = expiryDate.getFullYear();
    const month = String(expiryDate.getMonth() + 1).padStart(2, "0");
    const day = String(expiryDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

/**
 * @description form date or string for client service
 */
export const formExpiryDate = (date: Date | string | null) => {
    return date === DEFAULT_EXPIRY_DATE ? "none" : dateFormat(date, "au");
};
