import { API_ORDER, API_ADMIN, API_MANAGE } from "@/apis";
import { defer, redirect } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import type { Tresponse } from "@/utils/types";
import { menuList } from "@/configs/menuList";
import { Torder } from "@/configs/schema/orderSchema";

export const loader = async () => {
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

export const action = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    const data = await request.formData();
    if ("POST" === request.method) {
        const result = await API_ORDER.orderAdd(data);
        return result;
    } else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
};
