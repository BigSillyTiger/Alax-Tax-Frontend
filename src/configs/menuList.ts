import {
    CalendarIcon,
    HomeIcon,
    IdentificationIcon,
    UserGroupIcon,
    ClipboardDocumentIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export const menuList = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
    {
        name: "Clients",
        href: "/dashboard/clients",
        icon: UserGroupIcon,
        current: false,
    },
    {
        name: "Orders",
        href: "/dashboard/orders",
        icon: ClipboardDocumentIcon,
        current: false,
    },
    {
        name: "Calendar",
        href: "/dashboard/calendar",
        icon: CalendarIcon,
        current: false,
    },
    {
        name: "Employees",
        href: "/dashboard/employees",
        icon: IdentificationIcon,
        current: false,
    },
    {
        name: "Management",
        href: "/dashboard/management",
        icon: WrenchScrewdriverIcon,
        current: false,
    },
];
