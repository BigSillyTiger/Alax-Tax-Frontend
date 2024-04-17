import { API_ADMIN, API_SETTING } from "@/apis";
import { menuList } from "@/configs/utils/router";
import { routerStore } from "@/configs/zustore";
import { defer, redirect } from "react-router-dom";

export const settingLoader = async () => {
    routerStore.setState({ currentRouter: "setting" });
    try {
        await API_ADMIN.accessCheck(menuList[6].id)
            .then((res) => {
                return !res.data && redirect("/login");
            })
            .catch((error) => {
                console.log("-> Error: setting page admin check: ", error);
                return redirect("/login");
            });

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
