import React, { FC, Fragment } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Form, Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { menuList } from "@/configs/menuList";

export type t_permission = {
    dashboard: number;
    clients: number;
    orders: number;
    calendar: number;
    employees: number;
    management: number;
};

type t_sidemenu = {
    permissionData: t_permission;
    open: boolean;
    setOpen: (value: boolean) => void;
};

const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
};

// create new menu list based on user permission
const initMenuList = (permission: t_permission) => {
    const temp = Object.values(permission);
    return menuList.filter((item, index) => {
        return temp[index];
    });
};

const SideMenu: FC<t_sidemenu> = ({ permissionData, open, setOpen }) => {
    const newMenuList = initMenuList(permissionData);
    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 flex z-40 md:hidden"
                    onClose={setOpen}
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
                                        onClick={() => setOpen(false)}
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
                                    {newMenuList.map((item) => (
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
                            <Form
                                className="flex-shrink-0 flex bg-gray-700 p-4"
                                method="POST"
                                action="/dashboard"
                            >
                                <button
                                    //href="#"
                                    className="flex-shrink-0 group block"
                                    type="submit"
                                    name="intent"
                                    value="logout1"
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
                                </button>
                            </Form>
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
                            {newMenuList.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        item.current
                                            ? "bg-gray-900 text-white"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                    )}
                                    onFocus={() => {
                                        item.current = true;
                                    }}
                                    onBlur={() => {
                                        item.current = false;
                                    }}
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
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <Form
                        className="flex-shrink-0 flex bg-gray-700 p-4"
                        method="POST"
                        action="/dashboard"
                    >
                        <button
                            className="flex-shrink-0 w-full group block"
                            type="submit"
                            name="intent"
                            value="logout2"
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
                        </button>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default SideMenu;
