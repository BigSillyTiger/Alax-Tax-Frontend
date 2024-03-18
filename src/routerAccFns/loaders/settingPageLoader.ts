import { API_ADMIN, API_MANAGE } from "@/apis";
import { menuList } from "@/configs/utils";
import { routerStore } from "@/configs/zustore";
import { defer, redirect } from "react-router-dom";

export const settingLoader = async () => {
    routerStore.setState({ currentRouter: "setting" });
    const accessResult = await API_ADMIN.accessCheck(menuList[5].id);
    if (!accessResult.data) {
        return redirect("/login");
    }

    const univers = await API_MANAGE.uniAll().then((res) => res.data);
    const company = await API_MANAGE.companyGet().then((res) => res.data);
    const logo = await API_MANAGE.logo().then((res) => res.data);
    console.log("-> logo api: ", logo);
    return defer({ univers, company, logo });
};
