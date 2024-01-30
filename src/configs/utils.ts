import Dashboard from "@/pages/dashboard";
import { newDateFormat } from "@/utils/utils";

/**
 * dateMin and dateMax are for the date picker
 * to restrict the date range
 */
export const dateMin = "2020-01-01";
export const dateMax = newDateFormat(new Date());

export const roleOptions = [
    {
        role: "employee",
        pageAccess: {
            Dashboard: 2,
            clients: 1,
            orders: 0,
            calendar: 0,
            staff: 0,
            setting: 0,
        },
    },
    {
        role: "manager",
        pageAccess: {
            Dashboard: 2,
            clients: 2,
            orders: 2,
            calendar: 2,
            staff: 2,
            setting: 2,
        },
    },
];

export const pageAdminList: { page: string; admin: 0 | 1 | 2 }[] = [
    { page: "Dashboard", admin: 2 },
    { page: "Clients", admin: 0 },
    { page: "Orders", admin: 0 },
    { page: "Calendar", admin: 0 },
    { page: "Staff", admin: 0 },
    { page: "Setting", admin: 0 },
];
