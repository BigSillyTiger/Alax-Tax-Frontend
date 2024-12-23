import type { FC } from "react";
import { useAtom } from "jotai";
import Card from "@/components/Card.tsx";
import { Tservice, Tunit } from "@/configs/schema/settingSchema.ts";
import {
    serviceListColDefs,
    unitListColDefs,
} from "../../configs/columnDefs/defUniList.tsx";
import { Tunivers } from "@/configs/types.ts";
import { MUniDel, MUniForm } from "@/pageComponents/modals";
import { PTable } from "@/components/table";
import { useTranslation } from "react-i18next";
import { atSUInitData, initS, initU, atModalOpen } from "@/configs/atoms";
import { mOpenOps } from "@/configs/utils/modal";
import { ColumnDef } from "@tanstack/react-table";
import { Nbtn } from "@/components/btns/index.tsx";

type Tprops = Tunivers;

const Uni: FC<Tprops> = ({ services, units }) => {
    const [, setSUinitData] = useAtom(atSUInitData);
    const [, setModalOpen] = useAtom(atModalOpen);
    const { t } = useTranslation();

    const ServiceTable: FC<{ services: Tservice[] | null }> = ({
        services,
    }) => {
        return (
            <div className="m-1">
                {/* header area */}
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto sm:flex">
                        {t("label.serviceList")}
                    </div>
                    <div className="my-2 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Nbtn
                            type="button"
                            className="w-[20dvh]"
                            onClick={(e) => {
                                e.preventDefault();
                                setSUinitData(initS);
                                setModalOpen(mOpenOps.add);
                            }}
                        >
                            {t("btn.newService")}
                        </Nbtn>
                    </div>
                </div>
                {/* table */}
                <Card className="">
                    {services?.length ? (
                        <PTable
                            search={true}
                            data={services}
                            columns={
                                serviceListColDefs as ColumnDef<{
                                    id: number;
                                    unit: string;
                                    unit_price: number;
                                    service: string;
                                }>[]
                            }
                            setData={setSUinitData}
                            menuOptions={{ edit: true, del: true }}
                            cnSearch="my-3"
                            cnTable={`h-[55dvh]`}
                            cnHead="sticky z-10 bg-indigo-300"
                            cnTh="py-3"
                        />
                    ) : (
                        <span className="m-5 p-5  text-center h-15">
                            {t("tips.npPreService")}
                        </span>
                    )}
                </Card>
            </div>
        );
    };

    const UnitTable: FC<{ units: Tunit[] | null }> = ({ units }) => {
        return (
            <div className="m-1">
                {/* header area */}
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto sm:flex">
                        {t("label.unitList")}
                    </div>
                    <div className="my-2 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Nbtn
                            type="button"
                            className="w-[15dvh]"
                            onClick={(e) => {
                                e.preventDefault();
                                setSUinitData(initU);
                                setModalOpen(mOpenOps.add);
                            }}
                        >
                            {t("btn.newUnit")}
                        </Nbtn>
                    </div>
                </div>

                {/* table */}
                <Card className="">
                    {units?.length ? (
                        <PTable
                            search={true}
                            data={units}
                            columns={
                                unitListColDefs as ColumnDef<{
                                    id: number;
                                    unit_name: string;
                                }>[]
                            }
                            setData={setSUinitData}
                            menuOptions={{ edit: true, del: true }}
                            cnSearch="my-3"
                            cnTable={`h-[55dvh]`}
                            cnHead="sticky z-10 bg-indigo-300"
                            cnTh="py-3"
                        />
                    ) : (
                        <span className="m-5 p-5  text-center h-15">
                            {t("tips.npPreUnit")}
                        </span>
                    )}
                </Card>
            </div>
        );
    };
    return (
        <>
            <div className="flex flex-row justify-between items-center gap-x-4">
                <div className="grow">
                    <ServiceTable services={services} />
                </div>
                <div className="w-[30dvw]">
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
