import React, {
    FC,
    MouseEvent,
    ReactNode,
    TouchEvent,
    useState,
    useEffect,
    Fragment,
} from "react";
import { connect } from "react-redux";
import { json, Outlet, useActionData, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    Bars3Icon,
    UsersIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

import { selectAdmin } from "@/redux/features/admin";
import { adminLogout } from "@/apis/admin";
import { API_ADMIN } from "@/apis";

const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
};
const navigation = [
    { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
    { name: "Team", href: "#", icon: UsersIcon, current: false },
    { name: "Projects", href: "#", icon: FolderIcon, current: false },
    { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
    { name: "Documents", href: "#", icon: InboxIcon, current: false },
    { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
];

interface layoutProp {
    loginStatus: boolean;
}

const Layout: FC<layoutProp> = ({ loginStatus }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    useEffect(() => {
        console.log("-> dashboard login status:", loginStatus);
        // if the stored loginStatus is falses-default
        // we excue adminCheck for checking jwt cookies's valid condition
        if (!loginStatus) {
            API_ADMIN.adminCheck()
                .then((res) => {
                    if (!res) {
                        navigate("/");
                    }
                })
                .catch((err) => {});
            //
        }
        /* const routineCheck = async () => {
            try {
                const response = await API_ADMIN.adminCheck();
                if (!response) {
                    throw json({ msg: "auth check failed" }, { status: 401 });
                }
            } catch (err) {
                throw err;
            }
        };
        routineCheck(); */
    });
    const handleLogout = () => {
        console.log("--> clicked tim cook");
        API_ADMIN.adminLogout().then(() => {
            navigate("/");
        });
    };
    return (
        <div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 flex z-40 md:hidden"
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">
                                            Close sidebar
                                        </span>
                                        <XMarkIcon
                                            className="h-6 w-6 text-white"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                <div className="flex-shrink-0 flex items-center px-4">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                        alt="Workflow"
                                    />
                                </div>
                                <nav className="mt-5 px-2 space-y-1">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? "bg-gray-900 text-white"
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                            )}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    item.current
                                                        ? "text-gray-300"
                                                        : "text-gray-400 group-hover:text-gray-300",
                                                    "mr-4 flex-shrink-0 h-6 w-6"
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                            <div className="flex-shrink-0 flex bg-gray-700 p-4">
                                <a
                                    href="#"
                                    className="flex-shrink-0 group block"
                                >
                                    <div className="flex items-center">
                                        <div>
                                            <img
                                                className="inline-block h-10 w-10 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-base font-medium text-white">
                                                Tom Cook
                                            </p>
                                            <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                                                View profile
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14">
                        {/* Force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                alt="Workflow"
                            />
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                            ? "bg-gray-900 text-white"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                    )}
                                >
                                    <item.icon
                                        className={classNames(
                                            item.current
                                                ? "text-gray-300"
                                                : "text-gray-400 group-hover:text-gray-300",
                                            "mr-3 flex-shrink-0 h-6 w-6"
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex bg-gray-700 p-4">
                        <a
                            href="#"
                            className="flex-shrink-0 w-full group block"
                            onClick={handleLogout}
                        >
                            <div className="flex items-center">
                                <div>
                                    <img
                                        className="inline-block h-9 w-9 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-white">
                                        Tom Cook
                                    </p>
                                    <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                                        View profile
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="md:pl-64 flex flex-col flex-1">
                <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <main className="flex-1">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Dashboard
                            </h1>
                        </div>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {/* Replace with your content */}
                            {/* <div className="py-4">
                                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                                </div> */}
                            <Outlet />
                            {/* /End replace */}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    const loginStatus = selectAdmin(state);
    return { loginStatus };
};

export default connect(mapStateToProps, null)(Layout);
