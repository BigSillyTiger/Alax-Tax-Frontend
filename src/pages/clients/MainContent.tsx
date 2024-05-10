import type { FC, TouchEvent, MouseEvent } from "react";
import Card from "@/components/Card";
import { PTable } from "@/components/table";
import { useTranslation } from "react-i18next";
import { Tclient } from "@/configs/schema/clientSchema";
import { atClient, atModalOpen } from "@/configs/atoms";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import useClientColumnsDef from "@/configs/columnDefs/defClients";
import { Nbtn } from "@/components/btns";

type Tprops = {
    clients: Tclient[] | null;
};

const MainContent: FC<Tprops> = ({ clients }) => {
    const { t } = useTranslation();
    const [, setClient] = useAtom(atClient);
    const [, setModalOpen] = useAtom(atModalOpen);
    const clientColumns = useClientColumnsDef();

    const handleAddNew = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        setClient(RESET);
        setModalOpen("Add");
    };

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 top-0">
                {/* header area */}
                <div className="flex justify-end">
                    <Nbtn
                        type="button"
                        className="w-full sm:w-[25dvw] md:w-[30dvw] text-wrap"
                        onClick={handleAddNew}
                    >
                        {t("btn.addClient")}
                    </Nbtn>
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
