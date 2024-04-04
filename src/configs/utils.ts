import { dateFormatISO } from "@/utils/utils";
import {
    CalendarIcon,
    HomeIcon,
    IdentificationIcon,
    UserGroupIcon,
    ClipboardDocumentIcon,
    ClipboardDocumentListIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import i18n from "@/utils/i18n";
import type { ForwardRefExoticComponent, SVGProps, RefAttributes } from "react";
import { TstaffRole } from "@/utils/types";

export type TadminAccess = 0 | 1 | 2;

export type Ticon = ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
>;
/**
 * dateMin and dateMax are for the date picker
 * to restrict the date range
 */
export const dateMin = "2020-01-01";
export const dateMax = dateFormatISO(new Date());

export const mOpenOps = {
    default: "",
    add: "Add",
    del: "Del",
    edit: "Edit",
    pay: "Pay",
    invoice: "Invoice",
    quotation: "Quotation",
    jobAssign: "JobAssign",
};

export const routerPaths = {
    init: "/",
    login: "/login",
    dashboard: "/dashboard",
    clients: "/clients",
    client: "/clients/:cid",
    orders: "/orders",
    workLogs: "/worklogs",
    calendar: "/calendar",
    staff: "/staff",
    makePayslip: "/makePayslip/:uid",
    payslip: "/payslip/:uid",
    setting: "/setting",
};

export const defaultMenuOptions = {
    edit: false,
    del: false,
    pay: false,
    invoice: false,
    quotation: false,
    assign: false,
    payslip: false,
};

export const menuList = [
    {
        id: "dashboard",
        name: i18n.t("menu.dashboard"),
        href: routerPaths.dashboard,
        icon: HomeIcon,
        current: true,
    },
    {
        id: "clients",
        name: i18n.t("menu.clients"),
        href: routerPaths.clients,
        icon: UserGroupIcon,
        current: false,
    },
    {
        id: "orders",
        name: i18n.t("menu.orders"),
        href: routerPaths.orders,
        icon: ClipboardDocumentIcon,
        current: false,
    },
    {
        id: "worklogs",
        name: i18n.t("menu.worklogs"),
        href: routerPaths.workLogs,
        icon: ClipboardDocumentListIcon,
        current: false,
    },
    {
        id: "calendar",
        name: i18n.t("menu.calendar"),
        href: routerPaths.calendar,
        icon: CalendarIcon,
        current: false,
    },
    {
        id: "staff",
        name: i18n.t("menu.staff"),
        href: routerPaths.staff,
        icon: IdentificationIcon,
        current: false,
    },
    {
        id: "setting",
        name: i18n.t("menu.setting"),
        href: routerPaths.setting,
        icon: WrenchScrewdriverIcon,
        current: false,
    },
] as const;

export type TmenuID = (typeof menuList)[number]["id"];

export const genMenuIDObject = (access: TadminAccess) => {
    return menuList.reduce(
        (acc, item) => {
            acc[item.id] = access;
            return acc;
        },
        {} as Record<TmenuID, number>
    );
};

export const mTabList = [
    { name: "Main Content" },
    { name: "Service List" },
    /* { name: "Unit List" }, */
];

export const actionReqList = {
    startTimer: "startTimer",
    stopTimer: "stopTimer",
    pauseTimer: "pauseTimer",
    resumeTimer: "resumeTimer",
    resetTimer: "resetTimer",
} as const;

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

/**
 * @description for time btns style
 */
export const timeBtnStyleMap = {
    start: "bg-lime-600 border-lime-600 text-slate-200 hover:bg-slate-100 hover:text-lime-600",
    end: "bg-lime-600 border-lime-600 text-slate-200 hover:bg-slate-100 hover:text-lime-600",
    break: "bg-amber-600 border-amber-600 text-slate-200 hover:bg-slate-100 hover:text-amber-600",
    total: "bg-indigo-600 border-indigo-600 text-slate-200 hover:bg-slate-100 hover:text-indigo-600",
    default:
        "bg-slate-100 border-red-600 text-red-600 hover:bg-red-400 hover:text-slate-100",
};

export const defaultStaffRole: TstaffRole = "employee";

export const staffColorMap = {
    labor: "text-amber-700",
    employee: "text-lime-700",
    manager: "text-indigo-700",
};

export const colorWithStaffUid = (uid: string) => {
    const color = uid.charAt(0);
    if (color === "L") {
        return "text-amber-700";
    } else if (color === "E") {
        return "text-lime-700";
    } else {
        return "text-indigo-700";
    }
};

export const wlStatusColorMap = {
    pending: "text-slate-100 bg-amber-500 border-amber-600",
    ongoing: "text-slate-100 bg-lime-500 border-lime-600",
    canceled: "text-slate-100 bg-red-500 border-red-600",
    unconfirmed: "text-slate-100 bg-amber-500 border-amber-600",
    confirmed: "text-slate-100 bg-indigo-500 border-indigo-600",
    resting: "text-slate-100 bg-pink-500 border-pink-600",
    paid: "text-slate-100 bg-teal-500 border-teal-600",
};

export const genHHMM = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
};
