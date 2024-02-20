import { API_ADMIN, API_MANAGE, API_ORDER } from "@/apis";
import { menuList } from "@/configs/menuList";
import { Torder } from "@/configs/schema/orderSchema";
import { routerStore } from "@/configs/zustore";
import { defer, redirect } from "react-router-dom";

export const ordersLoader = async () => {
    routerStore.setState({ currentRouter: "orders" });
    try {
        const accessResult = await API_ADMIN.accessCheck(menuList[2].id);
        if (!accessResult.data) {
            return redirect("/login");
        }
        const orders = await API_ORDER.orderAll();
        const uniData = await API_MANAGE.uniAll();
        const company = await API_MANAGE.companyGet();
        const logo = await API_MANAGE.logo();

        return defer({
            orders: orders.data as Torder[],
            uniData: uniData.data,
            company: company.data,
            logo: logo.data,
        });
    } catch (err) {
        console.log("-> order page loader error: ", err);
        return redirect("/login");
    }
};
