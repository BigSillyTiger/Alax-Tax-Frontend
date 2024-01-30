import type { FC } from "react";
import { redirect } from "react-router-dom";
import SpinningEle from "@/components/loadingEle/SpinningEle";
import { API_ADMIN } from "@/apis";
import { RES_STATUS } from "@/utils/types";

export const initLoader = async () => {
    const result = await API_ADMIN.adminCheck();
    if (result.status === RES_STATUS.SUCCESS) {
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
            <div className="h-[100dvh] w-[100dvw] flex justify-center content-center">
                <span>12312312312312</span>
                <SpinningEle />
            </div>
        </>
    );
};

export default InitPage;
