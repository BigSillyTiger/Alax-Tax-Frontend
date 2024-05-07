import { API_ADMIN, API_CHART, API_ORDER, API_WORKLOGS } from "@/apis";
import { menuList } from "@/configs/utils/router";
import { routerStore } from "@/configs/zustore";
import { defer, LoaderFunctionArgs, redirect } from "react-router-dom";

export const dashboardLoader = async ({ request }: LoaderFunctionArgs) => {
    const pname = new URL(request.url).pathname;
    routerStore.setState({ currentRouter: "dashboard" });
    try {
        const result = await API_ADMIN.loaderAccessCheck(menuList[0].id);

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
