import { API_ADMIN, API_SETTING } from "@/apis";
import { menuList } from "@/configs/utils";
import { routerStore } from "@/configs/zustore";
import { defer, redirect } from "react-router-dom";

export const settingLoader = async () => {
    routerStore.setState({ currentRouter: "setting" });
    await API_ADMIN.accessCheck(menuList[5].id)
        .then((res) => {
            return !res.data && redirect("/login");
        })
        .catch((error) => {
            console.log("-> Error: setting page admin check: ", error);
            return redirect("/login");
        });

    const [univers, company, logo] = await Promise.all([
        API_SETTING.uniAll().then((res) => res.data),
        API_SETTING.companyGet().then((res) => res.data),
        API_SETTING.logo().then((res) => res.data),
    ]);
    return defer({ univers, company, logo });
};
