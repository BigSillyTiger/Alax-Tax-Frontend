import React, { Fragment } from "react";
import type { FC, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import genOptions from "./genOptions";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { TclientOrderModal, TmenuOptions } from "@/utils/types";

type Tprops<T> = TmenuOptions & {
    mItem: T;
    setModalOpen: (open: TclientOrderModal) => void;
    setData: (data: T) => void;
};

// this component is about building a menu button template with headlessui Menu
const MenuBtn = <T,>({
    mItem,
    edit = false,
    del = false,
    pay = false,
    invoice = false,
    quotation = false,
    setModalOpen,
    setData,
}: Tprops<T>) => {
    const mList = genOptions({
        edit,
        del,
        pay,
        invoice,
        quotation,
        setModalOpen,
        setData,
    });

    const menuContent = mList.map((item, index) => {
        return (
            <div className="p-1" key={index}>
                <Menu.Item as={Fragment}>
                    {({ active }) => (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                item.clickFn(mItem);
                            }}
                            className={`group flex w-full items-center rounded-md px-2 py-2 text-sm ${
                                active
                                    ? "bg-indigo-400 text-slate-50"
                                    : "text-gray-900"
                            }`}
                        >
                            <div
                                className={`
                                    mr-2 h-5 w-5 
                                    ${active && " text-slate-50 "}
                                    ${!active && " text-gray-400 "}
                                `}
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
            <Menu.Button>
                <EllipsisVerticalIcon
                    className="h-6 w-6 text-indigo-500"
                    aria-hidden="true"
                />
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
                <Menu.Items className="absolute right-0 z-10 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    {menuContent}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default MenuBtn;
