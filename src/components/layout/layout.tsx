import React, { FC, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";

import SideMenu, { t_permission } from "./sideMenu";

const Layout: FC = () => {
    const loaderData = useLoaderData() as t_permission; // permission data

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    return (
        <>
            <SideMenu
                permissionData={loaderData}
                open={sidebarOpen}
                setOpen={setSidebarOpen}
            />

            {/* view frame */}
            {/* <main className="py-10 lg:pl-72 h-screen border-red-600 border-dashed border-8"> */}
            <main className="py-10 px-5 lg:ml-72 h-screen">
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
