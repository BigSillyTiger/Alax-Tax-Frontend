import React, { FC, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";

import SideMenu, { t_permission } from "./sideMenu";

const Layout: FC = () => {
    const loaderData = useLoaderData() as t_permission; // permission data

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    return (
        <div>
            <SideMenu
                permissionData={loaderData}
                open={sidebarOpen}
                setOpen={setSidebarOpen}
            />
            <div className="md:pl-64 flex flex-col flex-1">
                {/* side bar open/close button for sm screen */}
                <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                {/* view frame */}
                <main className="flex-1">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Dashboard
                            </h1>
                        </div>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

/* const mapStateToProps = (state: any) => {
    const loginStatus = selectAdmin(state).loginState;
    return { loginStatus };
};

export default connect(mapStateToProps, { updateAdminStatus })(Layout); */

export default Layout;
