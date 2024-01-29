import { Suspense, useState, useEffect } from "react";
import type { FC, TouchEvent, MouseEvent } from "react";
import { Await, useLoaderData, useActionData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoadingPage from "@/components/loadingEle";
import staffColumns from "@/configs/columnDefs/defStaff.tsx";
import Card from "@/components/card";
import { Tresponse, TclientOrderModal } from "@/utils/types";
import { toastError, toastSuccess } from "@/utils/toaster";
import { RES_STATUS, TisConflict } from "@/utils/types";
import { Tstaff } from "@/configs/schema/staffSchema.ts";
/* import MClientDel from "./modals/mClientDel";
import MClientForm from "./modals/mClientForm.tsx"; */
import { PTable } from "@/components/table";
import { all } from "axios";
import MStaffForm from "./modals/mStaffForm";

type Tprops = {
    allStaff: Tstaff[] | null;
};

const initStaff = {
    uid: -1,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    role: "employee", // manager | employee
};

const Staff: FC = () => {
    const [staff, setStaff] = useState<Tstaff>(initStaff);
    const [infoConflict, setInfoConflict] = useState<TisConflict>(
        RES_STATUS.SUCCESS
    );
    const [modalOpen, setModalOpen] = useState("");
    const { t } = useTranslation();
    const { allStaff } = useLoaderData() as {
        allStaff: Tstaff[] | null;
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
                                onClick={() => {
                                    console.log("-> no implementation");
                                }}
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
                                setModalOpen={setModalOpen}
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

            {/* Modal for add new client, and this modal can not be insert into Await*/}
            {/* otherwise, the animation would get lost*/}
            {/* <MClientDel
                client={client}
                open={modalOpen}
                setOpen={setModalOpen}
            /> */}
            <MStaffForm
                staff={staff}
                open={modalOpen}
                setOpen={setModalOpen}
                isConflict={infoConflict}
                setConflict={setInfoConflict}
            />
        </div>
    );
};

export default Staff;
