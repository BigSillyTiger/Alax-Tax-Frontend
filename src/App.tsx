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
import { initLoader } from "@/pages/initPage";
import { loginLoader, loginAction } from "@/pages/login";
import Layout from "@/page-components/layout";
import {
    loader as layoutLoader,
    action as layoutAction,
} from "@/page-components/layout/dataAccess";

import Dashboard, { loader as dashboardLoader } from "@/pages/dashboard";
import Clients from "@/pages/clients";
import {
    loader as clientsLoader,
    action as clientsAction,
} from "@/pages/clients/dataAccess";
import Client from "@/pages/client";
import {
    loader as clientLoader,
    action as clientAction,
} from "@/pages/client/dataAccess";
import Orders from "@/pages/orders";
import {
    loader as ordersLoader,
    action as ordersAction,
} from "@/pages/orders/dataAccess";
import Staff from "@/pages/staff";
import {
    loader as staffLoader,
    action as staffAction,
} from "@/pages/staff/dataAccess";
import Calendar from "./pages/calendar";
import Setting from "@/pages/setting";
import {
    loader as universLoader,
    action as universAction,
} from "@/pages/setting/dataAccess";
import LoadingPage from "./components/loadingEle";
import { routerPaths } from "./configs/utils";

const App: FC = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path={routerPaths.init}
                    element={<InitPage />}
                    loader={initLoader}
                />
                <Route
                    path={routerPaths.login}
                    element={<LoginPage />}
                    loader={loginLoader}
                    action={loginAction}
                />
                <Route
                    element={<Layout />}
                    loader={layoutLoader}
                    action={layoutAction}
                    errorElement={<ErrBoundary />}
                >
                    <Route
                        index
                        path={routerPaths.dashboard}
                        element={<Dashboard />}
                        loader={dashboardLoader}
                    />
                    <Route
                        path={routerPaths.clients}
                        element={<Clients />}
                        loader={clientsLoader}
                        action={clientsAction}
                    />
                    <Route
                        path={routerPaths.client}
                        element={<Client />}
                        loader={clientLoader}
                        action={clientAction}
                    />
                    <Route
                        path={routerPaths.orders}
                        element={<Orders />}
                        loader={ordersLoader}
                        action={ordersAction}
                    />
                    <Route path={routerPaths.calendar} element={<Calendar />} />
                    <Route
                        path={routerPaths.staff}
                        element={<Staff />}
                        loader={staffLoader}
                        action={staffAction}
                    />
                    <Route
                        path={routerPaths.setting}
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
