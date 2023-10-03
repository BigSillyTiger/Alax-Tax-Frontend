import React, { FC, Fragment, MouseEvent, TouchEvent } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { API_ADMIN } from "@/apis";

type Tprops = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#" },
];

const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
};

const HeadBar: FC<Tprops> = ({ open, setOpen }) => {
    const nevigate = useNavigate();

    const handleLogout = async (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        console.log("---> click log out");
        await API_ADMIN.adminLogout();
        return nevigate("/login", { replace: true }); // redirect does not work here
    };

    return (
        <header className="lg:pl-[5vw]">
            <div className="sticky top-0 z-40 flex h-[7vh] shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                    onClick={() => setOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div
                    className="h-6 w-px bg-gray-900/10 lg:hidden"
                    aria-hidden="true"
                />

                <div className="flex flex-1 flex-row-reverse gap-x-4 self-stretch lg:gap-x-6">
                    <div className="flex items-center gap-x-4 lg:gap-x-6">
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Separator */}
                        <div
                            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                            aria-hidden="true"
                        />

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative">
                            <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full bg-gray-50"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <span className="hidden lg:flex lg:items-center">
                                    <span
                                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                                        aria-hidden="true"
                                    >
                                        Alex
                                    </span>
                                    <ChevronDownIcon
                                        className="ml-2 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                    {userNavigation.map((item) => (
                                        <Menu.Item key={item.name}>
                                            {({ active }) => (
                                                <button
                                                    onClick={handleLogout}
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-50"
                                                            : "",
                                                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                    )}
                                                >
                                                    {item.name}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeadBar;