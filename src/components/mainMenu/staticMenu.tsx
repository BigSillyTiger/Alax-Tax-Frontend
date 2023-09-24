import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { t_menuList } from "./mainMenu";

interface props {
    menuList: t_menuList;
}

const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
};

const navFocus = ({ isActive }: { isActive: boolean }) => {
    return classNames(
        isActive
            ? "bg-gray-800 text-white"
            : "text-gray-400 hover:text-white hover:bg-gray-800",
        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
    );
};

const StaticMenu: FC<props> = ({ menuList }) => {
    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4">
            <div className="flex h-16 shrink-0 items-center justify-center">
                <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                />
            </div>
            <nav className="mt-8">
                <ul
                    role="list"
                    className="flex flex-col items-center space-y-1"
                >
                    {menuList.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className={navFocus}
                            >
                                <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                />
                                <span className="sr-only">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default StaticMenu;
