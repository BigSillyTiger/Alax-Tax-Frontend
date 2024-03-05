import { Suspense } from "react";
import type { FC } from "react";
import { Await, useLoaderData } from "react-router-dom";
import SpinningEle from "@/components/loadingEle/SpinningEle";
import { useAdminStore } from "@/configs/zustore";

const Dashboard: FC = () => {
    const loaderData = useLoaderData() as { content: any };

    const user = useAdminStore((state) => state.currentUser);

    const DashboardContent = () => {
        return (
            <div className="grid grid-cols-8 gap-x-2">
                {user.role + ": " + user.first_name}
            </div>
        );
    };

    return (
        <div className="mx-2 px-0 border-2 border-dashed border-blue-600">
            <div className="">Dashboard</div>
            <Suspense fallback={<SpinningEle />}>
                <Await resolve={loaderData.content}>
                    {() => {
                        return <DashboardContent />;
                    }}
                </Await>
            </Suspense>
        </div>
    );
};

export default Dashboard;
