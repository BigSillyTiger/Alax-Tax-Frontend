import { API_ADMIN, API_WORKLOGS } from "@/apis";
import { menuList } from "@/configs/utils/router";
import { routerStore } from "@/configs/zustore";
import { defer, redirect } from "react-router-dom";

export const dashboardLoader = async () => {
    routerStore.setState({ currentRouter: "dashboard" });
    try {
        await API_ADMIN.accessCheck(menuList[0].id).then((res) => {
            return !res.data && redirect("/login");
        });

        const allPromise = Promise.all([
            API_WORKLOGS.wlGetToday().then((res) => res.data),
            API_WORKLOGS.wlGetTomorrow().then((res) => res.data),
        ]);

        return defer({ allPromise });
    } catch (error) {
        console.log("-> worklogs page loader error: ", error);
        return redirect("/login");
    }
};
