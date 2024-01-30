import { FC } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
} from "react-router-dom";

//import Layout from "./components/layout";
import LoginPage from "@/pages/login/loginPage";
import ErrBoundary from "@/pages/errBoundary";

import InitPage from "@/pages/initPage";
import { initLoader, initAction } from "@/pages/initPage";
import { loginLoader, loginAction } from "@/pages/login";
import Layout, { layoutLoader } from "@/components/layout";

import Dashboard, { loader as dashboardLoader } from "@/pages/dashboard";
import Clients, {
    loader as clientsLoader,
    action as clientsAction,
} from "@/pages/clients";
import Client, {
    loader as clientLoader,
    action as clientAction,
} from "@/pages/client";
import Orders, {
    loader as ordersLoader,
    action as ordersAction,
} from "@/pages/orders";
import Staff, {
    loader as staffLoader,
    action as staffAction,
} from "@/pages/staff";
import Setting from "@/pages/setting";
import Calendar from "./pages/calendar";
import {
    loader as universLoader,
    action as universAction,
} from "@/pages/setting/dataAccess";
import LoadingPage from "./components/loadingEle";

const App: FC = () => {
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
                    loader={loginLoader}
                    action={loginAction}
                />
                <Route
                    element={<Layout />}
                    loader={layoutLoader}
                    errorElement={<ErrBoundary />}
                >
                    <Route
                        index
                        path={"/dashboard"}
                        element={<Dashboard />}
                        loader={dashboardLoader}
                    />
                    <Route
                        path={"/clients"}
                        element={<Clients />}
                        loader={clientsLoader}
                        action={clientsAction}
                    />
                    <Route
                        path={"/clients/:cid"}
                        element={<Client />}
                        loader={clientLoader}
                        action={clientAction}
                    />
                    <Route
                        path={"/orders"}
                        element={<Orders />}
                        loader={ordersLoader}
                        action={ordersAction}
                    />
                    <Route path={"/calendar"} element={<Calendar />} />
                    <Route
                        path={"/staff"}
                        element={<Staff />}
                        loader={staffLoader}
                        action={staffAction}
                    />
                    <Route
                        path={"/setting"}
                        element={<Setting />}
                        loader={universLoader}
                        action={universAction}
                    />
                </Route>

                <Route path="*" element={<> No Match </>} />
            </>
        )
    );
    return <RouterProvider router={router} fallbackElement={<LoadingPage />} />;
};

export default App;
