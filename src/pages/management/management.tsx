import React, { Suspense, useEffect } from "react";
import type { FC } from "react";
import { Tab } from "@headlessui/react";
import { mTabList } from "@/configs/menuList";
import Uni from "./uni";
import LoadingPage from "@/components/loadingEle";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import { RES_STATUS, Tresponse, Tunivers } from "@/utils/types";
import Company from "./company";
import { Tcompany } from "@/configs/schema/manageSchema";
import { toastSuccess } from "@/utils/toaster";
import { useTranslation } from "react-i18next";

const Management: FC = () => {
    const { univers, company, logo } = useLoaderData() as {
        univers: Tunivers | null;
        company: Tcompany | null;
        logo: string;
    };
    const { t } = useTranslation();

    const actionData = useActionData() as Tresponse;
    useEffect(() => {
        if (actionData?.status === RES_STATUS.SUC_UPDATE_COMPANY) {
            toastSuccess(t("toastS.updateCompany"));
        }
    }, [actionData]);

    const UniversContent: FC<{ univers: Tunivers }> = ({ univers }) => {
        return (
            <div className="container mx-auto">
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
                    <Tab.Panels className="mt-2">
                        <Tab.Panel className="rounded-xl bg-white p-3ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400">
                            <Company company={company} logo={logo} />
                        </Tab.Panel>
                        <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400">
                            <Uni
                                services={univers.services}
                                units={univers.units}
                            />
                        </Tab.Panel>
                        <Tab.Panel className="rounded-xl bg-white p-3ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400">
                            Content 3
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
