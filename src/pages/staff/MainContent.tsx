import type { FC, TouchEvent, MouseEvent } from "react";
import { useEffect, useMemo } from "react";
import Card from "@/components/card";
import { PTable } from "@/components/table";
import staffColumns from "@/configs/columnDefs/defStaff";
import { useTranslation } from "react-i18next";
import SubTable from "./SubTable";
import { useAsyncValue } from "react-router-dom";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { TstaffWPayslip } from "@/configs/schema/staffSchema";
import { Tbonus } from "@/configs/schema/payslipSchema";
import { Tcompany } from "@/configs/schema/settingSchema";
import { atCompany, atLogo, atModalOpen, atStaff } from "@/configs/atoms";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import {
    usePayslipStore,
    useStaffStore,
    useStaffWLStore,
} from "@/configs/zustore";
import { dateFormat, hmsTohm } from "@/lib/time";

const MainContent: FC = () => {
    const { t } = useTranslation();
    const [, setCompany] = useAtom(atCompany);
    const [, setLogo] = useAtom(atLogo);
    const [, setStaff] = useAtom(atStaff);
    const [, setModalOpen] = useAtom(atModalOpen);
    const setAllStaff = useStaffStore((state) => state.setAllStaff);
    const setAllStaffWL = useStaffWLStore((state) => state.setAllStaffWL);
    const setAllBonus = usePayslipStore((state) => state.setAllBonus);

    const [worklogs, allStaff, allBonus, company, logo] = useAsyncValue() as [
        TwlTableRow[],
        TstaffWPayslip[],
        Tbonus[],
        Tcompany,
        string,
    ];

    const newWorklogs = useMemo(
        () =>
            worklogs
                .sort((a: TwlTableRow, b: TwlTableRow) => {
                    const dateA = new Date(a.wl_date);
                    const dateB = new Date(b.wl_date);

                    // Compare dates
                    if (dateA > dateB) return -1; // Return -1 to indicate dateA comes before dateB
                    if (dateA < dateB) return 1; // Return 1 to indicate dateA comes after dateB
                    return 0;
                })
                .map((wl: TwlTableRow) => {
                    return {
                        ...wl,
                        // convert the date format stored in mysql: yyyy-mm-dd to au: dd-mm-yyyy
                        // this format is related to date searching in the table
                        wl_date: dateFormat(wl.wl_date, "au"),
                        s_time: hmsTohm(wl.s_time as string),
                        e_time: hmsTohm(wl.e_time as string),
                        b_time: hmsTohm(wl.b_time as string),
                        b_hour: hmsTohm(wl.b_hour as string),
                    };
                }),
        [worklogs]
    );
    const newAllStaff = useMemo(() => {
        if (!allStaff) return [];
        return allStaff.map((staff) => {
            if (staff.payslips === null) {
                return {
                    ...staff,
                    payslips: [],
                };
            }
            return {
                ...staff,
                payslips: staff.payslips.map((ps) => {
                    return {
                        ...ps,
                        s_date: dateFormat(ps.s_date, "au"),
                        e_date: dateFormat(ps.e_date, "au"),
                    };
                }),
            };
        });
    }, [allStaff]);

    useEffect(() => {
        setAllStaff(newAllStaff);
        setAllStaffWL(newWorklogs);
        setAllBonus(allBonus || []);
        setCompany(company);
        setLogo(logo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allBonus, newWorklogs, company, logo, newAllStaff]);

    const handleAddNew = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        setStaff(RESET);
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
                            {t("btn.addStuff")}
                        </button>
                    </div>
                </div>
                {/* table */}
                {newAllStaff ? (
                    <Card className="mt-8">
                        <PTable
                            search={true}
                            hFilter={true}
                            data={newAllStaff}
                            columns={staffColumns}
                            menuOptions={{
                                edit: true,
                                payslip: true,
                                del: true,
                            }}
                            setData={setStaff}
                            getRowCanExpand={(row) => {
                                if (
                                    row.original.payslips &&
                                    row.original.payslips.length > 0
                                ) {
                                    return true;
                                }
                                return false;
                            }}
                            expandContent={SubTable}
                            cnSearch="my-3"
                            cnTable={`h-[65dvh]`}
                            cnHead="sticky z-10 bg-indigo-300"
                            cnTh="py-3"
                        />
                    </Card>
                ) : (
                    <Card className="mt-8">
                        <span className="m-5 p-5  text-center h-15">
                            {t("pageText.noClient")}
                        </span>
                    </Card>
                )}
            </div>
        </>
    );
};

export default MainContent;
