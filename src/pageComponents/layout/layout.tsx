import { FC, Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Tpermission } from "@/configs/schema/universSchema";
import LoadingPage from "@/components/loadingEle";
import ErrorTips from "@/components/ErrorTips";
import MainLayout from "./MainLayout";
import { Tpayslip } from "@/configs/schema/payslipSchema";
import { TwlTableRow } from "@/configs/schema/workSchema";

const Layout: FC = () => {
    const { allPromise } = useLoaderData() as {
        allPromise: Promise<[Tpermission, TwlTableRow[], Tpayslip[]]>;
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
