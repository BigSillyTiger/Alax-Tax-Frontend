import React from "react";
import type { FC } from "react";
import { Tab } from "@headlessui/react";

type Tprops = {
    items: { title: string; content: JSX.Element }[];
};

const Tabs: FC<Tprops> = ({ items }) => {
    return (
        <div className="w-full px-2 py-2 sm:px-0 ">
            <Tab.Group as={"div"} className="">
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 flex-col">
                    {items.map((item) => {
                        return (
                            <Tab
                                className={({ selected }) => {
                                    return `
                                w-full rounded-lg py-1 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                                ${
                                    selected
                                        ? " bg-white shadow "
                                        : " text-blue-100 hover:bg-white/[0.12] hover:text-white "
                                }
                            `;
                                }}
                            >
                                {item.title}
                            </Tab>
                        );
                    })}
                </Tab.List>
                <Tab.Panels className="">
                    {items.map((item) => {
                        return (
                            <Tab.Panel className="rounded-xl bg-white p-3ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400">
                                {item.content}
                            </Tab.Panel>
                        );
                    })}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default Tabs;
