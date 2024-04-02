import { FC, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import MainMenu from "@/pageComponents/mainMenu";
import HeadBar from "@/pageComponents/headBar";
import { Toaster } from "react-hot-toast";
import { Tpermission } from "@/configs/schema/universSchema";
import { mainViewH, mainViewW, menuLgW } from "@/configs/ui";

const Layout: FC = () => {
    const loaderData = useLoaderData() as Tpermission; // permission data

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

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
                className={`relative py-5 w-screen left-0 lg:left-[${menuLgW}] lg:w-[${mainViewW}] h-[${mainViewH}] overflow-y-auto`}
            >
                <Outlet />
            </main>
            <Toaster position="top-center" reverseOrder={true} />
        </>
    );
};

export default Layout;
