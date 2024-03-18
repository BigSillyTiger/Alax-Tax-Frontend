import { routerPaths } from "@/configs/utils";
import { Tservice, Tunit } from "../configs/schema/settingSchema";
import { format } from "date-fns";
import { TworkLogs } from "@/configs/schema/workSchema";

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
export const capFirstLetter = (str: string) =>
    `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;

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
    bTime: string | null
) => {
    if (!sTime || !eTime) return 0;
    const start = new Date(`01/01/2021 ${sTime}`);
    const end = new Date(`01/01/2021 ${eTime}`);
    new Date(`01/01/2021 ${bTime}`);
    //const diff = end.getTime() - start.getTime() - breakTime.getTime();
    const diff = end.getTime() - start.getTime();
    return diff;
};

export const hmsTohm = (time: string) => {
    //const [hour, minute] = time.split(":");
    //return `${hour}:${minute}`;
    return time.slice(0, 5);
};
