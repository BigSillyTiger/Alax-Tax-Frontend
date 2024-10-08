import { API_ADMIN } from "@/apis";
import { MenuItems } from "@/configs/utils/router";
import { routerStore } from "@/configs/zustore";
import { defer, LoaderFunctionArgs, redirect } from "react-router-dom";

export const dashboardLoader = async ({ request }: LoaderFunctionArgs) => {
    const pname = new URL(request.url).pathname;
    routerStore.setState({ currentRouter: "dashboard" });
    try {
        const result = await API_ADMIN.loaderAccessCheck(MenuItems.dashboard);

        if (!result) {
            return pname
                ? redirect(`/login?redirect=${pname}`)
                : redirect("/login");
        }

        const allPromise = Promise.all([
            //API_CHART.chartOrderPayment().then((res) => res.data),
            //API_ORDER.orderAllArrangement().then((res) => res.data),
        ]);
        return defer({ allPromise });
    } catch (error) {
        console.log("-> dashboard page loader error: ", error);
        return redirect("/login");
    }
};
