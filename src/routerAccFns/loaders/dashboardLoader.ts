import { API_ADMIN, API_CHART, API_ORDER, API_WORKLOGS } from "@/apis";
import { Tadmin } from "@/configs/schema/staffSchema";
import { menuList } from "@/configs/utils/router";
import { adminStore, routerStore } from "@/configs/zustore";
import { defer, LoaderFunctionArgs, redirect } from "react-router-dom";

export const dashboardLoader = async ({ request }: LoaderFunctionArgs) => {
    const pname = new URL(request.url).pathname;
    routerStore.setState({ currentRouter: "dashboard" });
    try {
        const result = await API_ADMIN.accessCheck(menuList[0].id)
            .then((res) => {
                if (!res.data || !(res.data as Tadmin).dashboard) {
                    return false;
                } else {
                    adminStore.setState({ currentAdmin: res.data as Tadmin });
                    return res.data;
                }
            })
            .catch((error) => {
                console.log("-> Error: orders page admin check: ", error);
                return false;
            });

        if (!result) {
            return pname
                ? redirect(`/login?redirect=${pname}`)
                : redirect("/login");
        }

        const allPromise = Promise.all([
            API_WORKLOGS.wlGetToday().then((res) => res.data),
            API_CHART.chartOrderPayment().then((res) => res.data),
            API_ORDER.orderAllArrangement().then((res) => res.data),
        ]);
        return defer({ allPromise });
    } catch (error) {
        console.log("-> worklogs page loader error: ", error);
        return redirect("/login");
    }
};
