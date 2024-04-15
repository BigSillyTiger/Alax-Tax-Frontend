import { API_ADMIN, API_SETTING, API_ORDER, API_STAFF } from "@/apis";
import { menuList } from "@/configs/utils/router";
import { Torder } from "@/configs/schema/orderSchema";
import { routerStore } from "@/configs/zustore";
import { defer, redirect } from "react-router-dom";
import { hmsTohm } from "@/lib/time";

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

        const [orders, uniData, company, staff, logo] = await Promise.all([
            API_ORDER.orderAll()
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
                                    assigned_work: wl.assigned_work.map(
                                        (aw) => {
                                            return {
                                                ...aw,
                                                s_time: hmsTohm(
                                                    aw.s_time as string
                                                ),
                                                e_time: hmsTohm(
                                                    aw.e_time as string
                                                ),
                                                b_hour: hmsTohm(
                                                    aw.b_hour as string
                                                ),
                                            };
                                        }
                                    ),
                                };
                            }),
                        };
                    })
                )
                .catch((error) => {
                    console.log("-> error fetching orders: ", error);
                    return [];
                }),
            API_SETTING.uniAll().then((res) => res.data),
            API_SETTING.companyGet().then((res) => res.data),
            API_STAFF.staffAll().then((res) => res.data),
            API_SETTING.logo().then((res) => res.data),
        ]);

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
