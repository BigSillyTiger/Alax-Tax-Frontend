import { Suspense, useState, useEffect } from "react";
import type { FC, TouchEvent, MouseEvent } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import LoadingPage from "@/components/loadingEle";
import staffColumns from "@/configs/columnDefs/defStaff.tsx";
import Card from "@/components/card";
import { Tresponse } from "@/utils/types";
import { toastError, toastSuccess } from "@/utils/toaster";
import { RES_STATUS, TisConflict } from "@/utils/types";
import { Tstaff } from "@/configs/schema/staffSchema.ts";
import MStaffDel from "./modals/mStaffDel";
import { PTable } from "@/components/table";
import MStaffForm from "./modals/mStaffForm";
import { at2ndModalOpen, atModalOpen } from "../uniStates";
import { atStaff } from "./states";
import MResetPW from "./modals/mResetPW";

type Tprops = {
    allStaff: Tstaff[] | null;
};

const Staff: FC = () => {
    const [, setInfoConflict] = useState<TisConflict>(RES_STATUS.SUCCESS);
    const [staff, setStaff] = useAtom(atStaff);
    const [, setModalOpen] = useAtom(atModalOpen);
    const [secModalOpen, setSecModalOpen] = useAtom(at2ndModalOpen);
    const { t } = useTranslation();
    const { allStaff } = useLoaderData() as {
        allStaff: Tstaff[] | null;
    };

    const actionData = useActionData() as Tresponse;
    useEffect(() => {
        /* close modals if RES_STATUS.SUCCESS  */
        if (actionData?.status === RES_STATUS.SUCCESS) {
            setInfoConflict(actionData?.status);
            if (staff.uid === -1) {
                setModalOpen("");
                setStaff(RESET);
                toastSuccess(t("toastS.addedStaff"));
            } else if (staff.uid > 0) {
                // close the password reset modal
                secModalOpen === "ResetPW" && setSecModalOpen("");
                setModalOpen("");
                setStaff(RESET);
                toastSuccess(t("toastS.updateStaff"));
            }
        } else if (
            //actionData?.status &&
            actionData?.status === RES_STATUS.SUC_DEL
        ) {
            // delete a client
            toastSuccess(t("toastS.delStaff"));
        } else if (
            actionData?.status === RES_STATUS.FAILED_DUP_PHONE ||
            actionData?.status === RES_STATUS.FAILED_DUP_EMAIL ||
            actionData?.status === RES_STATUS.FAILED_DUP_P_E
        ) {
            setInfoConflict(actionData?.status);
            toastError(t("toastF.existedPE"));
        }
        // set status to default, in case the stale value interfere the next action
        actionData?.status && (actionData.status = RES_STATUS.DEFAULT);
    }, [actionData, staff.uid, setStaff, setInfoConflict, setModalOpen, t]);

    const handleAddNew = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        setStaff(RESET);
        setModalOpen("Add");
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
                                menuOptions={{ edit: true, del: true }}
                                setData={setStaff}
                                cnSearch="my-3"
                                cnTable="h-[65vh]"
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
        <div className="container mx-auto border-0">
            <Suspense fallback={<LoadingPage />}>
                <Await resolve={allStaff}>
                    {(staffList) => {
                        return <StaffTableContent allStaff={staffList.data} />;
                    }}
                </Await>
            </Suspense>

            {/* Modal for add new staff, and this modal can not be insert into Await*/}
            {/* otherwise, the animation would get lost*/}
            {/* <MClientDel
                client={client}
                open={modalOpen}
                setOpen={setModalOpen}
            /> */}
            <MStaffForm />
            <MStaffDel />
            <MResetPW />
        </div>
    );
};

export default Staff;
