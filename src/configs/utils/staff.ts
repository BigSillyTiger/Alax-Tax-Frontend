import { TmenuID, TstaffRole } from "../types";
import { menuList } from "./router";

export type TadminAccess = 0 | 1 | 2;

export const staffStandardHR = 25;

export const defaultStaffRole: TstaffRole = "employee";

/**
 * @description for generating menu access object for staff
 * @param access
 * @returns
 */
export const genMenuIDObject = (access: TadminAccess) => {
    return menuList.reduce(
        (acc, item) => {
            acc[item.id] = access;
            return acc;
        },
        {} as Record<TmenuID, number>
    );
};

export const roleOptions = {
    labor: {
        ...genMenuIDObject(0),
    },
    employee: {
        ...genMenuIDObject(0),
        dashboard: 2,
    },

    manager: {
        ...genMenuIDObject(2),
    },
};
