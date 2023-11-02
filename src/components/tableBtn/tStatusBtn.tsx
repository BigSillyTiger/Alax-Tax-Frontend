import React, { Fragment } from "react";
import type { FC, ReactNode } from "react";
import { useSubmit } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { statusList } from "@/configs/statusList";

const slist = [
    {
        label: statusList.pending,
        activeCss: "bg-yellow-200 text-yellow-700",
        inactiveCss: "bg-slate-50 text-yellow-700",
    },
    {
        label: statusList.processing,
        activeCss: "bg-cyan-200 text-cyan-700",
        inactiveCss: "bg-slate-50 text-cyan-700",
    },
    {
        label: statusList.closed,
        activeCss: "bg-red-200 text-red-700",
        inactiveCss: "bg-slate-50 text-red-700",
    },
    {
        label: statusList.completed,
        activeCss: "bg-green-200 text-green-700",
        inactiveCss: "bg-slate-50 text-green-700",
    },
];

type Tprops = {
    mLabel: ReactNode | string;
    orId: number;
    action: string;
    current: string;
};

// this menu btn group component is highly designed for order status change usage
const StatusBtn: FC<Tprops> = ({ mLabel, orId, action, current }) => {
    const submit = useSubmit();

    const handleClick = async (order_id: number, status: string) => {
        submit(
            { req: "orderStatus", order_id, status },
            { method: "PUT", action }
        );
    };

    const menuContent = slist.map((item, index) => {
        if (item.label === current) return;
        return (
            <div className="p-1" key={index}>
                <Menu.Item as={Fragment}>
                    {({ active }) => (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(orId, item.label);
                            }}
                            className={`group flex w-full items-center rounded-md px-2 py-2 text-sm text-bold ${
                                active ? item.activeCss : item.inactiveCss
                            }`}
                        >
                            {item.label}
                        </button>
                    )}
                </Menu.Item>
            </div>
        );
    });

    return (
        <Menu as="div" className="relative">
            {/* <Menu as="div" className="relative"> */}
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

export default StatusBtn;
