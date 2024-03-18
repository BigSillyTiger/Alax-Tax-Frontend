import { API_ADMIN, API_CLIENT, API_MANAGE, API_ORDER } from "@/apis";
import { menuList } from "@/configs/utils";
import { Torder } from "@/configs/schema/orderSchema";
import { routerStore } from "@/configs/zustore";
import { LoaderFunctionArgs, defer, redirect } from "react-router-dom";
import { dateFormatAU } from "@/utils/utils";

/**
 * @description client page loader
 * @param param0 cid
 * @returns
 */
export const clientLoader = async ({ params }: LoaderFunctionArgs) => {
    routerStore.setState({ currentRouter: "client" });
    try {
        const accessResult = await API_ADMIN.accessCheck(menuList[1].id);
        if (!accessResult.data) {
            return redirect("/login");
        }

        const cid = params.cid as string;
        const clientInfo = await API_CLIENT.clientInfo(cid);
        const orders = await API_ORDER.orderWClient(cid)
            .then((res) => res.data as Torder[])

            .then((res) =>
                res.map((item) => {
                    return {
                        ...item,
                        // convert date format from yyyy-mm-dd to dd-mm-yyyy
                        created_date: dateFormatAU(item.created_date),
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
            );
        const uniData = await API_MANAGE.uniAll().then((res) => res.data);
        const company = await API_MANAGE.companyGet().then((res) => res.data);
        const logo = await API_MANAGE.logo().then((res) => res.data);

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
