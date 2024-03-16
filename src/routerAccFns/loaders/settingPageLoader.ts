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

    const univers = await API_MANAGE.uniAll();
    const company = await API_MANAGE.companyGet();
    const logo = await API_MANAGE.logo();
    return defer({ univers, company: company.data, logo: logo.data });
};
