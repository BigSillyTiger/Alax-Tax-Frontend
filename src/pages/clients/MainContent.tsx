import type { FC, TouchEvent, MouseEvent } from "react";
import Card from "@/components/card";
import { PTable } from "@/components/table";
import { useTranslation } from "react-i18next";
import { Tclient } from "@/configs/schema/clientSchema";
import { atClient, atModalOpen } from "@/configs/atoms";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import clientColumns from "@/configs/columnDefs/defClients";

type Tprops = {
    clients: Tclient[] | null;
};

const MainContent: FC<Tprops> = ({ clients }) => {
    const { t } = useTranslation();
    const [, setClient] = useAtom(atClient);
    const [, setModalOpen] = useAtom(atModalOpen);

    const handleAddNew = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        setClient(RESET);
        setModalOpen("Add");
    };

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 top-0">
                {/* header area */}
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto sm:flex"></div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleAddNew}
                        >
                            {t("btn.addClient")}
                        </button>
                    </div>
                </div>
                {/* table */}
                {clients && clients.length ? (
                    <Card className="mt-8">
                        <PTable
                            search={true}
                            hFilter={true}
                            data={clients}
                            columns={clientColumns}
                            menuOptions={{ edit: true, del: true }}
                            setData={setClient}
                            cnSearch="my-3"
                            cnTable={`h-[65dvh]`}
                            cnHead="sticky z-10 bg-indigo-300"
                            cnTh="py-3"
                        />
                    </Card>
                ) : (
                    <Card className="mt-8">
                        <span className="m-5 p-5  text-center h-15">
                            {t("tips.noClient")}
                        </span>
                    </Card>
                )}
            </div>
        </>
    );
};

export default MainContent;
