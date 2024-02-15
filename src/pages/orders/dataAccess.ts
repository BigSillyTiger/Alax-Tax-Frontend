import { API_ORDER, API_ADMIN } from "@/apis";
import { defer, redirect } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import type { Tresponse } from "@/utils/types";
import { menuList } from "@/configs/menuList";

export const loader = async () => {
    try {
        const accessResult = await API_ADMIN.accessCheck(menuList[2].id);
        if (!accessResult.data) {
            return redirect("/login");
        }
        const orders = await API_ORDER.orderAll();
        return defer({ orders });
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
