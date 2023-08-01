import React, { FC } from "react";
import { redirect } from "react-router-dom";
import SpinningEle from "@/components/SpinningEle";
import { API_ADMIN } from "@/apis";

export const initLoader = async () => {
    const result = await API_ADMIN.adminCheck();
    if (result.status) {
        return redirect("/dashboard");
    }
    return redirect("/login");
};
export const initAction = async () => {
    return {};
};

const InitPage: FC = () => {
    return (
        <>
            <div>initPage</div>;
            <SpinningEle />
        </>
    );
};

export default InitPage;