import { redirect, LoaderFunctionArgs, defer } from "react-router-dom";
import { API_ADMIN, API_PAYSLIP, API_WORKLOGS } from "@/apis";
//import { routerStore } from "@/configs/zustore";
import { RES_STATUS } from "@/configs/types";
//import { routerStore } from "@/configs/zustore";

export const layoutLoader = async ({ request }: LoaderFunctionArgs) => {
    const pname = new URL(request.url).pathname;
    // has not set router for layout yet
    //routerStore.setState({ currentRouter: "login" });

    try {
        await API_ADMIN.adminCheck().then((res) => {
            if (res.status !== RES_STATUS.SUCCESS) {
                //return res.data;
                return pname
                    ? redirect(`/login?redirect=${pname}`)
                    : redirect("/login");
            }
        });

        const allPromise = Promise.all([
            API_ADMIN.adminCheck().then((res) => res.data),
            API_WORKLOGS.wlAll().then((res) => res.data),
            API_PAYSLIP.psAll().then((res) => res.data),
        ]);
        return defer({ allPromise });
    } catch (err) {
        return redirect("/login");
    }
};
