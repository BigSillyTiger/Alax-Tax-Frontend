import { routerPaths } from "@/configs/utils";
import { Tservice, Tunit } from "../configs/schema/settingSchema";
import { format } from "date-fns";
import { TwlTableRow, TworkLogs } from "@/configs/schema/workSchema";

export const isServiceType = (obj: Tservice | Tunit): obj is Tservice => {
    return (obj as Tservice).service !== undefined;
};

/**
 * @description the date stored in db is in ISO format: yyyy-MM-dd
 * @param dateString: yyyy-MM-dd
 * @returns return dd-MM-yyyy is used for displaying directly
 */
export const dateFormatAU = (dateString: string | null) => {
    if (!dateString) return "";
    return format(Date.parse(dateString), "dd-MM-yyyy");
};

/**
 * @description the date stored in db is in ISO format: yyyy-MM-dd
 * @param date Date
 * @returns yyy-MM-dd is used for datepicker
 */
export const dateFormatISO = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear().toString();

    return `${year}-${month}-${day}`;
};

export type AreTypesEqual<T, U> = T extends U ? true : false;

/**
 * @param str
 * @returns generate new string with 1st letter capitalized and rest lowercased
 */
export const capFirstLetter = (str: string) => {
    if (!str) return "";
    return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
};

/**
 * @description generate action for relative router path
 */
export const genAction = (path: keyof typeof routerPaths, cid?: string) => {
    switch (path) {
        case "init":
            return `/${path}`;
        case "login":
            return `/${path}`;
        case "dashboard":
            return `/${path}`;
        case "clients":
            return `/${path}`;
        case "client":
            return `/${path}s/${cid}`;
        case "orders":
            return `/${path}`;
        case "calendar":
            return `/${path}`;
        case "staff":
            return `/${path}`;
        case "setting":
            return `/${path}`;
    }
};

/**
 * @description sort work logs by date
 */
export const sortWorkLogs = (sort: "dsc" | "asc", workLogs: TworkLogs[]) => {
    return workLogs.sort((a, b) => {
        const dateA = new Date(a.wl_date).getTime();
        const dateB = new Date(b.wl_date).getTime();
        if (sort === "asc") {
            return dateA - dateB;
        }
        return dateB - dateA;
    });
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

export const calBreakTime = (sTime: string, eTime: string, bHour: string) => {
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
    const totalWorkMinutes =
        endTotalMinutes - startTotalMinutes + breakTotalMinutes;

    // Convert total work time back to hh:mm format
    const workHour = Math.floor(totalWorkMinutes / 60);
    const workMinute = totalWorkMinutes % 60;
    return `${workHour.toString().padStart(2, "0")}:${workMinute.toString().padStart(2, "0")}`;
};

export const hmsTohm = (time: string) => {
    //const [hour, minute] = time.split(":");
    //return `${hour}:${minute}`;
    return time.slice(0, 5);
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
