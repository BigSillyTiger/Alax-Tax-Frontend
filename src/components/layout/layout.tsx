import React, { FC, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import MainMenu from "@/components/mainMenu";
import HeadBar from "@/components/headBar";
import { Toaster } from "react-hot-toast";

export type t_permission = {
    dashboard: number;
    clients: number;
    orders: number;
    calendar: number;
    employees: number;
    management: number;
};

const Layout: FC = () => {
    const loaderData = useLoaderData() as t_permission; // permission data

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
            <main className="py-10 lg:pl-20 h-[93vh] overflow-y-auto">
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
