import { API_ADMIN, API_SETTING, API_ORDER, API_STAFF } from "@/apis";
import { Tadmin } from "@/configs/schema/staffSchema";
import { menuList } from "@/configs/utils/router";
import { adminStore, routerStore } from "@/configs/zustore";
import { defer, LoaderFunctionArgs, redirect } from "react-router-dom";

export const ordersLoader = async ({ request }: LoaderFunctionArgs) => {
    const pname = new URL(request.url).pathname;
    routerStore.setState({ currentRouter: "orders" });
    try {
        const result = await API_ADMIN.accessCheck(menuList[2].id)
            .then((res) => {
                if (!res.data || !(res.data as Tadmin).orders) {
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
