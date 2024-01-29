import {
    CalendarIcon,
    HomeIcon,
    IdentificationIcon,
    UserGroupIcon,
    ClipboardDocumentIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export const menuList = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: HomeIcon,
        current: true,
    },
    {
        name: "Clients",
        href: "/clients",
        icon: UserGroupIcon,
        current: false,
    },
    {
        name: "Orders",
        href: "/orders",
        icon: ClipboardDocumentIcon,
        current: false,
    },
    {
        name: "Calendar",
        href: "/calendar",
        icon: CalendarIcon,
        current: false,
    },
    {
        name: "Staff",
        href: "/staff",
        icon: IdentificationIcon,
        current: false,
    },
    {
        name: "Management",
        href: "/management",
        icon: WrenchScrewdriverIcon,
        current: false,
    },
];

export const mTabList = [
    { name: "Main Content" },
    { name: "Service List" },
    /* { name: "Unit List" }, */
];
