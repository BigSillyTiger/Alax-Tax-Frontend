import { redirect, LoaderFunctionArgs } from "react-router-dom";
import { API_ADMIN } from "@/apis";
import { routerStore } from "@/configs/zustore";
import { RES_STATUS } from "@/utils/types";

export const layoutLoader = async ({ request }: LoaderFunctionArgs) => {
    const pname = new URL(request.url).pathname;
    routerStore.setState({ currentRouter: "login" });

    try {
        const result = await API_ADMIN.adminCheck();
        if (result.status === RES_STATUS.SUCCESS) {
            return result.data;
        }
        return pname
            ? redirect(`/login?redirect=${pname}`)
            : redirect("/login");
    } catch (err) {
        return redirect("/login");
    }
};
