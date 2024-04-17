import { API_ADMIN, API_SETTING, API_ORDER, API_STAFF } from "@/apis";
import { menuList } from "@/configs/utils/router";
import { routerStore } from "@/configs/zustore";
import { defer, redirect } from "react-router-dom";

export const ordersLoader = async () => {
    routerStore.setState({ currentRouter: "orders" });
    try {
        await API_ADMIN.accessCheck(menuList[2].id)
            .then((res) => {
                return !res.data && redirect("/login");
            })
            .catch((error) => {
                console.log("-> Error: orders page admin check: ", error);
                return redirect("/login");
            });

        const allPromise = Promise.all([
            API_ORDER.orderAll().then((res) => res.data),
            API_STAFF.staffAll().then((res) => res.data),
            API_SETTING.uniAll().then((res) => res.data),
            API_SETTING.companyGet().then((res) => res.data),
            API_SETTING.logo().then((res) => res.data),
        ]);

        return defer({ allPromise });
    } catch (err) {
        console.log("-> order page loader error: ", err);
        return redirect("/login");
    }
};
