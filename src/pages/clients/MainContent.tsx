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
        <div className="flex flex-col top-0">
            {/* header area */}
            <div className="flex justify-end my-4">
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
                <Card className="mb-3">
                    <PTable
                        search={true}
                        hFilter={true}
                        data={clients}
                        columns={clientColumns}
                        menuOptions={{ edit: true, del: true }}
                        setData={setClient}
                    />
                </Card>
            ) : (
                <Card className="mt-8">
                    <span className="m-5 p-5 text-center h-15">
                        {t("tips.noClient")}
                    </span>
                </Card>
            )}
        </div>
    );
};

export default MainContent;
