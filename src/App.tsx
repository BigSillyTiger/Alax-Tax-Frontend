import { FC } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
} from "react-router-dom";

//import Layout from "./components/layout";
import ErrBoundary from "@/pages/errBoundary";
import Layout from "@/pageComponents/layout";
import {
    InitPage,
    LoginPage,
    Dashboard,
    Clients,
    Client,
    Orders,
    Staff,
    Setting,
    Calendar,
} from "./pages";
import {
    initLoader,
    dashboardLoader,
    clientLoader,
    clientsLoader,
    ordersLoader,
    loginLoader,
    staffLoader,
    settingLoader,
    layoutLoader,
} from "./routerAccFns/loaders";
import {
    ordersAction,
    clientsAction,
    loginAction,
    staffAction,
    settingAction,
} from "./routerAccFns/actions";

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
                        // client and orders page are using one action fn
                        action={ordersAction}
                    />
                    <Route
                        path={routerPaths.orders}
                        element={<Orders />}
                        loader={ordersLoader}
                        // client and orders page are using one action fn
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
                        loader={settingLoader}
                        action={settingAction}
                    />
                </Route>

                <Route path="*" element={<> No Match </>} />
            </>
        )
    );
    return <RouterProvider router={router} fallbackElement={<LoadingPage />} />;
};

export default App;
