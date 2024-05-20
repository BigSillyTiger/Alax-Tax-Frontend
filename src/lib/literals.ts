import { TwlUnion } from "@/configs/schema/workSchema";
import { routerPaths } from "@/configs/utils/router";
import { Tservice, Tunit } from "../configs/schema/settingSchema";
import { toastWarning } from "./toaster";

export type AreTypesEqual<T, U> = T extends U ? true : false;

export const isServiceType = (obj: Tservice | Tunit): obj is Tservice => {
    return (obj as Tservice).service !== undefined;
};

/**
 * @param str
 * @returns generate new string with 1st letter capitalized and rest lowercased
 */
export const capFirstLetter = (str: string) => {
    if (!str) return "";
    return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
};

/**
 * @description sort work logs by date
 */
export const sortWorkLogs = (sort: "dsc" | "asc", workLogs: TwlUnion[]) => {
    return workLogs.sort((a, b) => {
        const dateA = new Date(a.wl_date).getTime();
        const dateB = new Date(b.wl_date).getTime();
        if (sort === "asc") {
            return dateA - dateB;
        }
        return dateB - dateA;
    });
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

export const formNumberDigits = (number: string) => {
    let formatted = number.replace(/\D/g, ""); // Remove all non-digit characters

    if (number.startsWith("+")) {
        formatted = "+" + formatted;
    }

    if (formatted.startsWith("+")) {
        // Handle the international format with the '+' sign
        const match = formatted.match(
            /^\+(\d{1,2})(\d{1,3})(\d{1,3})(\d{1,3})?$/
        );
        if (match) {
            formatted = `+${match[1]}-${match[2]}`;
            if (match[3]) {
                formatted += `-${match[3]}`;
            }
            if (match[4]) {
                formatted += `-${match[4]}`;
            }
        }
    } else {
        // Handle the local format
        formatted = formatted.replace(/(\d{3})(?=\d)/g, "$1-");
    }

    return formatted;
};

export const formNumberWLimit = (
    type: "number" | "phone" = "number",
    value: string,
    limit: number
) => {
    // Remove all non-numeric characters

    let numericInput =
        type === "number"
            ? value.replace(/\D/g, "")
            : value.replace(/[^\d+]/g, "");

    // truncate from the beginning: numericInput = numericInput.slice(-limit);
    if (numericInput.length > limit) {
        toastWarning(`Input is too long, max ${limit} characters`);
        numericInput = numericInput.slice(0, limit);
    }

    return numericInput;
};
