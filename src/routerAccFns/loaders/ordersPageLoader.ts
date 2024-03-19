import { API_ADMIN, API_MANAGE, API_ORDER, API_STAFF } from "@/apis";
import { menuList } from "@/configs/utils";
import { Torder } from "@/configs/schema/orderSchema";
import { routerStore } from "@/configs/zustore";
import { defer, redirect } from "react-router-dom";
import { hmsTohm } from "@/utils/utils";

export const ordersLoader = async () => {
    routerStore.setState({ currentRouter: "orders" });
    try {
        const accessResult = await API_ADMIN.accessCheck(menuList[2].id);
        if (!accessResult.data) {
            return redirect("/login");
        }
        const orders = await API_ORDER.orderAll()
            .then((res) => res.data as Torder[])
            .then((res) =>
                // desc sort order_services by ranking
                // conver taxable from 0/1 to boolean
                res.map((item) => {
                    return {
                        ...item,
                        order_services: item.order_services
                            .sort((a, b) => a.ranking - b.ranking)
                            .map((desc) => {
                                return {
                                    ...desc,
                                    taxable: Boolean(desc.taxable),
                                };
                            }),
                        work_logs: item.work_logs.map((wl) => {
                            return {
                                ...wl,
                                assigned_work: wl.assigned_work.map((aw) => {
                                    return {
                                        ...aw,
                                        s_time: hmsTohm(aw.s_time as string),
                                        e_time: hmsTohm(aw.e_time as string),
                                        b_time: hmsTohm(aw.b_time as string),
                                    };
                                }),
                            };
                        }),
                    };
                })
            )
            .catch((error) => {
                console.log("-> error fetching orders: ", error);
                return [];
            });
        const uniData = await API_MANAGE.uniAll().then((res) => res.data);
        const company = await API_MANAGE.companyGet().then((res) => res.data);
        const staff = await API_STAFF.staffAll().then((res) => res.data);
        const logo = await API_MANAGE.logo().then((res) => res.data);

        return defer({
            orders,
            uniData,
            company,
            logo,
            staff,
        });
    } catch (err) {
        console.log("-> order page loader error: ", err);
        return redirect("/login");
    }
};
