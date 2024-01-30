import type { FC } from "react";
import { useAtom } from "jotai";
import Card from "@/components/card";
import { Tservice, Tunit } from "@/configs/schema/settingSchema.ts";
import {
    serviceListColDefs,
    unitListColDefs,
} from "../../configs/columnDefs/defUniList.tsx";
import { Tunivers } from "@/utils/types";
import MUniDel from "./modals/mUniDel";
import { PTable } from "@/components/table";
import { useTranslation } from "react-i18next";
import MUniForm from "./modals/mUniForm";
import { atUniData, initS, initU } from "./states.ts";
import { atModalOpen } from "../uniStates.ts";

type Tprops = Tunivers;

const Uni: FC<Tprops> = ({ services, units }) => {
    const [, setUniData] = useAtom(atUniData);
    const [, setModalOpen] = useAtom(atModalOpen);
    const { t } = useTranslation();

    const ServiceTable: FC<{ services: Tservice[] | null }> = ({
        services,
    }) => {
        return (
            <Card className="m-1">
                {/* header area */}
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto sm:flex">
                        {t("label.serviceList")}
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={(e) => {
                                e.preventDefault();
                                setUniData(initS);
                                setModalOpen("Add");
                            }}
                        >
                            {t("btn.newService")}
                        </button>
                    </div>
                </div>
                {/* table */}
                <Card className="">
                    {services?.length ? (
                        <PTable
                            search={true}
                            data={services}
                            columns={serviceListColDefs}
                            setModalOpen={setModalOpen}
                            setData={setUniData}
                            menuOptions={{ edit: true, del: true }}
                            cnSearch="my-3"
                            cnTable="h-[55vh]"
                            cnHead="sticky z-10 bg-indigo-300"
                            cnTh="py-3"
                        />
                    ) : (
                        <span className="m-5 p-5  text-center h-15">
                            {t("tips.npPreService")}
                        </span>
                    )}
                </Card>
            </Card>
        );
    };

    const UnitTable: FC<{ units: Tunit[] | null }> = ({ units }) => {
        return (
            <Card className="m-1">
                {/* header area */}
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto sm:flex">
                        {t("label.unitList")}
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={(e) => {
                                e.preventDefault();
                                setUniData(initU);
                                setModalOpen("Add");
                            }}
                        >
                            {t("btn.newUnit")}
                        </button>
                    </div>
                </div>

                {/* table */}
                <Card className="">
                    {units?.length ? (
                        <PTable
                            search={true}
                            data={units}
                            columns={unitListColDefs}
                            setModalOpen={setModalOpen}
                            setData={setUniData}
                            menuOptions={{ edit: true, del: true }}
                            cnSearch="my-3"
                            cnTable="h-[55vh]"
                            cnHead="sticky z-10 bg-indigo-300"
                            cnTh="py-3"
                        />
                    ) : (
                        <span className="m-5 p-5  text-center h-15">
                            {t("tips.npPreUnit")}
                        </span>
                    )}
                </Card>
            </Card>
        );
    };
    return (
        <>
            <div className="grid grid-cols-6 gap-y-4 gap-x-4">
                <div className="col-span-6 sm:col-span-4">
                    <ServiceTable services={services} />
                </div>
                <div className="col-span-6 sm:col-span-2">
                    <UnitTable units={units} />
                </div>
            </div>
            {/* modals */}
            <MUniDel />
            <MUniForm serviceList={services} unitList={units} />
        </>
    );
};

export default Uni;
