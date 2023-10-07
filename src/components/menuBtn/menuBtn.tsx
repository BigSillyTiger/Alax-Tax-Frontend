import React, { Fragment } from "react";
import type { FC, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { TclientView } from "@/configs/schema/client";

type Tprops = {
    mLabel: ReactNode | string;
    mList: {
        label: string;
        clickFn: (e: TclientView) => void;
        icon: ReactNode;
    }[];
    mClient: TclientView;
};
// this component is about building a menu button template with headlessui Menu
const MenuBtn: FC<Tprops> = ({ mLabel, mList, mClient }) => {
    const menuContent = mList.map((item, index) => {
        return (
            <div className="p-1" key={index}>
                <Menu.Item as={Fragment}>
                    {({ active }) => (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                item.clickFn(mClient);
                            }}
                            className={`group flex w-full items-center rounded-md px-2 py-2 text-sm ${
                                active
                                    ? "bg-indigo-400 text-white"
                                    : "text-gray-900"
                            }`}
                        >
                            <div
                                className={clsx(
                                    "mr-2 h-5 w-5",
                                    active && "text-slate-50",
                                    !active && "text-gray-400"
                                )}
                            >
                                {item.icon}
                            </div>
                            {item.label}
                        </button>
                    )}
                </Menu.Item>
            </div>
        );
    });

    return (
        <Menu as="div" className="relative">
            <Menu.Button>{mLabel}</Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    {menuContent}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default MenuBtn;
