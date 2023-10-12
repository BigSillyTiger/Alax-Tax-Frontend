import { FC } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
} from "react-router-dom";

//import Layout from "./components/layout";
import SpinningEle from "@/components/loadingEle/SpinningEle";
import LoginPage from "@/pages/login/loginPage";
import ErrBoundary from "@/pages/errBoundary";
import Dashboard from "@/pages/dashboard";

import InitPage from "@/pages/initPage";
import { initLoader, initAction } from "@/pages/initPage";
import { loginLoader, loginAction } from "@/pages/login";
import Layout, { layoutLoader } from "@/components/layout";
import Clients from "@/pages/clients/clients";
import Orders from "@/pages/orders/orders";
import Employees from "@/pages/employees";
import Management from "@/pages/management";
import Calendar from "./pages/calendar";
import { loader as dashboardLoader } from "@/pages/dashboard";
import {
    loader as clientsLoader,
    action as clientsAction,
} from "@/pages/clients";
import {
    loader as clientLoader,
    action as clientAction,
} from "@/pages/client/dataAccess";
import {
    loader as universLoader,
    action as universAction,
} from "@/pages/management/dataAccess";
import Client from "./pages/client";

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
                        //breadcrumb={"Clients"}
                    />
                    <Route
                        path={"/clients/:cid"}
                        element={<Client />}
                        loader={clientLoader}
                        action={clientAction}
                        /* handle={{
                            crumb: (data: any) => {
                                return <span>{"/id"}</span>;
                            },
                        }} */
                    />
                    <Route path={"/orders"} element={<Orders />} />
                    <Route path={"/calendar"} element={<Calendar />} />
                    <Route path={"/employees"} element={<Employees />} />
                    <Route
                        path={"/management"}
                        element={<Management />}
                        loader={universLoader}
                        action={universAction}
                    />
                </Route>

                <Route path="*" element={<> No Match </>} />
            </>
        )
    );
    return <RouterProvider router={router} fallbackElement={<SpinningEle />} />;
};

export default App;
