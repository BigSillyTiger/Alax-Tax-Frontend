import type { FC, TouchEvent, MouseEvent } from "react";
import { useEffect } from "react";
import Card from "@/components/Card";
import { PTable } from "@/components/table";
import useStaffColumnsDef from "@/configs/columnDefs/defStaff";
import { useTranslation } from "react-i18next";
import { useAsyncValue } from "react-router-dom";
import { Tcompany } from "@/configs/schema/settingSchema";
import { atCompany, atLogo, atModalOpen, atStaff } from "@/configs/atoms";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useStaffStore } from "@/configs/zustore";
import { Nbtn } from "@/components/btns";
import { Tstaff } from "@/configs/schema/staffSchema";

const ManagerContent: FC = () => {
    const { t } = useTranslation();
    const [, setCompany] = useAtom(atCompany);
    const [, setLogo] = useAtom(atLogo);
    const [, setStaff] = useAtom(atStaff);
    const [, setModalOpen] = useAtom(atModalOpen);
    const setAllStaff = useStaffStore((state) => state.setAllStaff);
    const staffColumns = useStaffColumnsDef();

    const [allStaff, company, logo] = useAsyncValue() as [
        Tstaff[],
        Tcompany,
        string,
    ];

    useEffect(() => {
        setAllStaff(allStaff);
        setCompany(company);
        setLogo(logo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [company, logo]);

    const handleAddNew = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        setStaff(RESET);
        setModalOpen("Add");
    };

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 top-0">
                {/* header area */}
                <div className="flex justify-end">
                    <Nbtn
                        type="button"
                        className="w-[25dvh] text-wrap"
                        onClick={handleAddNew}
                    >
                        {t("btn.addStuff")}
                    </Nbtn>
                </div>

                {/* table */}
                {allStaff ? (
                    <Card className="mt-8">
                        <PTable
                            search={true}
                            hFilter={true}
                            data={allStaff}
                            columns={staffColumns}
                            menuOptions={{
                                edit: true,
                                payslip: true,
                                del: true,
                            }}
                            setData={setStaff}
                            cnSearch="my-3"
                            cnTable="h-[65dvh]"
                            cnTHead="sticky z-10 bg-indigo-300"
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

export default ManagerContent;
