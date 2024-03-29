import type { FC } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { TmenuList } from "./mainMenu";

type Tprops = {
    menuList: TmenuList;
};

const StaticMenu: FC<Tprops> = ({ menuList }) => {
    const [isHovered, setIsHovered] = useState(false);

    const navFocus = ({ isActive }: { isActive: boolean }) => {
        return `
            group flex ${!isHovered && "justify-center"} gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-center 
            ${
                isActive
                    ? `text-indigo-500 rounded-l-full bg-slate-50 w-full animate-menu-slide`
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`;
    };

    return (
        <div
            className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-[5vw] lg:overflow-y-auto lg:bg-gray-900 lg:pb-4 hover:w-[12vw] hover:transistion-width duration-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex h-16 shrink-0 items-center justify-center">
                <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Company icon"
                />
            </div>
            <nav className="mt-8">
                <ul role="list" className="flex flex-col space-y-1">
                    {menuList.map((item) => (
                        <li key={item.name} className="list-none">
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className={navFocus}
                            >
                                <item.icon
                                    className="size-8 shrink-0"
                                    aria-hidden="true"
                                />
                                <span
                                    className={`${isHovered ? "flex items-center text-lg text-center" : "sr-only"}`}
                                >
                                    {item.name}
                                </span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default StaticMenu;
