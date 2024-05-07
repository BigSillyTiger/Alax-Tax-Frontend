import { API_ADMIN, API_SETTING } from "@/apis";
import { Tadmin } from "@/configs/schema/staffSchema";
import { menuList } from "@/configs/utils/router";
import { adminStore, routerStore } from "@/configs/zustore";
import { defer, LoaderFunctionArgs, redirect } from "react-router-dom";

export const settingLoader = async ({ request }: LoaderFunctionArgs) => {
    const pname = new URL(request.url).pathname;
    routerStore.setState({ currentRouter: "setting" });
    try {
        const result = await API_ADMIN.accessCheck(menuList[6].id)
            .then((res) => {
                if (!res.data || !(res.data as Tadmin).setting) {
                    return false;
                } else {
                    adminStore.setState({ currentAdmin: res.data as Tadmin });
                    return res.data;
                }
            })
            .catch((error) => {
                console.log("-> Error: setting page admin check: ", error);
                return redirect("/login");
            });

        if (!result) {
            return pname
                ? redirect(`/login?redirect=${pname}`)
                : redirect("/login");
        }

        const allPromise = Promise.all([
            API_SETTING.uniAll().then((res) => res.data),
            API_SETTING.companyGet().then((res) => res.data),
            API_SETTING.logo().then((res) => res.data),
        ]);

        return defer({ allPromise });
    } catch (error) {
        console.log("-> setting page loader error: ", error);
        return redirect("/login");
    }
};
