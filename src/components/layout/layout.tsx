import React, { FC, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import MainMenu from "@/components/mainMenu";
import HeadBar from "@/components/headBar";
import { Toaster } from "react-hot-toast";
import { Tpermission } from "@/utils/schema/univers";

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
            <main className="relative py-5 w-screen left-0 lg:left-[5vw] lg:w-[95vw] h-[93vh] overflow-y-auto">
                <Outlet />
            </main>
            <Toaster position="top-center" reverseOrder={true} />
        </>
    );
};

/* const mapStateToProps = (state: any) => {
    const loginStatus = selectAdmin(state).loginState;
    return { loginStatus };
};

export default connect(mapStateToProps, { updateAdminStatus })(Layout); */

export default Layout;
