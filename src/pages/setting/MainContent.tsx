import type { FC } from "react";
import { Tab } from "@headlessui/react";
import { mTabList } from "@/configs/utils/setting";
import Uni from "./uni";
import Company from "./company";
import { Tunivers } from "@/configs/types";
import { useAsyncValue } from "react-router-dom";
import { Tcompany } from "@/configs/schema/settingSchema";

const MainContent: FC = () => {
    const [univers, company, logo] = useAsyncValue() as [
        Tunivers,
        Tcompany,
        string,
    ];

    return (
        <div className="container">
            <Tab.Group defaultIndex={0}>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {mTabList.map((item, index) => {
                        return (
                            <Tab
                                key={index}
                                className={({ selected }) => {
                                    return `
                                        w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                                        ${
                                            selected
                                                ? " bg-white shadow "
                                                : " text-blue-100 hover:bg-white/[0.12] hover:text-white "
                                        }
                                    `;
                                }}
                            >
                                {item.name}
                            </Tab>
                        );
                    })}
                </Tab.List>
                <Tab.Panels className="mt-2 ">
                    <Tab.Panel className="rounded-xl bg-slate-100 p-3ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400">
                        <Company company={company} logo={logo} />
                    </Tab.Panel>
                    <Tab.Panel className="rounded-xl bg-slate-100 p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400">
                        <Uni
                            services={univers.services}
                            units={univers.units}
                        />
                    </Tab.Panel>
                    {/* <Tab.Panel className="rounded-xl bg-white p-3ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400">
                        Content 3
                    </Tab.Panel> */}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default MainContent;
