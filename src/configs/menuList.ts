import {
    CalendarIcon,
    HomeIcon,
    IdentificationIcon,
    UserGroupIcon,
    ClipboardDocumentIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import i18n from "@/utils/i18n";
import type { ForwardRefExoticComponent, SVGProps, RefAttributes } from "react";
import { routerPaths } from "./utils";

type Ticon = ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
>;

type TmenuList = {
    id: "dashboard" | "clients" | "orders" | "calendar" | "staff" | "setting";
    name: string;
    href: string;
    icon: Ticon;
    current: boolean;
};

export const menuList: TmenuList[] = [
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
];

export const mTabList = [
    { name: "Main Content" },
    { name: "Service List" },
    /* { name: "Unit List" }, */
];
