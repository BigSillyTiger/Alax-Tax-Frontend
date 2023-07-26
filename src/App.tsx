import { FC, useState } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
    redirect,
    json,
    ActionFunctionArgs,
} from "react-router-dom";
import { connect } from "react-redux";

//import Layout from "./components/layout";
import Layout from "@/components/layout";
import SpinningEle from "@/components/SpinningEle";
import LoginPage from "@/pages/loginPage";
import ErrBoundary from "@/pages/errBoundary";
import Customers from "@/pages/customers";
import Dashboard from "@/pages/dashboard";
import { API_ADMIN } from "@/apis";
import {
    changeAdminStatus,
    updateAdminPermission,
} from "./redux/features/admin";

interface appProp {
    changeAdminStatus: Function;
    updateAdminPermission: Function;
}

const App: FC<appProp> = ({ changeAdminStatus, updateAdminPermission }) => {
    const loginLoader = async () => {
        const errors: any = {};
        const result = await API_ADMIN.adminCheck();
        if (result) {
            changeAdminStatus(true);
            //const res = await API_ADMIN.adminPermission()
            //updateAdminPermission();
            return redirect("/dashboard");
        }
        return json({ loaderErr: true });
    };

    const loginAction = async ({ request }: ActionFunctionArgs) => {
        const data = await request.formData();

        const result = await API_ADMIN.adminLogin(
            data.get("email") as string,
            data.get("password") as string
        );
        if (result) {
            console.log("-> redirect to dashboard");
            changeAdminStatus(true);
            return redirect("/dashboard");
        }
        console.log("-> error occurs on loginAction");

        return { actionErr: true };
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path={"/"}
                    element={<LoginPage />}
                    loader={loginLoader}
                    action={loginAction}
                />
                <Route
                    path={"/dashboard"}
                    element={<Layout />}
                    errorElement={<ErrBoundary />}
                >
                    <Route index element={<Dashboard />} />
                    <Route element={<Customers />} />
                </Route>
            </>
        )
    );
    return <RouterProvider router={router} fallbackElement={<SpinningEle />} />;
};

export default connect(null, { changeAdminStatus, updateAdminPermission })(App);
