import React, { useState } from "react";
import type { FC } from "react";
import Card from "@/components/card";
import { Tservice, Tunit } from "@/utils/schema/manage";
import UniTable from "./tables/uniTable";
import { serviceListColDefs, unitListColDefs } from "./tables/uniListColDefs";
import { Tunivers } from "@/utils/types";
import MUniAdd from "./modals/mUniAdd";

type Tprops = Tunivers;

const initS = {
    id: 0,
    service: "",
    unit: "",
    unit_price: 0,
};

const initU = {
    id: 0,
    unit_name: "",
};

const Uni: FC<Tprops> = ({ services, units }) => {
    const [uniAdd, setUniAdd] = useState<"S" | "U" | false>(false);
    const [uAdd, setUAdd] = useState(false);
    const [sEdit, setSEdit] = useState<Tservice>(initS);
    const [uEdit, setUEdit] = useState<Tunit>(initU);

    const [uniDel, setUniDel] = useState<Tservice | Tunit | null>(null);

    const ServiceTable: FC<{ services: Tservice[] | null }> = ({
        services,
    }) => {
        return (
            <Card className="m-1">
                {/* header area */}
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto sm:flex">services list</div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={(e) => setUniAdd("S")}
                        >
                            New Service
                        </button>
                    </div>
                </div>
                {/* table */}
                {services?.length ? (
                    <Card>
                        <UniTable
                            data={services}
                            columns={serviceListColDefs}
                            clickDel={setUniDel}
                            clickEdit={setSEdit}
                        />
                    </Card>
                ) : (
                    <Card className="mt-8">
                        <span className="m-5 p-5  text-center h-15">
                            No services content
                        </span>
                    </Card>
                )}
            </Card>
        );
    };

    const UnitTable: FC<{ units: Tunit[] | null }> = ({ units }) => {
        return (
            <Card className="m-1">
                {/* header area */}
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto sm:flex">unit list</div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={(e) => setUniAdd("U")}
                        >
                            New Unit
                        </button>
                    </div>
                </div>

                {/* table */}
                {units?.length ? (
                    <Card>
                        <UniTable
                            data={units}
                            columns={unitListColDefs}
                            clickDel={setUniDel}
                            clickEdit={setUEdit}
                        />
                    </Card>
                ) : (
                    <Card className="mt-8">
                        <span className="m-5 p-5  text-center h-15">
                            No units content
                        </span>
                    </Card>
                )}
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
            <MUniAdd
                open={uniAdd}
                setOpen={setUniAdd}
                serviceList={services}
                unitList={units}
            />
        </>
    );
};

export default Uni;