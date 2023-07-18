import { FC, useState } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
    redirect,
} from "react-router-dom";

//import Layout from "./components/layout";
import Layout from "@components/layout";
import SpinningEle from "@components/SpinningEle";
import LoginPage, { loginAct } from "@pages/loginPage";
import ErrBoundary from "@pages/errBoundary";
import Customers from "@pages/customers";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path={"/"} element={<LoginPage />} action={loginAct} />
            <Route
                path={"/dashboard"}
                element={<Layout />}
                errorElement={<ErrBoundary />}
            >
                <Route index element={<Customers />} />
            </Route>
        </>
    )
);

const App: FC = () => {
    return <RouterProvider router={router} fallbackElement={<SpinningEle />} />;
};

export default App;
