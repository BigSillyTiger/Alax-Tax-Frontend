import React, { FC, Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import SpinningEle from "@/components/loadingPage/SpinningEle";

const Dashboard: FC = () => {
    const loaderData = useLoaderData() as { content: any };
    return (
        <div className="mx-2 px-0 border-2 border-dashed border-blue-600">
            <div>Dashboard</div>
            <Suspense fallback={<SpinningEle />}>
                <Await resolve={loaderData.content}>
                    {(loadedContent) => {
                        console.log("--> defter test: ", loadedContent);
                        return <p>{loadedContent.msg}</p>;
                    }}
                </Await>
            </Suspense>
        </div>
    );
};

export default Dashboard;
