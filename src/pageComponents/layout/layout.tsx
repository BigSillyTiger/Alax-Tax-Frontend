import { FC, Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Tpermission } from "@/configs/schema/universSchema";
import LoadingPage from "@/components/loadingEle";
import ErrorTips from "@/components/ErrorTips";
import MainLayout from "./MainLayout";

const Layout: FC = () => {
    const { allPromise } = useLoaderData() as {
        allPromise: Promise<[Tpermission, string]>;
    };

    return (
        <Suspense fallback={<LoadingPage />}>
            <Await resolve={allPromise} errorElement={<ErrorTips />}>
                <MainLayout />
            </Await>
        </Suspense>
    );
};

export default Layout;
