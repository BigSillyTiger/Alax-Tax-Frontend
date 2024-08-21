import type { FC, TouchEvent, MouseEvent } from "react";
import { useEffect, useMemo } from "react";
import Card from "@/components/Card";
import { PTable } from "@/components/table";
import useStaffColumnsDef from "@/configs/columnDefs/defStaff";
import { useTranslation } from "react-i18next";
import SubTable from "./SubTable";
import { useAsyncValue } from "react-router-dom";
import { TstaffWPayslip } from "@/configs/schema/staffSchema";
import { Tbonus, Tpayslip } from "@/configs/schema/payslipSchema";
import { Tcompany } from "@/configs/schema/settingSchema";
import { atCompany, atLogo, atModalOpen, atStaff } from "@/configs/atoms";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import { usePayslipStore, useStaffStore } from "@/configs/zustore";
import { dateFormat } from "@/lib/time";
import { updateBellAlert } from "@/lib/utils";
import { Nbtn } from "@/components/btns";

const ManagerContent: FC = () => {
    const { t } = useTranslation();
    const [, setCompany] = useAtom(atCompany);
    const [, setLogo] = useAtom(atLogo);
    const [, setStaff] = useAtom(atStaff);
    const [, setModalOpen] = useAtom(atModalOpen);
    const setAllStaff = useStaffStore((state) => state.setAllStaff);
    const setAllBonus = usePayslipStore((state) => state.setAllBonus);
    const staffColumns = useStaffColumnsDef();

    const [allStaff, allPayslips, allBonus, company, logo] =
        useAsyncValue() as [
            TstaffWPayslip[],
            Tpayslip[],
            Tbonus[],
            Tcompany,
            string,
        ];

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
        setAllBonus(allBonus || []);
        setCompany(company);
        setLogo(logo);
        // update bell alert
        updateBellAlert({ unPayslip: allPayslips });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allBonus, company, logo, newAllStaff]);

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
