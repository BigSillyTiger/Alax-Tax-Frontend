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
    setting: "/setting",
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

export const roleOptions = {
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
    start: "bg-indigo-600 border-indigo-600 text-slate-200 hover:bg-slate-100 hover:text-indigo-600",
    end: "bg-indigo-600 border-indigo-600 text-slate-200 hover:bg-slate-100 hover:text-indigo-600",
    break: "bg-amber-600 border-amber-600 text-slate-200 hover:bg-slate-100 hover:text-amber-600",
    total: "bg-lime-600 border-lime-600 text-slate-200 hover:bg-slate-100 hover:text-lime-600",
    default:
        "bg-gray-500 border-gray-500 text-slate-200 hover:bg-slate-100 hover:text-gray-600",
};
