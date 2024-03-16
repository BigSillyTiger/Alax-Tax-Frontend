import { API_ADMIN, API_CLIENT, API_MANAGE, API_ORDER } from "@/apis";
import { menuList } from "@/configs/utils";
import { Torder } from "@/configs/schema/orderSchema";
import { routerStore } from "@/configs/zustore";
import { LoaderFunctionArgs, defer, redirect } from "react-router-dom";

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
        const orders = await API_ORDER.orderWClient(cid);
        const uniData = await API_MANAGE.uniAll();
        const company = await API_MANAGE.companyGet();
        const logo = await API_MANAGE.logo();

        return defer({
            clientInfo,
            orders: orders.data as Torder[],
            uniData: uniData.data,
            company: company.data,
            logo: logo.data,
        });
    } catch (err) {
        console.log("-> client page loader error: ", err);
        return redirect("/login");
    }
};
