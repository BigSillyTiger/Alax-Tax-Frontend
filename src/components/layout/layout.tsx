import React, { FC, useState } from "react";
import {
    Navigate,
    Outlet,
    useLoaderData,
    redirect,
    ActionFunctionArgs,
    LoaderFunctionArgs,
} from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { API_ADMIN } from "@/apis";
import SideMenu, { t_permission } from "./sideMenu";

export const layoutLoader = async ({ request }: LoaderFunctionArgs) => {
    const pname = new URL(request.url).pathname;
    console.log("=> layout loader url: ", pname);
    try {
        const result = await API_ADMIN.adminCheck();
        if (result.status) {
            return result.permission;
        }
        return pname
            ? redirect(`/login?redirect=${pname}`)
            : redirect("/login");
    } catch (err) {
        return redirect("/login");
    }
};

/* export const layoutAction = async ({ request }: ActionFunctionArgs) => {
    const data = await request.formData();
    const intent = data.get("intent");
    switch (intent) {
        // these 2 cases will need more ui interaction
        // this action is malfunctioned bc now the layout component is not /dashboard but a layout router
        case "logout1":
        case "logout2":
            await API_ADMIN.adminLogout();
            return redirect("/login");
        default:
            return {};
    }
};
 */
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
