import { FC } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
} from "react-router-dom";

//import Layout from "./components/layout";
import Layout from "@/components/layout";
import SpinningEle from "@/components/SpinningEle";
import LoginPage from "@/pages/loginPage";
import ErrBoundary from "@/pages/errBoundary";
import Dashboard from "@/pages/dashboard";

import InitPage from "@/pages/initPage";
import { initLoader, initAction } from "@/pages/initPage";
import { loginLoader, loginAction } from "@/pages/loginPage";
import { layoutLoader, layoutAction } from "@/components/layout";
import Clients from "@/pages/clients";
import Orders from "@/pages/orders";
import Employees from "@/pages/employees";
import Management from "@/pages/management";

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
                    path={"/dashboard"}
                    element={<Layout />}
                    errorElement={<ErrBoundary />}
                    loader={layoutLoader}
                    action={layoutAction}
                >
                    <Route index element={<Dashboard />} />
                    <Route path={"clients"} element={<Clients />} />
                    <Route path={"orders"} element={<Orders />} />
                    <Route path={"employees"} element={<Employees />} />
                    <Route path={"management"} element={<Management />} />
                </Route>

                <Route path="*" element={<> No Match </>} />
            </>
        )
    );
    return <RouterProvider router={router} fallbackElement={<SpinningEle />} />;
};

export default App;
