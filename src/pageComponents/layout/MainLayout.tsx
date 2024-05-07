import { useEffect, useMemo, useState } from "react";
import MainMenu from "../mainMenu";
import { Outlet, useAsyncValue } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HeadBar from "../headBar";
import { Tpermission } from "@/configs/schema/universSchema";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { Tpayslip } from "@/configs/schema/payslipSchema";
import { useGlobalAlertStore } from "@/configs/zustore";

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    // this is for head bar alert bell notification
    const setUnPayslip = useGlobalAlertStore((state) => state.setUnPayslip);
    const setUnWorklog = useGlobalAlertStore((state) => state.setUnWorklog);

    const [loaderData, allWorklogs, allPayslips] = useAsyncValue() as [
        Tpermission,
        TwlTableRow[],
        Tpayslip[],
    ];

    const unWL = useMemo(() => {
        return allWorklogs.filter((wl) => wl.wl_status === "unconfirmed");
    }, [allWorklogs]);
    const unPS = useMemo(() => {
        return allPayslips.filter((ps) => ps.status === "pending");
    }, [allPayslips]);

    useEffect(() => {
        setUnWorklog(unWL);
        setUnPayslip(unPS);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unWL, unPS]);

    return (
        <>
            <MainMenu
                permissionData={loaderData}
                open={sidebarOpen}
                setOpen={setSidebarOpen}
            />
            <HeadBar open={sidebarOpen} setOpen={setSidebarOpen} />

            {/* view area */}
            <main
                className={`relative py-5 w-screen left-0 lg:left-[5dvw] lg:w-[95dvw] h-[93dvh] overflow-y-auto`}
            >
                <Outlet />
            </main>
            <Toaster position="top-center" reverseOrder={true} />
        </>
    );
};

export default MainLayout;
