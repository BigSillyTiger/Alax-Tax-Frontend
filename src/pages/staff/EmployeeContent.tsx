import type { FC, TouchEvent, MouseEvent } from "react";
import { useEffect, useMemo } from "react";
import Card from "@/components/Card";
import { PTable } from "@/components/table";
import { useTranslation } from "react-i18next";
import { useAsyncValue } from "react-router-dom";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { TstaffWPayslip } from "@/configs/schema/staffSchema";
import { Tbonus, Tpayslip } from "@/configs/schema/payslipSchema";
import { Tcompany } from "@/configs/schema/settingSchema";
import { atCompany, atLogo, atModalOpen, atStaff } from "@/configs/atoms";
import { useAtom } from "jotai";
import {
    usePayslipStore,
    useStaffStore,
    useStaffWLStore,
} from "@/configs/zustore";
import { dateFormat, hmsTohm } from "@/lib/time";
import { updateBellAlert } from "@/lib/utils";
import usePaySlipColumnsDef from "@/configs/columnDefs/defPayslip";
import StaffDetailedCard from "@/pageComponents/cards/StaffDetailedCard";
import { mOpenOps } from "@/configs/utils/modal";

const EmployeeContent: FC = () => {
    const { t } = useTranslation();
    const [, setCompany] = useAtom(atCompany);
    const [, setLogo] = useAtom(atLogo);
    const [, setStaff] = useAtom(atStaff);
    const [, setModalOpen] = useAtom(atModalOpen);
    const setAllStaff = useStaffStore((state) => state.setAllStaff);
    const setAllStaffWL = useStaffWLStore((state) => state.setAllStaffWL);
    const setAllBonus = usePayslipStore((state) => state.setAllBonus);
    const newPayslipColumns = usePaySlipColumnsDef();
    const newPSColumns = newPayslipColumns.slice(0, -1);

    const [worklogs, allStaff, allPayslips, allBonus, company, logo] =
        useAsyncValue() as [
            TwlTableRow[],
            TstaffWPayslip[],
            Tpayslip[],
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

    const newPayslips = useMemo(() => {
        if (!allPayslips) return [];
        return allPayslips.sort((a: Tpayslip, b: Tpayslip) => {
            const dateA = new Date(a.s_date);
            const dateB = new Date(b.s_date);
            // Compare dates
            if (dateA > dateB) return -1; // Return -1 to indicate dateA comes before dateB
            if (dateA < dateB) return 1; // Return 1 to indicate dateA comes after dateB
            return 0;
        });
    }, [allPayslips]);

    useEffect(() => {
        setAllStaff(newAllStaff);
        setAllStaffWL(newWorklogs);
        setAllBonus(allBonus);
        setCompany(company);
        setLogo(logo);
        // update bell alert
        updateBellAlert({ unPayslip: allPayslips });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allBonus, newWorklogs, company, logo, newAllStaff]);

    const handleAddNew = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        setStaff(newAllStaff[0]);
        setModalOpen(mOpenOps.edit);
    };

    return (
        <div
            className="w-full h-full px-4 sm:px-6 lg:px-8 top-0 
            flex flex-col gap-3"
        >
            {/* header area */}
            <div className="grid grid-cols-2 gap-2">
                <StaffDetailedCard staff={newAllStaff[0]} />
                <div className="flex  justify-center items-center">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-4 py-3 text-center text-lg font-semibold text-slate-50 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleAddNew}
                    >
                        {t("btn.editInfo")}
                    </button>
                </div>
            </div>

            {/* table */}
            {newPayslips ? (
                <Card className="mt-8">
                    <PTable
                        data={newPayslips}
                        columns={newPSColumns}
                        menuOptions={{
                            edit: true,
                            payslip: true,
                            del: true,
                        }}
                        cnSearch="my-3"
                        cnTable="h-[52dvh]"
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
    );
};

export default EmployeeContent;
