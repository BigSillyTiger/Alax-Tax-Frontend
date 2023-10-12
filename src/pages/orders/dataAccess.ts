import { API_ORDER } from "@/apis";
import { defer } from "react-router-dom";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import type { Tresponse } from "@/utils/types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const orders = await API_ORDER.orderAll();
    return defer({ orders });
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
