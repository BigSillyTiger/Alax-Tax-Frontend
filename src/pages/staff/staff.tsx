import type { FC } from "react";
import { Suspense, useState, useEffect } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import LoadingPage from "@/components/loadingEle";
import { toastError, toastSuccess } from "@/lib/toaster";
import { TstaffWPayslip } from "@/configs/schema/staffSchema.ts";
import { MStaffDel, MStaffForm, MStaffResetPW } from "@/pageComponents/modals";
import { atStaff, at2ndModalOpen, atModalOpen } from "@/configs/atoms";
import type { TisConflict } from "@/configs/types";
import { RES_STATUS } from "@/configs/types";
import MPayslip from "@/pageComponents/modals/mPayslip";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { Tcompany } from "@/configs/schema/settingSchema";
import { mOpenOps } from "@/configs/utils/modal";
import MPayslipDel from "@/pageComponents/modals/mPayslipDel";
import { Tbonus } from "@/configs/schema/payslipSchema";
import MPSDisplay from "@/pageComponents/modals/mPSDisplay";
import ErrorTips from "@/components/ErrorTips";
import { useAdminStore } from "@/configs/zustore";
import { ROLES } from "@/configs/utils/staff";
import EmployeeContent from "./EmployeeContent";
import ManagerContent from "./ManagerContent";

const Staff: FC = () => {
    const { t } = useTranslation();
    const { allPromise } = useLoaderData() as {
        allPromise: Promise<
            [TwlTableRow[], TstaffWPayslip[], Tbonus[], Tcompany, string]
        >;
    };

    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [secModalOpen, setSecModalOpen] = useAtom(at2ndModalOpen);
    const [, setInfoConflict] = useState<TisConflict>(RES_STATUS.SUCCESS);
    const [staff, setStaff] = useAtom(atStaff);
    const actionData = useActionData() as Tresponse;

    const currentAdmin = useAdminStore((state) => state.currentAdmin);
    const isEmployee = currentAdmin.role === ROLES.employee;

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
            case RES_STATUS.FAILED_DEL:
                setModalOpen(mOpenOps.default);
                toastError(t("toastF.delStaff"));
                break;
            case RES_STATUS.FAILED:
                setModalOpen(mOpenOps.default);
                toastError(t("toastF.responseFailed"));
                break;
            default:
                break;
        }
        // set status to default, in case the stale value interfere the next action
        actionData.status = RES_STATUS.DEFAULT;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        actionData,
        staff.uid,
        secModalOpen,
        modalOpen,
        /* 
        setStaff,
        setInfoConflict,
        setModalOpen,
        t,
        setSecModalOpen, 
        */
    ]);

    return (
        <>
            <div className="container border-0">
                <Suspense fallback={<LoadingPage />}>
                    <Await resolve={allPromise} errorElement={<ErrorTips />}>
                        {isEmployee ? <EmployeeContent /> : <ManagerContent />}
                    </Await>
                </Suspense>
            </div>

            {/* Modal for add new staff, and this modal can not be insert into Await*/}
            {/* otherwise, the animation would get lost*/}
            <MStaffForm />
            <MStaffDel />
            <MStaffResetPW />
            <MPayslip />
            <MPayslipDel />
            <MPSDisplay />
        </>
    );
};

export default Staff;
