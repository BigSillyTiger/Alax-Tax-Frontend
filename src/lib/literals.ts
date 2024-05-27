import { TwlUnion } from "@/configs/schema/workSchema";
import { routerPaths } from "@/configs/utils/router";
import { Tservice, Tunit } from "../configs/schema/settingSchema";
import { toastWarning } from "./toaster";
import i18n from "@/configs/i18n";

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

/**
 * @description form the number displaying style
 *              - if number is start with +, then result would be +xx-xxx-xxx-xxx
 *              - if number is start with 0, then result would be 0xxx-xxx-xxx
 *              - otherwise, result would be xxx-xxx-xxx
 * @param number
 * @returns
 */
export const formNumberDigits = (number: string) => {
    const formatted: string = number.replace(/\D/g, "");
    let formattedNumber;

    if (number.length <= 2) {
        return number;
    }

    if (number.startsWith("0")) {
        const head = formatted.slice(0, 4);
        const body = formatted.slice(4);
        formattedNumber = head + "-" + body.match(/.{1,3}/g)!.join("-");
    } else if (number.startsWith("+")) {
        const head = formatted.slice(0, 2);
        const body = formatted.slice(2);
        formattedNumber = "+" + head + "-" + body.match(/.{0,3}/g)!.join("-");
    } else {
        formattedNumber = formatted.match(/.{1,3}/g)!.join("-");
    }

    return formattedNumber.replace(/-$/, "");
};

/**
 * @description form the input content of input tag with limitation
 *              - if type is phone, only + and numbers are allowed
 *              - if type is number, only numbers are allowed
 * @param type
 * @param value
 * @param limit
 * @returns
 */
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
        toastWarning(i18n.t("toastW.inputReachMax"));
        numericInput = numericInput.slice(0, limit);
    }

    return numericInput;
};
