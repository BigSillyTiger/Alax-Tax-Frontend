import React, { FC, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { API_ADMIN } from "@/apis";
import MainMenu from "@/components/mainMenu";
import HeadBar from "@/components/headBar";

export type t_permission = {
    dashboard: number;
    clients: number;
    orders: number;
    calendar: number;
    employees: number;
    management: number;
};

const Layout: FC = () => {
    const nevigate = useNavigate();
    const loaderData = useLoaderData() as t_permission; // permission data

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const handleLogout = async (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        console.log("---> click log out");
        await API_ADMIN.adminLogout();
        return nevigate("/login", { replace: true }); // redirect does not work here
    };

    return (
        <>
            <MainMenu
                permissionData={loaderData}
                open={sidebarOpen}
                setOpen={setSidebarOpen}
            />
            <HeadBar open={sidebarOpen} setOpen={setSidebarOpen} />

            {/* view area */}
            <main className="py-10 lg:pl-20 overflow-y-auto h-[100vh]">
                <Outlet />
            </main>
        </>
    );
};

/* const mapStateToProps = (state: any) => {
    const loginStatus = selectAdmin(state).loginState;
    return { loginStatus };
};

export default connect(mapStateToProps, { updateAdminStatus })(Layout); */

export default Layout;
