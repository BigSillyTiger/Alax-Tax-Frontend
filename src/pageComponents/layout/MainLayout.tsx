import { useEffect, useState } from "react";
import MainMenu from "../mainMenu";
import { Outlet, useAsyncValue } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HeadBar from "../headBar";
import { Tpermission } from "@/configs/schema/universSchema";
import { useLogoStore } from "@/configs/zustore";

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    // this is for head bar alert bell notification
    const setLogoSrc = useLogoStore((state) => state.setLogoSrc);

    const [loaderData, logo] = useAsyncValue() as [Tpermission, string];

    useEffect(() => {
        setLogoSrc(logo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logo]);

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
                className={`relative w-screen left-0 lg:left-[5dvw] lg:w-[95dvw] h-[93dvh] overflow-y-auto`}
            >
                <Outlet />
            </main>
            <Toaster position="top-center" reverseOrder={true} />
        </>
    );
};

export default MainLayout;
