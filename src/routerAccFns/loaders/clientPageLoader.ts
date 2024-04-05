import { API_ADMIN, API_CLIENT, API_SETTING, API_ORDER } from "@/apis";
import { menuList } from "@/configs/utils";
import { Torder } from "@/configs/schema/orderSchema";
import { routerStore } from "@/configs/zustore";
import { LoaderFunctionArgs, defer, redirect } from "react-router-dom";
import { dateFormat } from "@/lib/time";

/**
 * @description client page loader
 * @param param0 cid
 * @returns
 */
export const clientLoader = async ({ params }: LoaderFunctionArgs) => {
    routerStore.setState({ currentRouter: "client" });
    try {
        await API_ADMIN.accessCheck(menuList[1].id).then((res) => {
            return !res.data && redirect("/login");
        });

        const cid = params.cid as string;
        const [clientInfo, orders, uniData, company, logo] = await Promise.all([
            API_CLIENT.clientInfo(cid),
            API_ORDER.orderWClient(cid)
                .then((res) => res.data as Torder[])

                .then((res) =>
                    res.map((item) => {
                        return {
                            ...item,
                            // convert date format from yyyy-mm-dd to dd-mm-yyyy
                            created_date: dateFormat(item.created_date, "au"),
                            // desc sort order_services by ranking
                            // conver taxable from 0/1 to boolean
                            order_services: item.order_services
                                .sort((a, b) => a.ranking - b.ranking)
                                .map((desc) => {
                                    return {
                                        ...desc,
                                        taxable: Boolean(desc.taxable),
                                    };
                                }),
                        };
                    })
                ),
            API_SETTING.uniAll().then((res) => res.data),
            API_SETTING.companyGet().then((res) => res.data),
            API_SETTING.logo().then((res) => res.data),
        ]);

        return defer({
            clientInfo,
            orders,
            uniData,
            company,
            logo,
        });
    } catch (err) {
        console.log("-> client page loader error: ", err);
        return redirect("/login");
    }
};
