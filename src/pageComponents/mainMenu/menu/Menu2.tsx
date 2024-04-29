import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { TmenuList } from "../mainMenu";
import HoverTips from "@/components/HoverTips";
import { btmPsedo, topPsedo } from "@/configs/utils/color";

type Tprops = {
    menuList: TmenuList;
};

const Menu2: FC<Tprops> = ({ menuList }) => {
    const navFocus = ({
        isActive,
        index,
    }: {
        isActive: boolean;
        index: number;
    }) => {
        return `
            group flex justify-center gap-x-3 rounded-md 
            p-2 text-sm leading-6 font-semibold text-center ml-2
            ${
                isActive
                    ? `text-indigo-500 rounded-l-full bg-slate-100 w-full animate-menu-slide
                before:coutent-[''] before:absolute before:bg-transparent before:rounded-br-xl
                before:shadow-[15px_0_0_rgba(241,245,249,1)] before:w-full before:h-4 ${topPsedo[index]} before:right-0 before:z-50
                after:coutent-[''] after:absolute after:bg-transparent after:rounded-tr-xl
                after:shadow-[15px_0_0_rgba(241,245,249,1)] after:w-full after:h-4 ${btmPsedo[index]} after:right-0 after:z-50
                    `
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`;
    };

    return (
        <div
            className={`hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-[5vw] lg:overflow-y-auto overflow-x-hidden lg:bg-gray-800 lg:pb-4 `}
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
                    {menuList.map((item, index) => (
                        <li key={item.name} className="list-none">
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className={({ isActive }) =>
                                    navFocus({ isActive, index })
                                }
                            >
                                <HoverTips
                                    tipsContent={
                                        <span className="text-indigo-600">
                                            {item.name}
                                        </span>
                                    }
                                    side="right"
                                    delay={0}
                                    sideOffset={33}
                                >
                                    <item.icon
                                        className="size-8 shrink-0"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">{item.name}</span>
                                </HoverTips>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Menu2;
