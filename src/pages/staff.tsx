import { Suspense, useState, useEffect } from "react";
import type { FC, TouchEvent, MouseEvent } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import LoadingPage from "@/components/loadingEle";
import staffColumns from "@/configs/columnDefs/defStaff.tsx";
import Card from "@/components/card";
import { toastError, toastSuccess } from "@/lib/toaster";
import { TstaffWPayslip } from "@/configs/schema/staffSchema.ts";
import { MStaffDel, MStaffForm, MStaffResetPW } from "@/pageComponents/modals";
import { PTable } from "@/components/table";
import {
    atStaff,
    at2ndModalOpen,
    atModalOpen,
    atCompany,
    atLogo,
} from "@/configs/atoms";
import type { TisConflict } from "@/configs/types";
import { RES_STATUS } from "@/configs/types";
import MPayslip from "@/pageComponents/modals/mPayslip";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { useStaffWLStore } from "@/configs/zustore/staffWLStore";
import { Tcompany } from "@/configs/schema/settingSchema";
import { mOpenOps } from "@/configs/utils/modal";
import payslipColumns from "@/configs/columnDefs/defPayslip";

type Tprops = {
    //allStaff: Tstaff[] | null;
    allStaff: TstaffWPayslip[] | null;
};

const Staff: FC = () => {
    const [, setInfoConflict] = useState<TisConflict>(RES_STATUS.SUCCESS);
    const [secModalOpen, setSecModalOpen] = useAtom(at2ndModalOpen);
    const [staff, setStaff] = useAtom(atStaff);
    const [, setModalOpen] = useAtom(atModalOpen);
    const [, setCompany] = useAtom(atCompany);
    const [, setLogo] = useAtom(atLogo);
    const { t } = useTranslation();
    const { allStaff, worklogs, company, logo } = useLoaderData() as {
        //allStaff: Tstaff[] | null;
        allStaff: TstaffWPayslip[] | null;
        worklogs: TwlTableRow[];
        company: Tcompany;
        logo: string;
    };
    const setAllStaffWL = useStaffWLStore((state) => state.setAllStaffWL);
    const actionData = useActionData() as Tresponse;

    useEffect(() => {
        setAllStaffWL(worklogs);
        setCompany(company);
        setLogo(logo);
    }, [worklogs, setAllStaffWL, company, logo, setCompany, setLogo]);

    useEffect(() => {
        if (!actionData) return;
        const { status } = actionData;
        switch (status) {
            // close modals if RES_STATUS.SUCCESS
            case RES_STATUS.SUCCESS:
                setInfoConflict(actionData?.status);
                if (!staff.uid) {
                    toastSuccess(t("toastS.addedStaff"));
                } else {
                    // close the password reset modal
                    secModalOpen === "ResetPW" && setSecModalOpen("");
                    toastSuccess(t("toastS.updateStaff"));
                }
                setStaff(RESET);
                setModalOpen(mOpenOps.default);
                break;
            case RES_STATUS.SUC_DEL:
                toastSuccess(t("toastS.delStaff"));
                setModalOpen(mOpenOps.default);
                break;
            case RES_STATUS.SUC_INSERT_PAYSLIP:
                toastSuccess(t("toastS.addedPayslip"));
                setModalOpen(mOpenOps.default);
                break;
            case RES_STATUS.FAILED_INSERT_PAYSLIP:
                toastError(t("toastS.addPayslip"));
                setModalOpen(mOpenOps.default);
                break;
            case RES_STATUS.FAILED_DUP_PHONE:
            case RES_STATUS.FAILED_DUP_EMAIL:
            case RES_STATUS.FAILED_DUP_P_E:
                setInfoConflict(actionData?.status);
                toastError(t("toastF.existedPE"));
                break;
            default:
                break;
        }
        // set status to default, in case the stale value interfere the next action
        actionData.status = RES_STATUS.DEFAULT;
    }, [
        actionData,
        staff.uid,
        setStaff,
        setInfoConflict,
        setModalOpen,
        t,
        secModalOpen,
        setSecModalOpen,
    ]);

    const handleAddNew = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        setStaff(RESET);
        setModalOpen("Add");
    };

    const SubTable = ({ data }: { data: TstaffWPayslip }) => {
        return data?.payslips?.length ? (
            <PTable
                data={data.payslips}
                columns={payslipColumns}
                menuOptions={{
                    del: true,
                }}
                cnHead="bg-indigo-50"
            />
        ) : (
            <div className="my-2 px-1">{t("tips.noPayslips")}</div>
        );
    };

    const StaffTableContent: FC<Tprops> = ({ allStaff }) => {
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
                    {allStaff ? (
                        <Card className="mt-8">
                            <PTable
                                search={true}
                                hFilter={false}
                                data={allStaff}
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

    return (
        <div className="container border-0">
            <Suspense fallback={<LoadingPage />}>
                <Await resolve={allStaff}>
                    {(staffList) => {
                        return <StaffTableContent allStaff={staffList} />;
                    }}
                </Await>
            </Suspense>

            {/* Modal for add new staff, and this modal can not be insert into Await*/}
            {/* otherwise, the animation would get lost*/}
            <MStaffForm />
            <MStaffDel />
            <MStaffResetPW />
            <MPayslip />
        </div>
    );
};

export default Staff;
