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
import LoginPage from "@/pages/login";
import ErrBoundary from "@/pages/errBoundary";
import Customers from "@/pages/customerPage";
import Dashboard from "@/pages/dashboard";

import InitPage from "@/pages/initPage";
import { initLoader, initAction } from "@/pages/initPage";
import { loginLoader, loginAction } from "./pages/login/loginPage";
import { layoutLoader, layoutAction } from "@/components/layout";

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
                    <Route path={"customers"} element={<Customers />} />
                </Route>

                <Route path="*" element={<> No Match </>} />
            </>
        )
    );
    return <RouterProvider router={router} fallbackElement={<SpinningEle />} />;
};

export default App;
