import { FC } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
    redirect,
    ActionFunctionArgs,
} from "react-router-dom";
import { connect } from "react-redux";

//import Layout from "./components/layout";
import Layout from "@/components/layout";
import SpinningEle from "@/components/SpinningEle";
import LoginPage from "@/pages/login";
import ErrBoundary from "@/pages/errBoundary";
import Customers from "@/pages/customerPage";
import Dashboard from "@/pages/dashboard";
import { API_ADMIN } from "@/apis";
import { selectAdmin, updateAdminStatus } from "./redux/features/admin";
import InitPage from "@/pages/initPage";

interface appProp {
    loginStatus: boolean;
    permissions: any;
    updateAdminStatus: Function;
}

const App: FC<appProp> = ({ loginStatus, permissions, updateAdminStatus }) => {
    const initLoader = async () => {
        console.log("-> init loader");
        const result = await API_ADMIN.adminCheck();
        if (result.status) {
            console.log("-> login loader receive permission: ", result);
            updateAdminStatus(result.permission);
            //updateAdminPermission();
            console.log("-> init loader: auth check true, redirect to db");
            return redirect("/dashboard");
        }
        console.log("-> init loader: auth check false, redirecto to login");
        return redirect("/login");
    };

    const initAction = () => {
        console.log("-> init action");
        return {};
    };

    const loginLoader = () => {
        console.log("-> login loader");
        return {};
    };

    const loginAction = async ({ request }: ActionFunctionArgs) => {
        console.log("-> login action");
        const data = await request.formData();

        const result = await API_ADMIN.adminLogin(
            data.get("email") as string,
            data.get("password") as string
        );
        console.log("-> loginAction result: ", result);
        if (result.status) {
            await updateAdminStatus(result.permission);
            return redirect("/dashboard");
        }
        console.log("-> login action: login false");
        return { actionErr: true };
    };

    const dbLoader = async () => {
        console.log("-> db loader");
        if (loginStatus) {
            console.log("-> db laoder: login status is true");
            console.log("-> permission: ", permissions);
            return { msg: "-> direct display db page" };
        }
        console.log("-> db laoder: login status is false");
        try {
            const result = await API_ADMIN.adminCheck();
            console.log("-> db loader admin check result: ", result);
            if (result.status) {
                console.log("-> db loader receive permission: ", result);
                await updateAdminStatus(result.permission);
                return { msg: "-> called admin check again" };
            }
            console.log("-> db loader: authcheck false, redirect to login");
            return redirect("/login");
        } catch (err) {
            console.log("-> db loader: some wrong happened - ", err);
            return redirect("/login");
        }
    };

    const dbAction = () => {
        console.log("-> db action");
        return {};
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path={"/"}
                    element={<InitPage />}
                    loader={initLoader}
                    action={initAction}
                />
                <Route
                    path={"/login"}
                    element={<LoginPage />}
                    //loader={loginLoader}
                    action={loginAction}
                />
                <Route
                    path={"/dashboard"}
                    element={<Layout />}
                    errorElement={<ErrBoundary />}
                    loader={dbLoader}
                    //action={dbAction}
                >
                    <Route index element={<Dashboard />} />
                    <Route path={"customers"} element={<Customers />} />
                </Route>

                <Route path="*" element={<> No Match </>} />
            </>
        )
    );
    return <RouterProvider router={router} fallbackElement={<SpinningEle />} />;
};

const mapStateToProps = (state: any) => {
    const loginStatus = selectAdmin(state).loginState;
    const permissions = selectAdmin(state).permissionState;
    return { loginStatus, permissions };
};

export default connect(mapStateToProps, {
    updateAdminStatus,
})(App);
