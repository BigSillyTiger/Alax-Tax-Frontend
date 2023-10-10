import React, { Suspense, useState } from "react";
import type { FC } from "react";
import Card from "@/components/card";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { mTabList } from "@/configs/menuList";
import Uni from "./uni";
import LoadingPage from "@/components/loadingEle";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import { Tservice, Tunit } from "@/utils/schema/manage";
import { Tunivers } from "@/utils/types";
import { set } from "zod";
import { RES_STATUS } from "@/utils/types";

const initU = { id: 0, unit_name: "" };

const Management: FC = () => {
    /* const [infoConflict, setInfoConflict] = useState<
        RES_STATUS.SUCCESS | RES_STATUS.FAILED_DUP
    >(RES_STATUS.SUCCESS); */
    const { univers } = useLoaderData() as { univers: Tunivers | null };

    const UniversContent: FC<{ univers: Tunivers }> = ({ univers }) => {
        return (
            <div className="container mx-auto">
                <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        {mTabList.map((item, index) => {
                            return (
                                <Tab
                                    key={index}
                                    className={({ selected }) =>
                                        clsx(
                                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                                            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                            selected
                                                ? "bg-white shadow"
                                                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                                        )
                                    }
                                >
                                    {item.name}
                                </Tab>
                            );
                        })}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        <Tab.Panel
                            className={clsx(
                                "rounded-xl bg-white p-3",
                                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400" /* focus:outline-none focus:ring-2 */
                            )}
                        >
                            Content 1
                        </Tab.Panel>
                        <Tab.Panel
                            className={clsx(
                                "rounded-xl bg-white p-3",
                                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400" /* focus:outline-none focus:ring-2 */
                            )}
                        >
                            <Uni
                                services={univers.services}
                                units={univers.units}
                            />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        );
    };

    return (
        <div className="container mx-auto border-0">
            <Suspense fallback={<LoadingPage />}>
                <Await resolve={univers}>
                    {(univers) => {
                        return <UniversContent univers={univers.data} />;
                    }}
                </Await>
            </Suspense>
        </div>
    );
};

export default Management;
