import { TwlUnion } from "@/configs/schema/workSchema";
import { routerPaths } from "@/configs/utils/router";
import { Tservice, Tunit } from "../configs/schema/settingSchema";

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
