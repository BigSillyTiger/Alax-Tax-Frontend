import { Tservice, Tunit } from "../configs/schema/manageSchema";
import { format } from "date-fns";

export const isServiceType = (obj: Tservice | Tunit): obj is Tservice => {
    return (obj as Tservice).service !== undefined;
};

/**
 *
 * @param dateString
 * @returns return dd-MM-yyyy is used for displaying directly
 */
export const dateFormat = (dateString: string) => {
    return format(Date.parse(dateString), "dd-MM-yyyy");
};

/**
 *
 * @param date
 * @returns yyy-MM-dd is used for datepicker
 */
export const newDateFormat = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear().toString();

    return `${year}-${month}-${day}`;
};

export type AreTypesEqual<T, U> = T extends U ? true : false;
