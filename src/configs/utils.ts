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

export const pageAdminList: {
    page: "dashboard" | "clients" | "orders" | "calendar" | "staff" | "setting";
    admin: 0 | 1 | 2;
}[] = [
    { page: "dashboard", admin: 2 },
    { page: "clients", admin: 0 },
    { page: "orders", admin: 0 },
    { page: "calendar", admin: 0 },
    { page: "staff", admin: 0 },
    { page: "setting", admin: 0 },
];
