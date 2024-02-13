import { newDateFormat } from "@/utils/utils";

/**
 * dateMin and dateMax are for the date picker
 * to restrict the date range
 */
export const dateMin = "2020-01-01";
export const dateMax = newDateFormat(new Date());

export const roleOptions = {
    employee: {
        dashboard: 2,
        clients: 0,
        orders: 0,
        calendar: 0,
        staff: 0,
        setting: 0,
    },

    manager: {
        dashboard: 2,
        clients: 2,
        orders: 2,
        calendar: 2,
        staff: 2,
        setting: 2,
    },
};
