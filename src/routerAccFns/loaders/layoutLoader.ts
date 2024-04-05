import { redirect, LoaderFunctionArgs } from "react-router-dom";
import { API_ADMIN } from "@/apis";
//import { routerStore } from "@/configs/zustore";
import { RES_STATUS } from "@/configs/types";

export const layoutLoader = async ({ request }: LoaderFunctionArgs) => {
    const pname = new URL(request.url).pathname;
    //routerStore.setState({ currentRouter: "login" });

    try {
        return await API_ADMIN.adminCheck().then((res) => {
            if (res.status === RES_STATUS.SUCCESS) {
                return res.data;
            }
            return pname
                ? redirect(`/login?redirect=${pname}`)
                : redirect("/login");
        });
    } catch (err) {
        return redirect("/login");
    }
};
