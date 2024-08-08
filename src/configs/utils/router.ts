import {
    CalendarIcon,
    HomeIcon,
    IdentificationIcon,
    UserGroupIcon,
    ClipboardDocumentIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export const routerPaths = {
    init: "/",
    login: "/login",
    dashboard: "/dashboard",
    clients: "/clients",
    client: "/clients/:cid",
    orders: "/orders",
    calendar: "/calendar",
    staff: "/staff",
    makePayslip: "/makePayslip/:uid",
    payslip: "/payslip/:uid",
    setting: "/setting",
};

export const menuList = [
    {
        id: "dashboard",
        name: "menu.dashboard",
        href: routerPaths.dashboard,
        icon: HomeIcon,
        current: true,
    },
    {
        id: "clients",
        name: "menu.clients",
        href: routerPaths.clients,
        icon: UserGroupIcon,
        current: false,
    },
    {
        id: "orders",
        name: "menu.orders",
        href: routerPaths.orders,
        icon: ClipboardDocumentIcon,
        current: false,
    },
    {
        id: "calendar",
        name: "menu.calendar",
        href: routerPaths.calendar,
        icon: CalendarIcon,
        current: false,
    },
    {
        id: "staff",
        name: "menu.staff",
        href: routerPaths.staff,
        icon: IdentificationIcon,
        current: false,
    },
    {
        id: "setting",
        name: "menu.setting",
        href: routerPaths.setting,
        icon: WrenchScrewdriverIcon,
        current: false,
    },
] as const;

/**
 * @description  req types for time tracker modal actions
 */
export const actionReqList = {
    startTimer: "startTimer",
    stopTimer: "stopTimer",
    pauseTimer: "pauseTimer",
    resumeTimer: "resumeTimer",
    resetTimer: "resetTimer",
} as const;
